using Microsoft.EntityFrameworkCore;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Models;
using MyFitnessPal.DataAccess;
using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class StatisticsService: IStatisticsService
    {
        private readonly IStatisticsRepository _statisticsRepository;
        private readonly IUserService _userService;

        public StatisticsService(IStatisticsRepository statisticsRepository, IUserService userService)
        {
            _statisticsRepository = statisticsRepository;
            _userService = userService;
        }

        public async Task<bool> Create(NewWorkoutModel workout)
        {
            int userId = await _userService.GetUserIdByEmail(workout.Email);

            Statistics statistics = new Statistics();
            statistics.SportId = workout.SportId;
            statistics.UserId = userId;
            statistics.FirstWorkoutDate = DateTime.UtcNow;
            statistics.LastWorkoutDate = DateTime.UtcNow;
            statistics.TotalConsecutiveDays = 1;
            statistics.TotalDuration = workout.Duration;

            return await _statisticsRepository.Create(statistics);
        }

        public async Task<bool> Update(Statistics statistics, NewWorkoutModel workout)
        {
            DateTime prevDate = statistics.LastWorkoutDate;
            statistics.LastWorkoutDate = DateTime.UtcNow;

            if ((statistics.LastWorkoutDate - prevDate).Days == 1)
                statistics.TotalConsecutiveDays++;
            else if ((statistics.LastWorkoutDate - prevDate).Days != 0)  // if = 0 => have more then instantes in a day (TotalConsecutiveDays stays still) 
                statistics.TotalConsecutiveDays = 1;

            statistics.TotalDuration += workout.Duration;

            return await _statisticsRepository.Update(statistics);
        }

        public async Task<bool> UpdateStatistics(Statistics statistics)
        {
            return await _statisticsRepository.Update(statistics);
        }

        public async Task<Statistics> GetStatistics(int userId, int sportId)
        {
            return await _statisticsRepository.GetAll()
                        .Where(s => s.UserId == userId && s.SportId == sportId)
                        .FirstOrDefaultAsync();
        }

        public async Task<List<int?>> getSportIdsForUser(string email)
        {
            var sportIds = await _statisticsRepository.GetAll()
                .Where(st => st.User.Email.Equals(email) && st.SportId != 0)
                .Select(sport => sport.SportId)
                .Distinct().ToListAsync();

            return sportIds;
        }
    }
}
