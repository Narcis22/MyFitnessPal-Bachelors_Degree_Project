using Microsoft.AspNetCore.Mvc;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.BusinessLogic.Services;

namespace MyFitnessPal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController: ControllerBase
    {
        private readonly IChartService _chartService;
        private readonly IStatisticsService _statisticsService;

        public StatisticsController(
            IChartService chartService, 
            IStatisticsService statisticsService
            ) {
            _chartService = chartService;
            _statisticsService = statisticsService;
        }

        [HttpGet("getStatisticsSport")]
        public async Task<IActionResult> GetStatisticsSport()
        {
            var result = await _chartService.GetStatisticsSport();
            return Ok(result);
        }

        [HttpGet("getStatisticsAchievement")]
        public async Task<IActionResult> GetStatisticsAchievement()
        {
            var result = await _chartService.GetStatisticsAchievement();
            return Ok(result);
        }

        [HttpGet("getSportIds/{email}")]
        public async Task<IActionResult> getSportIds(string email)
        {
            var sports = await _statisticsService.getSportIdsForUser(email);
            return Ok(sports);
        }

    }
}
