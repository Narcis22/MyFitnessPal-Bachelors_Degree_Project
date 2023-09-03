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
    public class UserInfoRepository: IUserInfoRepository
    {
        private readonly MyFitnessPalDbContext _context;

        public UserInfoRepository(MyFitnessPalDbContext context)
        {
            _context = context;
        }

        public async Task<bool> Create(UserInfo userInfo)
        {
            await _context.UsersInfo.AddAsync(userInfo);
            return await _context.SaveChangesAsync() > 0;

        }
        public async Task<bool> Update(UserInfo userInfo)
        {
            _context.UsersInfo.Update(userInfo);
            return await _context.SaveChangesAsync() > 0;
        }
        public IQueryable<UserInfo> GetAll()
        {
            return _context.UsersInfo;
        }

    }
}
