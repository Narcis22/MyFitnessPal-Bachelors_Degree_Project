using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.IRepositories
{
    public interface IWorkoutRepository
    {
        Task<bool> Create(Workout workout);
        Task<bool> Update(Workout workout);
        IQueryable<Workout> GetAll();
        IQueryable<Workout> GetAllIncludeStatistics();
    }
}
