using System.ComponentModel.DataAnnotations;

namespace HomecareApp.DTOs
{
    public class AppointmentDto
    {
        public int AppointmentId { get; set; }
        
        [Required]
        public int AvailableDayId { get; set; }
        
        [Required]
        public string PatientName { get; set; } = string.Empty;
        
        [Required]
        public string TaskType { get; set; } = "Assistance"; // Assistance, Medication, Shopping, Chores
        
        public string? Description { get; set; }

        public DateTime AppointmentDate { get; set; }
        
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }

        public string CaregiverName { get; set; } = string.Empty;

        public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled

    }
}