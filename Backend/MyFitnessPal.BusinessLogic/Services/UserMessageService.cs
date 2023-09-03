using Microsoft.EntityFrameworkCore;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Models;
using MyFitnessPal.Entities.Entities;
using System.Text;

namespace MyFitnessPal.BusinessLogic.Services
{
    public class UserMessageService: IUserMessageService
    {
        readonly private IUserMessageRepository _userMessageRepository;
        private readonly IEmailService _emailService;

        public UserMessageService(
            IUserMessageRepository userMessageRepository,
            IEmailService emailService
            )
        {
            _userMessageRepository = userMessageRepository;
            _emailService = emailService;
        }

        public async Task<bool> SaveMessageInfo(string message, int userId)
        {
            UserMessage userMessage = new UserMessage();
            userMessage.Message = message;
            userMessage.Seen = false;
            userMessage.UserId = userId;
            userMessage.SendDate = DateTime.UtcNow;

            return await _userMessageRepository.Create(userMessage);
        }

        public async Task<List<UserMessageModel>> GetAll()
        {
            return await _userMessageRepository.GetAll()
                .Select(u => new UserMessageModel
                {
                    MessageId = u.Id,
                    Message = u.Message,
                    IsSeen = u.Seen,
                    DateSent = u.SendDate,
                    EmailSender = u.User.Email,
                    ProfilePicId = u.User.UserInfo.ProfilePhotoId,
                    Image = u.User.UserInfo.ImageByteArray == null ? "" : Convert.ToBase64String(u.User.UserInfo.ImageByteArray),
                    ImageContentType = u.User.UserInfo.ImageContentType
                }).ToListAsync();
        }

        public async Task<bool> Update(UserMessageModel model)
        {
            UserMessage userMessage = new UserMessage();
            userMessage.Id = model.MessageId;
            userMessage.SendDate = model.DateSent;
            userMessage.Seen = true;
            userMessage.Message = model.Message;
            userMessage.UserId = await GetUserIdByEmail(model.EmailSender);

            return await _userMessageRepository.Update(userMessage);
        }

        public async Task<int> GetUserIdByEmail(string email)
        {
            return await _userMessageRepository.GetAll()
                                .Where(u => u.User.Email.Equals(email))
                                .Select(u => u.UserId)
                                .FirstOrDefaultAsync();
        }

        public async Task<bool> SendMailToUser(MessageToUserModel info)
        {

            StringBuilder sb = new StringBuilder();
            sb.AppendLine("<div> Hi user, </div>");
            sb.AppendLine("<br/>");
            sb.AppendLine("<div> This is the replay to your message: </div>");
            sb.AppendLine("<br/>");
            sb.AppendLine($"<div>{info.Message}</div>");
            sb.AppendLine("<br/>");
            sb.AppendLine("<div> Using MyFitnessPal's built in email sending functionality </div>");

            string subject = string.Format("Respond to the message from MyFitnessPal");

            return await _emailService.SendMail(subject, sb.ToString(), info.EmailSender, info.EmailReceiver);

        }
    }
}
