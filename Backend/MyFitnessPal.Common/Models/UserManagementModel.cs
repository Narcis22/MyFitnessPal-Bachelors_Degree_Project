using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class UserManagementModel
    {
        public string Email { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public DateTime DateJoin { get; set; }
        public string ProfilePicId { get; set; }
        public string Image { get; set; }
        public string ImageContentType { get; set; }
    }
}
