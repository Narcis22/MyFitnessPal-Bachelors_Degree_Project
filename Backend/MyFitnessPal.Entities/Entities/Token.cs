using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class Token
    {
        public int Id { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public string TokenValue { get; set; }
        public string RefreshToken { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime ExpireAt { get; set; }
        public bool IsTokenRevoked { get; set; }
        public virtual User User { get; set; }
    }
}
