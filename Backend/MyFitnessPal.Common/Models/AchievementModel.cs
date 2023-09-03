using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class AchievementModel
    {
        public int UserId { get; set; }
        public string SportName { get; set; }
        public int Level { get; set; } 
        public DateTime dateCreated { get; set; }
    }
}
