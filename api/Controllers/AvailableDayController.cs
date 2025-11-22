using Microsoft.AspNetCore.Mvc;
using Homecare.DAL;
using Homecare.Models;
using Homecare.DTOs;
using Microsoft.AspNetCore.Authorization;

namespace Homecare.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AvailableDayController : ControllerBase
    {
        private readonly IAvailableDayRepository _repository;
        private readonly ILogger<AvailableDayController> _logger;

        public AvailableDayController(IAvailableDayRepository repository, ILogger<AvailableDayController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        // GET: api/AvailableDay
        [HttpGet("availabledays")]
        public async Task<IActionResult> GetAvailableDays()
        {
            var availableDays = await _repository.GetAllAvailableDays();
            if (availableDays == null)
            {
                _logger.LogError("No available days found.");
                return NotFound();
            }

            var availableDayDtos = availableDays.Select(day => new AvailableDayDto
            {
                AvailableDayId = day.AvailableDayId,
                Date = day.Date,
                StartTime = day.StartTime,
                EndTime = day.EndTime,
                HealthcareWorker = day.HealthcareWorker,
                Notes = day.Notes,
                ServiceType = day.ServiceType
            });
            return Ok(availableDayDtos);
        }

        /*
        // GET: api/AvailableDay/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAvailableDay(int id)
        {
            var availableDay = await _repository.GetAvailableDayById(id);
            if (availableDay == null)
            {
                _logger.LogError("Available day with ID: {id}, not found", id);
                return NotFound("Available day not found");
            }
            return Ok(AvailableDayDto);
        }*/

        // Function to create a new available day
        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AvailableDayDto availableDayDto)
        {
            if (availableDayDto == null)
            {
                return BadRequest("Available day cannot be null");
            }

            var availableDay = new AvailableDay
            {
                Date = availableDayDto.Date,
                StartTime = availableDayDto.StartTime,
                EndTime = availableDayDto.EndTime,
                HealthcareWorker = availableDayDto.HealthcareWorker,
                Notes = availableDayDto.Notes,
                ServiceType = availableDayDto.ServiceType
            };

            bool returnOk = await _repository.CreateAvailableDay(availableDay);
            if (returnOk)
                return CreatedAtAction(nameof(GetAvailableDays), new { id = availableDay.AvailableDayId }, availableDay);

            _logger.LogWarning("Failed to create available day: {@availableDay}", availableDay);
            return StatusCode(500, "Internal server error");
        }

        // Function to update an existing available day
        [Authorize]
        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AvailableDayDto availableDayDto)
        {
            if (availableDayDto == null || id != availableDayDto.AvailableDayId)
            {
                return BadRequest("Available day data is invalid");
            }

            var OldAvailableDay = await _repository.GetAvailableDayById(id);
            if (OldAvailableDay == null)
            {
                return NotFound("Available day not found");
            }

            OldAvailableDay.Date = availableDayDto.Date;
            OldAvailableDay.StartTime = availableDayDto.StartTime;
            OldAvailableDay.EndTime = availableDayDto.EndTime;
            OldAvailableDay.HealthcareWorker = availableDayDto.HealthcareWorker;
            OldAvailableDay.Notes = availableDayDto.Notes;
            OldAvailableDay.ServiceType = availableDayDto.ServiceType;

            bool updated = await _repository.UpdateAvailableDay(OldAvailableDay);
            if (updated)
            {
                return Ok(OldAvailableDay);
            }
            _logger.LogWarning("Failed to update available day: {@availableDay}", OldAvailableDay);
            return StatusCode(500, "Internal server error");
        }

        // Function to delete an available day
        [Authorize]
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteAvailableDay(int id)
        {
            bool returnOk = await _repository.DeleteAvailableDay(id);
            if (!returnOk)
            {
                _logger.LogError("Failed to delete available day with ID: {id}", id);
                return BadRequest("Failed to delete available day");
            }
            return NoContent();
        }
    }
}