using Homecare.Models;

namespace Homecare.ViewModels
{
    public class AvailableDayListViewModel
    {
        public IEnumerable<AvailableDay> AvailableDays { get; set; } = new List<AvailableDay>();
        public string CurrentViewName { get; set; } = "Available Days";

        public AvailableDayListViewModel(IEnumerable<AvailableDay> availableDays, string currentViewName)
        {
            AvailableDays = availableDays;
            CurrentViewName = currentViewName;
        }
    }
}