using MyFitnessPal.Common.Models;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IStatisticsService
    {
        Task<bool> Create(NewWorkoutModel workout);
        Task<bool> Update(Statistics statistics, NewWorkoutModel workout);
        Task<Statistics> GetStatistics(int userId, int sportId);
        Task<bool> UpdateStatistics(Statistics statistics);
        Task<List<int?>> getSportIdsForUser(string email);
    }
}
