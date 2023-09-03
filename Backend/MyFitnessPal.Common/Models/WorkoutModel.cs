using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class WorkoutModel
    {
        public string Username { get; set; }
        public int? SportId{ get; set; }
        public DateTime CreatedAt { get; set; }
        public int Duration { get; set; }
        public int? Steps { get; set; } = null;
        public float? Distance { get; set; } = null;
    }
}
