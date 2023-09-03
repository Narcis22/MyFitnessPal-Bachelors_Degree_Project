using Microsoft.EntityFrameworkCore;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Models;
using MyFitnessPal.DataAccess;
using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;
using SendGrid.Helpers.Mail;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class WorkoutService: IWorkoutService
    {
        private readonly IStatisticsService _statisticsService;
        private readonly IAchievementService _achievementService;
        private readonly IWorkoutRepository _workoutRepository;
        private readonly IUserService _userService;


        public WorkoutService(
            IStatisticsService statisticsService,
            IAchievementService achievementService, 
            IWorkoutRepository workoutRepository,
             IUserService userService
            ) {
            _workoutRepository = workoutRepository;
            _statisticsService = statisticsService;
            _achievementService = achievementService;
            _userService = userService;
        }

        public async Task<AchievementNotificationModel> Create(NewWorkoutModel workoutModel)
        {
            int userId = await _userService.GetUserIdByEmail(workoutModel.Email);
            //int userId = await _context.Users
            //                .Where(user => user.Email.Equals(workoutModel.Email))
            //                .Select(user => user.Id)
            //                .FirstOrDefaultAsync();

            // create or update the statistics data for the given sport and user
            Statistics statistics = await _statisticsService.GetStatistics(userId, workoutModel.SportId);

            bool result = false;
            if (statistics == null)
                result = await _statisticsService.Create(workoutModel);
            else
                result = await _statisticsService.Update(statistics, workoutModel);

            // create the workout for the given sport and user
            if (result)
            {
                Statistics modifiedStatistics = await _statisticsService.GetStatistics(userId, workoutModel.SportId);
                Workout workout = new Workout();
                workout.Duration = workoutModel.Duration;
                workout.Steps = workoutModel.Steps;
                workout.Distance = workoutModel.Distance;
                workout.CreatedAt = DateTime.UtcNow;
                workout.StatisticsId = modifiedStatistics.Id;

                result = await _workoutRepository.Create(workout);

                // update the achievements table if is necessary
                if (result)
                {
                    int noWorkouts = await GetDaysWithWorkoutsPerCurrentMonth(modifiedStatistics.UserId);

                    return await _achievementService.CheckAchievementConditionsAndInsert(modifiedStatistics, noWorkouts);
                }
            }

            return new AchievementNotificationModel
            {
                HasAchievement = "false",
                AchievementId = "0"
            };
        }

        public async Task<List<WorkoutModel>> GetAll(string email)
        {
            return await _workoutRepository
                             .GetAllIncludeStatistics()
                             .Where(workout => workout.Statistics.User.Email.Equals(email))
                             .Select(workout => new WorkoutModel
                             {
                                 Username = workout.Statistics.User.Username,
                                 SportId = workout.Statistics.SportId,
                                 CreatedAt = workout.CreatedAt,
                                 Duration = workout.Duration,
                                 Steps = workout.Steps,
                                 Distance = workout.Distance
                             }).ToListAsync();
        }

        public async Task<int> GetDaysWithWorkoutsPerCurrentMonth(int userId)
        {
            return await _workoutRepository.GetAll()
                           .Where(w => w.Statistics.UserId == userId && w.CreatedAt.Month == DateTime.Now.Month && w.CreatedAt.Year == DateTime.Now.Year)
                           .Select(w => w.CreatedAt.Date)
                           .Distinct()
                           .CountAsync();
        }

        public async Task<int> GetTotalDurationOfASport(int sportId)
        {
            return await _workoutRepository.GetAll()
                                            .Where(workout => workout.Statistics.SportId == sportId)
                                            .Select(workout => workout.Duration)
                                            .SumAsync();
        }

        public async Task<int> NoWorkoutOfASport(int sportId)
        {
            return await _workoutRepository.GetAll()
                                            .Where(workout => workout.Statistics.SportId == sportId)
                                            .CountAsync();
        }
    }
}
