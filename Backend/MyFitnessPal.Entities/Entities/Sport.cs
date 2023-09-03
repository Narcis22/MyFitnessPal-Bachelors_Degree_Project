using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Entities.Entities
{
    public class Sport
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Statistics>? Statistics { get; set; }
    }
}
