using Microsoft.AspNetCore.Mvc.Rendering;
using HomecareApp.Models;

namespace HomecareApp.ViewModels
{
    public class CreateAppointmentViewModel
    {
        public Appointment Appointment { get; set; } = new Appointment();
        public List<SelectListItem> AvailableSlots { get; set; } = new List<SelectListItem>();
        public List<SelectListItem> TaskTypes { get; set; } = new List<SelectListItem>();
    }
}