using Microsoft.AspNetCore.Mvc;
using HomecareApp.DAL;
using HomecareApp.Models;
using Serilog;
using HomecareApp.ViewModels;
using HomecareApp.DTOs;

namespace HomecareApp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AppointmentAPIController : ControllerBase
    {
        private readonly IHomecareRepository _repository;
        private readonly ILogger<AppointmentAPIController> _logger;

        public AppointmentAPIController(IHomecareRepository repository, ILogger<AppointmentAPIController> logger)
        {
            _repository = repository;
            _logger = logger;
        }

        // GET: api/ApiAppointment
        [HttpGet("appointmentlist")]
        public async Task<IActionResult> AppointmentList()
        {
            var appointments = await _repository.GetAllAppointments();
            if (appointments == null)
            {
                _logger.LogError("[AppointmentAPIController] Appointment List not found while executing _repository.GetAllAppointments");
                return NotFound("Appointment List not found");
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
    }

    public class AppointmentController : Controller
    {
        private readonly IHomecareRepository _repository;
        private readonly ILogger<AppointmentController> _logger;

        public AppointmentController(IHomecareRepository repository, ILogger<AppointmentController> logger)
        {
            _repository = repository;
            _logger = logger;
        }
        
        public async Task<IActionResult> Table()
        {
            var appointments = await _repository.GetAllAppointments();
            if (appointments == null)
            {
                _logger.LogError("[AppointmentController] Appointment list not found while executing _repository.GetAllAppointments()");
                return NotFound("Appointment list not found");
            }
            var appointmentsViewModel = new AppointmentListViewModel(appointments, "Table");
            return View(appointmentsViewModel);
        }

        public async Task<IActionResult> Grid()
        {
            var appointments = await _repository.GetAllAppointments();
            if (appointments == null)
            {
                _logger.LogError("[AppointmentController] Appointment list not found while executing _repository.GetAllAppointments()");
                return NotFound("Appointment list not found");
            }
            var appointmentsViewModel = new AppointmentListViewModel(appointments, "Grid");
            return View(appointmentsViewModel);
        }

        public async Task<IActionResult> Details(int id)
        {
            var appointment = await _repository.GetAppointmentById(id);
            if (appointment == null)
            {
                _logger.LogError("[AppointmentController] Appointment not found for the AppointmentId {AppointmentId:0000}", id);
                return NotFound("Appointment not found for the AppointmentId");
            }
            return View(appointment);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(Appointment appointment)
        {
            if (ModelState.IsValid)
            {
                bool returnOk = await _repository.CreateAppointment(appointment);
                if (returnOk)
                    return RedirectToAction(nameof(Table));
            }
            _logger.LogWarning("[AppointmentController] Appointment creation failed {@appointment}", appointment);
            return View(appointment);
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var appointment = await _repository.GetAppointmentById(id);
            if (appointment == null)
            {
                _logger.LogError("[AppointmentController] Appointment not found when updating the AppointmentId {AppointmentId:0000}", id);
                return BadRequest("Appointment not found for the AppointmentId");
            }
            return View(appointment);
        }

        [HttpPost]
        public async Task<IActionResult> Update(Appointment appointment)
        {
            if (ModelState.IsValid)
            {
                bool returnOk = await _repository.UpdateAppointment(appointment);
                if (returnOk)
                    return RedirectToAction(nameof(Table));
            }
            _logger.LogWarning("[AppointmentController] Appointment update failed {@appointment}", appointment);
            return View(appointment);
        }

        [HttpGet]
        public async Task<IActionResult> Delete(int id)
        {
            var appointment = await _repository.GetAppointmentById(id);
            if (appointment == null)
            {
                _logger.LogError("[AppointmentController] Appointment not found for the AppointmentId {AppointmentId:0000}", id);
                return BadRequest("Appointment not found for the AppointmentId");
            }
            return View(appointment);
        }

        [HttpPost]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            bool returnOk = await _repository.DeleteAppointment(id);
            if (!returnOk)
            {
                _logger.LogError("[AppointmentController] Appointment deletion failed for the AppointmentId {AppointmentId:0000}", id);
                return BadRequest("Appointment deletion failed");
            }
            return RedirectToAction(nameof(Table));
        }
    }
}