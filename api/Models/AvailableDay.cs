using System.ComponentModel.DataAnnotations;

namespace Homecare.Models
{
    public class AvailableDay
    {
        public int AvailableDayId { get; set; }

        [Required]
        [DataType(DataType.Date)]
        [Display(Name = "Date")]
        public DateTime Date { get; set; }

        [Required]
        [DataType(DataType.Time)]
        public string? StartTime { get; set; }

        [Required]
        [DataType(DataType.Time)]
        public string? EndTime { get; set; }
        
        [Required]
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ.\s]{2,50}$",
            ErrorMessage ="The healthcare name must be between 2-50 characters.")]
        public string HealthcareWorker { get; set; } = string.Empty;
        
        public string? Notes { get; set; }

        [Required]
        public string? ServiceType { get; set; } = "General Care"; // Assistance with shopping, Help with preparing meals, Household chores
            
        // Navigation property
        public virtual List<Appointment>? Appointments { get; set; }
    }
}