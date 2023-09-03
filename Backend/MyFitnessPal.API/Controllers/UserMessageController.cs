using Microsoft.AspNetCore.Mvc;
using MyFitnessPal.BusinessLogic.Interfaces;
using MyFitnessPal.BusinessLogic.Services;
using MyFitnessPal.Common.Constraints;
using MyFitnessPal.Common.Models;

namespace MyFitnessPal.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserMessageController: ControllerBase
    {
        private readonly IUserMessageService _userMessageService;

        public UserMessageController(IUserMessageService userMessageService)
        {
            _userMessageService = userMessageService;
        }

        [HttpPut("update")]
        public async Task<IActionResult> update([FromBody] UserMessageModel userMessage)
        {
            var result = await _userMessageService.Update(userMessage);
            return Ok(result);
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> getAll()
        {
            var result = await _userMessageService.GetAll();
            return Ok(result);
        }

        [HttpPost("sendMailToUser")]
        public async Task<IActionResult> sendMailToUser([FromBody] MessageToUserModel message)
        {
            var result = await _userMessageService.SendMailToUser(message);
            return Ok(result);
        }

    }
}
