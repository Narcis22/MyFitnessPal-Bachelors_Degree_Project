using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.Common.Models
{
    public class StatisticsSportModel
    {
        public string SportName { get; set; }
        public int TotalDuration { get; set; }
        public int NoWorkouts { get; set; }
    }
}
