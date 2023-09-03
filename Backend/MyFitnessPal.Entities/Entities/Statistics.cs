using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class Statistics
    {
        public int Id { get; set; }
        public DateTime FirstWorkoutDate { get; set; }
        public DateTime LastWorkoutDate { get; set; }
        public int? TotalConsecutiveDays { get; set; } = 0;
        public int? TotalDuration { get; set; } = 0; 
        public int? SportId { get; set; } = null; 
        public virtual Sport? Sport { get; set; }
        public int UserId { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Achievement>? Achievements { get; set; }
        public virtual ICollection<Workout>? Workouts { get; set; }
    }
}
