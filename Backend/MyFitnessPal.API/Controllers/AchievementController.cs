using Microsoft.AspNetCore.Mvc;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Models;
using MyFitnessPal.Entities.Entities;

namespace MyFitnessPal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AchievementController : ControllerBase
    {
        private readonly IAchievementService _achievementService;

        public AchievementController(IAchievementService achievementService)
        {
            _achievementService = achievementService;
        }

        [HttpGet("getAll/{email}")]
        public async Task<IActionResult> GetAll(string email)
        {
            var achievements = await _achievementService.GetAll(email);
            return Ok(achievements);
        }
        [HttpGet("getAchievementById/{id}")]
        public async Task<IActionResult> GetAchievementById(int id)
        {
            var achievements = await _achievementService.GetAchievementById(id);
            return Ok(achievements);
        }

    }
}
