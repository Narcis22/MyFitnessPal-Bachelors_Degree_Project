using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.IRepositories
{
    public interface IAchievementRepository
    {
        Task<bool> Create(Achievement achievement);
        IQueryable<Achievement> GetAll();
    }
}
