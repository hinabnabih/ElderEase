using HomecareApp.Models;

namespace HomecareApp.ViewModels;
    public class AppointmentListViewModel
    {
        public IEnumerable<Appointment> Appointments { get; set; } = new List<Appointment>();
        public string CurrentViewName { get; set; } = "Task List";
        public string FilterStatus { get; set; } = "All";

        public AppointmentListViewModel(IEnumerable<Appointment> appointments, string currentViewName, string filterStatus = "All")
        {
            Appointments = appointments;
            CurrentViewName = currentViewName;
            FilterStatus = filterStatus;
        }
    }
    