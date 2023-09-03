using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.IRepositories
{
    public interface IUserRepository
    {
        Task<bool> Create(User user);
        Task<bool> Update(User user);
        IQueryable<User> GetAll();
        IQueryable<User> GetAllIncludeRole();
    }
}
