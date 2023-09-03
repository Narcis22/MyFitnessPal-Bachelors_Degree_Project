using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.IRepositories
{
    public interface IUserInfoRepository
    {
        Task<bool> Create(UserInfo userInfo);
        Task<bool> Update(UserInfo userInfo);
        IQueryable<UserInfo> GetAll();
    }
}
