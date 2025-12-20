using System.ComponentModel.DataAnnotations;

namespace Homecare.DTOs
{
    public class AvailableDayDto
    {
        public int AvailableDayId { get; set; }
        
        [Required(ErrorMessage = "Date is required.")]
        public DateTime Date { get; set; }

        [Required(ErrorMessage = "Start time is required.")]
        public string? StartTime { get; set; }

        [Required(ErrorMessage = "End time is required.")]
        public string? EndTime { get; set; }

        [Required]
        [RegularExpression(@"^[a-zA-ZæøåÆØÅ.\s]{2,50}$", ErrorMessage = "The healthcare worker name must be between 2-30 characters ")]
        public string HealthcareWorker { get; set; } = string.Empty;
        
        [StringLength(500, ErrorMessage = "Notes can't be longer than 500 characters")]
        public string? Notes { get; set; }

        [Required(ErrorMessage = "Service type is required.")]
        public string? ServiceType { get; set; }
        
    }
}