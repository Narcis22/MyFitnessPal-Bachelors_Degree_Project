using Microsoft.EntityFrameworkCore;
using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.Repositories
{
    public class WorkoutRepository: IWorkoutRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public WorkoutRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Workout workout)
        {
            await _context.Workouts.AddAsync(workout);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(Workout workout)
        {
            _context.Workouts.Update(workout);
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<Workout> GetAll()
        {
            return _context.Workouts;
        }

        public IQueryable<Workout> GetAllIncludeStatistics()
        {
            return GetAll().Include(statistics => statistics.Statistics);
        }
    }
}
