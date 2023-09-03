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
    public class UserRepository: IUserRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public UserRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }
     
        public async Task<bool> Create(User user)
        {
            await _context.Users.AddAsync(user);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<bool> Update(User user)
        {
            _context.Users.Update(user);
            return await _context.SaveChangesAsync() > 0;
        }
        public IQueryable<User> GetAll()
        {
            return _context.Users;
        }
        public IQueryable<User> GetAllIncludeRole()
        {
            return GetAll().Include(role => role.Role);
        }

    }
}
