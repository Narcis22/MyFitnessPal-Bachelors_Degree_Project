using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.Repositories
{
    public class StatisticsRepository: IStatisticsRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public StatisticsRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(Statistics statistics)  
        {
            await _context.Statistics.AddAsync(statistics);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(Statistics statistics)
        {
            _context.Statistics.Update(statistics);
            return await _context.SaveChangesAsync() > 0;
        }

        public IQueryable<Statistics> GetAll()
        {
            return _context.Statistics;
        }
    }
}
