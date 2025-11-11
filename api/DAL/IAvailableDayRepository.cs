using HomecareApp.Models;

namespace HomecareApp.DAL;

public interface IAvailableDayRepository
{
    Task<IEnumerable<AvailableDay>?> GetAllAvailableDays();
        Task<AvailableDay?> GetAvailableDayById(int id);
        Task<bool> CreateAvailableDay(AvailableDay availableDay);
        Task<bool> UpdateAvailableDay(AvailableDay availableDay);
        Task<bool> DeleteAvailableDay(int id);
}