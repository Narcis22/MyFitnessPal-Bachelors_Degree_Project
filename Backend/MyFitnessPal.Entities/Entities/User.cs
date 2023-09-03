using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string HashedPassword { get; set; }
        public string Username { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsDeleted { get; set; } = false;
        public int RoleId { get; set; }
        public virtual Role Role { get; set; }
        public virtual UserInfo? UserInfo { get; set; }
        public virtual ICollection<Token>? Tokens { get; set; }
        public virtual ICollection<UserMessage>? UserMessages { get; set; }
        public virtual ICollection<Statistics>? Statistics { get; set; }
    }
}
