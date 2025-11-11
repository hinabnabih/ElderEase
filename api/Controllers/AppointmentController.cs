using Microsoft.AspNetCore.Mvc;
using HomecareApp.DAL;
using HomecareApp.Models;
using HomecareApp.DTOs;

namespace HomecareApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentController : ControllerBase
    {
        private readonly IHomecareRepository _repository;
        private readonly ILogger<AppointmentController> _logger;

        public AppointmentController(IHomecareRepository repository, ILogger<AppointmentController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        [HttpGet("appointmentlist")]
        public async Task<IActionResult> AppointmentList()
        {
            var appointments = await _repository.GetAllAppointments();
            if (appointments == null)
            {
                _logger.LogError("[AppointmentController] Appointment list not found while executing _repository.GetAllAppointments()");
                return NotFound("Appointment list not found");
            }
            var appointmentDtos = appointments.Select(appointment => new AppointmentDto
            {
                AppointmentId = appointment.AppointmentId,
                AvailableDayId = appointment.AvailableDayId,
                PatientName = appointment.PatientName,
                TaskType = appointment.TaskType,
                Description = appointment.Description,
                AppointmentDate = appointment.AppointmentDate,
                StartTime = appointment.StartTime,
                EndTime = appointment.EndTime,
                CaregiverName = appointment.CaregiverName,
                Status = appointment.Status
            });
            return Ok(appointmentDtos);
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] AppointmentDto appointmentDto)
        {
            if (appointmentDto == null)
            {
                return BadRequest("Appointment cannot be null");
            }
            var newAppointment = new Appointment
            {
                AvailableDayId = appointmentDto.AvailableDayId,
                PatientName = appointmentDto.PatientName,
                TaskType = appointmentDto.TaskType,
                Description = appointmentDto.Description,
                AppointmentDate = appointmentDto.AppointmentDate,
                StartTime = appointmentDto.StartTime,
                EndTime = appointmentDto.EndTime,
                CaregiverName = appointmentDto.CaregiverName,
                Status = appointmentDto.Status
            };
            bool returnOk = await _repository.CreateAppointment(newAppointment);
            if (returnOk)
                return CreatedAtAction(nameof(AppointmentList), new { id = newAppointment.AppointmentId }, newAppointment);

            _logger.LogWarning("[AppointmentController] Appointment creation failed {@appointment}", newAppointment);
            return StatusCode(500, "Internal server error");
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetAppointment(int id)
        {
            var appointment = await _repository.GetAppointmentById(id);
            if (appointment == null)
            {
                _logger.LogError("[AppointmentController] Appointment not found for the AppointmentId {AppointmentId:0000}", id);
                return NotFound("Appointment not found for the AppointmentId");
            }
            return Ok(appointment);
        }

        [HttpPut("update/{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] AppointmentDto appointmentDto)
        {
            if (appointmentDto == null)
            {
                return BadRequest("Appointment data cannot be null");
            }
            // Find the appointment in the database
            var existingAppointment = await _repository.GetAppointmentById(id);
            if (existingAppointment == null)
            {
                return NotFound("Appointment not found");
            }
            // Update the appointment properties
            existingAppointment.AvailableDayId = appointmentDto.AvailableDayId;
            existingAppointment.PatientName = appointmentDto.PatientName;
            existingAppointment.TaskType = appointmentDto.TaskType;
            existingAppointment.Description = appointmentDto.Description;
            existingAppointment.AppointmentDate = appointmentDto.AppointmentDate;
            existingAppointment.StartTime = appointmentDto.StartTime;
            existingAppointment.EndTime = appointmentDto.EndTime;
            existingAppointment.CaregiverName = appointmentDto.CaregiverName;
            existingAppointment.Status = appointmentDto.Status;
            // Save the changes
            bool updateSuccessful = await _repository.UpdateAppointment(existingAppointment);
            if (updateSuccessful)
            {
                return Ok(existingAppointment); // Return the updated appointment
            }

            _logger.LogWarning("[AppointmentController] Appointment update failed {@appointment}", existingAppointment);
            return StatusCode(500, "Internal server error");
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            bool returnOk = await _repository.DeleteAppointment(id);
            if (!returnOk)
            {
                _logger.LogError("[AppointmentController] Appointment deletion failed for the AppointmentId {AppointmentId:0000}", id);
                return BadRequest("Appointment deletion failed");
            }
            return NoContent();
        }        
    }
}