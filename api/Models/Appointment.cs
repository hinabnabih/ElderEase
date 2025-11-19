
using System.ComponentModel.DataAnnotations;

namespace HomecareApp.Models
{
    public class Appointment
    {
        public int AppointmentId { get; set; }
        
        [Required]
        public int AvailableDayId { get; set; }
        
        [Required]
        public string PatientName { get; set; } = string.Empty;
        
        [Required]
        public string TaskType { get; set; } = "Assistance"; // Assistance, Medication, Shopping, Chores
        
        public string? Description { get; set; }

        public DateTime AppointmentDate { get; set; } = DateTime.Now;
        
        public TimeSpan StartTime { get; set; } = new TimeSpan(9,0,0);
        public TimeSpan EndTime { get; set; } = new TimeSpan(17,0,0);

        public string CaregiverName { get; set; } = string.Empty;

        public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled
        
              // Navigation property
        public virtual List<AvailableDay>? AvailableDays { get; set; }
    }
}
