using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class Achievement
    {
        public int Id { get; set; }
        public string Level { get; set; }
        public DateTime DateCreated { get; set; }   
        public int? StatisticsId { get; set; }
        public virtual Statistics? Statistics { get; set; }
    }
}
