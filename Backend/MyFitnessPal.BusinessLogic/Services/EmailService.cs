using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Entities.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Mail;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using MyFitnessPal.DataAccess;
using MyFitnessPal.Common.Models;
using MyFitnessPal.Common.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class EmailService: IEmailService
    {
        private string _customerServiceEmail = "denissa.prede@gmail.com";
        private string _customerServiceAccessPassword = "vdukalomybgffccv";
        private string _host = "smtp.gmail.com";

        public async Task<bool> SendMailWithNewPassword(string subject, string body, string mailTo)
        {
            return await SendMail(subject, body, _customerServiceEmail, mailTo);
          
        }

        public async Task<bool> SendMailToCustomerService(string subject, string message)
        {
            return await SendMail(subject, message, _customerServiceEmail, _customerServiceEmail);
        }

        public async Task<bool> SendMail(string subject, string body, string from, string to)
        {
            MailMessage mail = new MailMessage();
            mail.From = new MailAddress(_customerServiceEmail);
            mail.To.Add(to);
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;

            SmtpClient smtpClient = new SmtpClient();
            smtpClient.Host = _host;
            NetworkCredential networkCredential = new NetworkCredential();
            networkCredential.UserName = from;
            networkCredential.Password = _customerServiceAccessPassword;
            smtpClient.UseDefaultCredentials = false;
            smtpClient.Credentials = networkCredential;
            smtpClient.Port = 587;
            smtpClient.EnableSsl = true;

            try
            {
                smtpClient.SendAsync(mail, "");
            }
            catch
            {
                return false;
            }
            return true;
        }
    }
}
