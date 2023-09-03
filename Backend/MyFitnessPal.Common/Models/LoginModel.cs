using MediatR;
using MyFitnessPal.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class LoginModel
    {
        public string Password { get; set; }
        public string Email { get; set; }
    }
}
