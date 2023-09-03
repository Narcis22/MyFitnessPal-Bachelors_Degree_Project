using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class UserMessage
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime SendDate { get; set; }
        public bool Seen { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
    }
}
