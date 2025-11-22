using System.ComponentModel.DataAnnotations;

namespace Homecare.DTOs
{
    public class AvailableDayDto
    {
        public int AvailableDayId { get; set; }
        
        [Required]
        public DateTime Date { get; set; }

        [Required]
        public TimeSpan StartTime { get; set; }

        [Required]
        public TimeSpan EndTime { get; set; }
        
        [Required]
        public string HealthcareWorker { get; set; } = string.Empty;
        
        public string? Notes { get; set; }
        public string ServiceType { get; set; } = "General Care"; // Assistance with shopping, Help with preparing meals, Household chores
        
    }
}