using MyFitnessPal.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IEmailService
    {
        Task<bool> SendMailWithNewPassword(string subject, string body, string mailTo);
        Task<bool> SendMailToCustomerService(string subject, string message);
        Task<bool> SendMail(string subject, string body, string from, string to);
    }
}
