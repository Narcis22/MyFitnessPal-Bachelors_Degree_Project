using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class Workout
    {
        public int Id { get; set; }
        public int Duration { get; set; }
        public DateTime CreatedAt { get; set; }
        public int? Steps { get; set; } = 0;
        public float? Distance { get; set; } = 0;
        public int StatisticsId { get; set; }
        public virtual Statistics Statistics { get; set; }
    }
}
