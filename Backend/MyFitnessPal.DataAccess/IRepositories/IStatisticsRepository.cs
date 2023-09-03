using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.DataAccess.IRepositories
{
    public interface IStatisticsRepository
    {
        Task<bool> Create(Statistics statistics);
        Task<bool> Update(Statistics statistics);
        IQueryable<Statistics> GetAll();
    }
}
