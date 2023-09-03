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
    public class RoleRepository: IRoleRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public RoleRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public IQueryable<Role> GetAll()
        {
            return _context.Roles;
        }
    }
}
