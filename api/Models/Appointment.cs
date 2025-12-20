using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore.Storage;

namespace Homecare.Models
{
    public class Appointment
    {
        
        public int AppointmentId { get; set; }
        
        
        public int AvailableDayId { get; set; }

        [RegularExpression(@"^[a-zA-z0-9\s]{2,50}$",
            ErrorMessage ="The patient name must be between 2-50 characters.")]
        public string PatientName { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(Assistance|Medication|Shopping|Chores|Cooking|Companionship|Transport|PersonalCare)$", 
        ErrorMessage = "You have to choose a tasktype.")]
        public string TaskType { get; set; } = "Assistance"; // Assistance, Medication, Shopping, Chores

        //[StringLength(500, ErrorMessage = "Description can't be longer than 500 characters")]
        //public string? Description { get; set; }

        [Required]
        [DataType(DataType.Date)]
        public DateTime AppointmentDate { get; set; } = DateTime.Now;

        [Required]
        [DataType(DataType.Time)]
        public string? StartTime { get; set; } 
        
        [Required]
        [DataType(DataType.Time)]
        public string? EndTime { get; set; }
        
        [Required]
        [RegularExpression(@"^[a-zA-z0-9\s]{2,50}$",
            ErrorMessage ="The caregiver name must be between 2-50 characters.")]
        public string CaregiverName { get; set; } = string.Empty;

        [RegularExpression(@"^(Scheduled|Completed|Cancelled)$")]
        public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled
        
        // Navigation property
        public virtual AvailableDay? AvailableDay { get; set; }
    }
}