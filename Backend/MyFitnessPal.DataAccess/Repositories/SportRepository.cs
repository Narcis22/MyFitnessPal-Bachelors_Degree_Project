using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.Repositories
{
    public class SportRepository: ISportRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public SportRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public IQueryable<Sport> GetAll()
        {
            return _context.Sports;
        }
    }
}
