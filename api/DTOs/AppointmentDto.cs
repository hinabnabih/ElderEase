using System.ComponentModel.DataAnnotations;

namespace Homecare.DTOs
{
    public class AppointmentDto
    {
        public int AppointmentId { get; set; }

        [Required]
        public int AvailableDayId { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ\s]{2,30}$", ErrorMessage = "The Patient name must be between 2-30 characters ")]
        [Display(Name = "Patient Name")]
        public string PatientName { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(Assistance|Medication|Shopping|Chores|Cooking|Companionship|Transport|PersonalCare)$", ErrorMessage = "You have to choose between Assistance, Medication, Shopping, Chores, Cooking, Companionship, Transport or PersonalCare")]
        public string TaskType { get; set; } = "Assistance"; // Assistance, Medication, Shopping, Chores, Cooking, Companionship, Transport, PersonalCare

        //[StringLength(500, ErrorMessage = "Description can't be longer than 500 characters")]
        //public string? Description { get; set; }

        [Required(ErrorMessage = "Appointment date is required")]
        public DateTime AppointmentDate { get; set; }
        
        [Required(ErrorMessage = "Start time is required")]
        public string? StartTime { get; set; }

        [Required(ErrorMessage = "End time is required")]
        public string? EndTime { get; set; }
    
        [Required]
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ.\s]{2,30}$", ErrorMessage = "The healthcare worker name must be between 2-30 characters ")]
        public string CaregiverName { get; set; } = string.Empty;

        [Required]
        [RegularExpression(@"^(Scheduled|Completed|Cancelled)$", ErrorMessage = "The appointment must have a valid status.")]
        public string Status { get; set; } = "Scheduled"; // Scheduled, Completed, Cancelled
    }
}