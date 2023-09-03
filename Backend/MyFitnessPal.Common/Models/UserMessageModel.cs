using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class UserMessageModel
    {
        public int MessageId { get; set; } = 0;
        public string Message { get; set; }
        public DateTime DateSent { get; set; }
        public bool IsSeen { get; set; }
        public string EmailSender { get; set; }
        public string ProfilePicId { get; set; }
        public string Image { get; set; }
        public string ImageContentType { get; set; }
    }
}
