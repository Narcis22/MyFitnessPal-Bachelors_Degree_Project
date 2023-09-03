using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class LoginResponseModel
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
}
