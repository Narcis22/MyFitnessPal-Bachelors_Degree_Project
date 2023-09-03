using MyFitnessPal.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IUserMessageService
    {
        Task<List<UserMessageModel>> GetAll();
        Task<bool> Update(UserMessageModel model);
        Task<bool> SaveMessageInfo(string message, int userId);
        Task<bool> SendMailToUser(MessageToUserModel message);
    }
}
