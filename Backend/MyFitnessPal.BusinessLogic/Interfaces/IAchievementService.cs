using MyFitnessPal.Common.Models;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IAchievementService
    {
        Task<List<AchievementModel>> GetAll(string email);
        Task<AchievementNotificationModel> CheckAchievementConditionsAndInsert(Statistics statistics, int noWorkouts);
        Task<AchievementModel> GetAchievementById(int id);
        Task<int> NoUserWithMonthlyAchievementPerMonth(int month);
    }
}
