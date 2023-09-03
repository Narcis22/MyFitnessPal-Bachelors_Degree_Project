using Microsoft.EntityFrameworkCore;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Models;
using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class AchievementService : IAchievementService
    {
        private readonly IAchievementRepository _achievementRepository;
        private readonly IStatisticsService _statisticsService;  

        public AchievementService(
            IAchievementRepository achievementRepository,
            IStatisticsService statisticsService
            ) {
            _achievementRepository = achievementRepository;
            _statisticsService = statisticsService;
        }

        public async Task<List<AchievementModel>> GetAll(string email)
        {
            return await _achievementRepository.GetAll()
                    .Where(ach => ach.Statistics.User.Email.Equals(email))
                    .Select(ach => new AchievementModel
                    {
                        UserId = ach.Statistics.UserId,
                        SportName = ach.Statistics.SportId != null ? ach.Statistics.Sport.Name.ToLower() : ach.DateCreated.Month.ToString("MM"),
                        Level = Int32.Parse(ach.Level),
                        dateCreated = ach.DateCreated
                    }).ToListAsync();
        }

        public async Task<AchievementNotificationModel> CheckAchievementConditionsAndInsert(Statistics statistics, int noWorkouts)
        {
            AchievementNotificationModel achievementNotificationModel = new AchievementNotificationModel();
            achievementNotificationModel.AchievementId = "0";
            achievementNotificationModel.HasAchievement = "false";

            // bronze medal - first time  
            if (statistics.FirstWorkoutDate == statistics.LastWorkoutDate) 
            {
                Achievement achievement = new Achievement();
                achievement.Level = "1";
                achievement.DateCreated = DateTime.UtcNow;
                achievement.StatisticsId = statistics.Id;

                await _achievementRepository.Create(achievement);
            }

            // silver medal - 7 consecutive days 
            if (statistics.TotalConsecutiveDays == 7 && DateTime.Now.Month == (DateTime.Now.AddDays(-7).Month))
            {
                Achievement achievement = new Achievement();
                achievement.Level = "2";
                achievement.DateCreated = DateTime.UtcNow;
                achievement.StatisticsId = statistics.Id;

                bool result = await _achievementRepository.Create(achievement);

                if (result)
                {
                    statistics.TotalConsecutiveDays = 0;
                    result = await _statisticsService.UpdateStatistics(statistics);

                    if (result)
                    {
                        achievement = await GetAchievement(achievement);
                        achievementNotificationModel.HasAchievement = "true";
                        achievementNotificationModel.AchievementId = achievement.Id.ToString();
                    }             
                }
            }

            // gold medal - 10 workout days + 30h duration
            int noGolds = await NoGoldsPerCurrentMonth(statistics.Id);

            if (noWorkouts >= 10 * (noGolds + 1) && statistics.TotalDuration >= 1800 * (noGolds + 1)) 
            {
                Achievement achievement = new Achievement();
                achievement.Level = "3";
                achievement.DateCreated = DateTime.UtcNow;
                achievement.StatisticsId = statistics.Id;

                bool result = await _achievementRepository.Create(achievement);

                if (result)
                {
                    achievement = await GetAchievement(achievement);
                    achievementNotificationModel.HasAchievement = "true";
                    achievementNotificationModel.AchievementId = achievement.Id.ToString();
                }
            }
            
            return achievementNotificationModel;
        }

        public async Task<int> NoGoldsPerCurrentMonth(int userId)
        {
            return await _achievementRepository.GetAll()
                                               .Where(w => w.Statistics.UserId == userId && w.Level.Equals("3") && w.DateCreated.Month == DateTime.Now.Month && w.DateCreated.Year == DateTime.Now.Year)
                                               .Select(w => w.Id)
                                               .CountAsync();
        }

        public async Task<AchievementModel> GetAchievementById(int id)
        {
            return await _achievementRepository
                                   .GetAll()
                                   .Where(ach => ach.Id == id).Select(ach => new AchievementModel
                                    {
                                        UserId = ach.Statistics.UserId,
                                        SportName = ach.Statistics.Sport.Name,
                                        Level = Int32.Parse(ach.Level),
                                        dateCreated = ach.DateCreated,
                                    }).FirstOrDefaultAsync();
        }

        public async Task<Achievement> GetAchievement(Achievement achievement)
        {
            return await _achievementRepository
                                    .GetAll()
                                    .Where(ach => ach.Level.Equals(achievement.Level) && ach.DateCreated == achievement.DateCreated && ach.StatisticsId == achievement.StatisticsId)
                                    .FirstOrDefaultAsync();
        }

        public async Task<int> NoUserWithMonthlyAchievementPerMonth(int month)
        {
            return await _achievementRepository.GetAll()
                                .Where(achiev => achiev.Level.Equals("4") && achiev.DateCreated.Month == month)
                                .CountAsync();
        }
    }
}
