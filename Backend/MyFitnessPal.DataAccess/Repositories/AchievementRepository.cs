using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.Repositories
{
    public class AchievementRepository: IAchievementRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public AchievementRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Achievement achievement)
        {
            await _context.Achievements.AddAsync(achievement);
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<Achievement> GetAll()
        {
            return _context.Achievements;
        }
    }
}
