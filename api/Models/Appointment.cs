using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Storage;

namespace Homecare.Models
{
    public class Appointment
    {
        [Required]
        public int AppointmentId { get; set; }
        
        [Required]
        public int AvailableDayId { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-z0-9\s]{2,50}$",
            ErrorMessage ="The patient name must be between 2-50 characters.")]
        public string PatientName { get; set; } = string.Empty;

        [Required]
        public string TaskType { get; set; } = "Assistance"; // Assistance, Medication, Shopping, Chores
        
        public string? Description { get; set; }


        [Required]
        [DataType(DataType.Date)]
        public DateTime AppointmentDate { get; set; } = DateTime.Now;

        [Required]
        [DataType(DataType.Time)]
        public TimeSpan StartTime { get; set; } = new TimeSpan(9, 0, 0);
        
        [Required]
        [DataType(DataType.Time)]
        public TimeSpan EndTime { get; set; } = new TimeSpan(17,0,0);

        [Required]
        [RegularExpression(@"^[a-zA-z0-9\s]{2,50}$",
            ErrorMessage ="The caregiver name must be between 2-50 characters.")]
        public string CaregiverName { get; set; } = string.Empty;

        public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled
        
        // Navigation property
        public virtual AvailableDay? AvailableDay { get; set; }
    }
}