using MyFitnessPal.Common.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyFitnessPal.BusinessLogic.Interfaces
{
    public interface IChartService
    {
        Task<List<StatisticsSportModel>> GetStatisticsSport();
        Task<List<StatisticsAchievementModel>> GetStatisticsAchievement();
    }
}
