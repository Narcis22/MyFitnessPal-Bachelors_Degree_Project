using MyFitnessPal.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IWorkoutService
    {
        Task<AchievementNotificationModel> Create(NewWorkoutModel workoutModel);
        Task<List<WorkoutModel>> GetAll(string email);
        Task<int> GetDaysWithWorkoutsPerCurrentMonth(int userId);
        Task<int> GetTotalDurationOfASport(int sportId);
        Task<int> NoWorkoutOfASport(int sportId);
    }
}
