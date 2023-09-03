using Microsoft.EntityFrameworkCore;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Models;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class ChartService: IChartService
    {
        private readonly ISportService _sportService;
        private readonly IWorkoutService _workoutService;
        private readonly IUserService _userService;
        private readonly IAchievementService _achievementService;
        public ChartService(
            ISportService sportService, 
            IWorkoutService workoutService,
            IUserService userService,
            IAchievementService achievementService
            )
        {
            _sportService = sportService;
            _workoutService = workoutService;
            _userService = userService;
            _achievementService = achievementService;
        }

        public async Task<List<StatisticsSportModel>> GetStatisticsSport()
        {
            var sports = await _sportService.GetAll();

            List< StatisticsSportModel> statisticsSport = new List<StatisticsSportModel>();
            foreach (var sport in sports)
            {
                int TotalDuration = await _workoutService.GetTotalDurationOfASport(sport.Id);
                int NoWorkouts = await _workoutService.NoWorkoutOfASport(sport.Id);

                statisticsSport.Add(new StatisticsSportModel
                {
                    SportName = sport.Name,
                    TotalDuration = TotalDuration,
                    NoWorkouts = NoWorkouts
                });
            }

            return statisticsSport;
        }

        public async Task<List<StatisticsAchievementModel>> GetStatisticsAchievement() 
        {
            List<int> months = new List<int>() { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 };
            List<StatisticsAchievementModel> statistics = new List<StatisticsAchievementModel>();

            foreach (var month in months )
            {
                string MonthName = month.ToString().Length == 2 ? month.ToString() : "0" + month.ToString();
                int NoUsersAtTheTime = await _userService.NoUsersAtTheTime(month);
                int NoUserWithAchievement = await _achievementService.NoUserWithMonthlyAchievementPerMonth(month);

                statistics.Add(new StatisticsAchievementModel
                {
                    MonthName = MonthName,
                    NoUsersAtTheTime = NoUsersAtTheTime,
                    ProcentOfUsers = NoUsersAtTheTime == 0 ? 0 : NoUserWithAchievement * 100 / NoUsersAtTheTime
                });
            }

            return statistics;
        }
    }
}
