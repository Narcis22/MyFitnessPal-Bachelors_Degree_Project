using Microsoft.AspNetCore.Mvc;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.Common.Models;

namespace MyFitnessPal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController: ControllerBase
    {
        private readonly IWorkoutService _workoutService;

        public WorkoutController(IWorkoutService workoutService)
        {
            _workoutService = workoutService;
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(NewWorkoutModel workoutModel)
        {
            var result = await _workoutService.Create(workoutModel);
            return Ok(result);
        }

        [HttpGet("getAll/{email}")]
        public async Task<IActionResult> GetAll(string email)
        {
            var workouts = await _workoutService.GetAll(email);
            return Ok(workouts);
        }
    }
}
