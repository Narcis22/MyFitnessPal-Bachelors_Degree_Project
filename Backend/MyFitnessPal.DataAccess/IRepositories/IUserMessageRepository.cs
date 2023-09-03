using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IUserMessageRepository
    {
        Task<bool> Create(UserMessage userMessage);
        Task<bool> Update(UserMessage userMessage);
        IQueryable<UserMessage> GetAll();
    }
}
