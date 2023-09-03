using Microsoft.EntityFrameworkCore;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.DataAccess;
using MyFitnessPal.DataAccess.IRepositories;
using MyFitnessPal.DataAccess.Repositories;
using MyFitnessPal.Entities.Entities;
using SendGrid.Helpers.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class UserInfoService: IUserInfoService
    {
        private readonly IUserInfoRepository _userInfoRepository;

        public UserInfoService(IUserInfoRepository userInfoRepository)
        {
            _userInfoRepository = userInfoRepository;
        }

        public async Task<UserInfo> GetUserInfo(int userId)
        {
            return await _userInfoRepository.GetAll()
                                            .Where(u => u.User.IsDeleted.Equals(false) && u.UserId == userId)
                                            .FirstOrDefaultAsync();
        }

        public async Task<UserInfo> GetUserInfoByEmail(string email)
        {
            return await _userInfoRepository.GetAll()
                                            .Where(u => u.User.IsDeleted.Equals(false) && u.User.Email.Equals(email))
                                            .FirstOrDefaultAsync();
        }

        public async Task<bool> Create(UserInfo userInfo)
        {
            return await _userInfoRepository.Create(userInfo);

        }

        public async Task<bool> Update(UserInfo userInfo)
        {
            return await _userInfoRepository.Update(userInfo);
        }

    }
}
