using Microsoft.AspNetCore.Mvc;
using Homecare.DAL;
using Homecare.Models;

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
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AvailableDay>>> GetAvailableDays()
        {
            var availableDays = await _repository.GetAllAvailableDays();
            if (availableDays == null)
            {
                return NotFound();
            }
            return Ok(availableDays);
        }

        // GET: api/AvailableDay/5
        [HttpGet("{id}")]
        public async Task<ActionResult<AvailableDay>> GetAvailableDay(int id)
        {
            var availableDay = await _repository.GetAvailableDayById(id);
            if (availableDay == null)
            {
                return NotFound();
            }
            return availableDay;
        }

        // POST: api/AvailableDay
        [HttpPost]
        public async Task<ActionResult<AvailableDay>> PostAvailableDay(AvailableDay availableDay)
        {
            var success = await _repository.CreateAvailableDay(availableDay);
            if (!success)
            {
                return BadRequest();
            }
            return CreatedAtAction(nameof(GetAvailableDay), new { id = availableDay.AvailableDayId }, availableDay);
        }

        // PUT: api/AvailableDay/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAvailableDay(int id, AvailableDay availableDay)
        {
            if (id != availableDay.AvailableDayId)
            {
                return BadRequest();
            }

            var success = await _repository.UpdateAvailableDay(availableDay);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }

        // DELETE: api/AvailableDay/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAvailableDay(int id)
        {
            var success = await _repository.DeleteAvailableDay(id);
            if (!success)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}