using Azure;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class UserModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; } = null;
        public string LastName { get; set; } = null;
        public string Email { get; set; }
        public string? Username { get; set; } = null;
        public string? Sex { get; set; } = null;
        public int? Height { get; set; } = null;
        public float? Weight { get; set; } = null;
        public int? Age { get; set; } = null;
    }
}