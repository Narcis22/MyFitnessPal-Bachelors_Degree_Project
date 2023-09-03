using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IUserInfoService
    {
        Task<bool> Create(UserInfo userInfo);
        Task<bool> Update(UserInfo userInfo);
        Task<UserInfo> GetUserInfo(int userId);
        Task<UserInfo> GetUserInfoByEmail(string email);
    }
}
