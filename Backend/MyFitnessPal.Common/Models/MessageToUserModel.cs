using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class MessageToUserModel
    {
        public string EmailSender { get; set; }
        public string EmailReceiver { get; set; }
        public string Message { get; set; }
    }
}
