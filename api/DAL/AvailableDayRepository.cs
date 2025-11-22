using Microsoft.EntityFrameworkCore;
using Homecare.Models;

namespace Homecare.DAL
{
    public class AvailableDayRepository : IAvailableDayRepository
    {
        private readonly HomecareDbContext _db;
        private readonly ILogger<AvailableDayRepository> _logger;

        public AvailableDayRepository(HomecareDbContext db, ILogger<AvailableDayRepository> logger)
        {
            _db = db;
            _logger = logger;
        }

        public async Task<bool> CheckDatabaseConnection()
        {
            try
            {
                return await _db.Database.CanConnectAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Database connection check failed");
                return false;
            }
        }
        
        public async Task<IEnumerable<AvailableDay>?> GetAllAvailableDays()
        {
            try
            {
                return await _db.AvailableDays.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving available days");
                return null;
            }
        }

        public async Task<AvailableDay?> GetAvailableDayById(int id)
        {
            try
            {
                return await _db.AvailableDays.FindAsync(id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving available day with ID {id}");
                return null;
            }
        }

        public async Task<bool> CreateAvailableDay(AvailableDay availableDay)
        {
            try
            {
                _db.AvailableDays.Add(availableDay);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error creating available day");
                return false;
            }
        }

        public async Task<bool> UpdateAvailableDay(AvailableDay availableDay)
        {
            try
            {
                _db.AvailableDays.Update(availableDay);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error updating available day");
                return false;
            }
        }

        public async Task<bool> DeleteAvailableDay(int id)
        {
            try
            {
                var availableDay = await _db.AvailableDays.FindAsync(id);
                if (availableDay == null)
                {
                    _logger.LogError("Available day not found for deletion");
                    return false;
                }

                _db.AvailableDays.Remove(availableDay);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Error deleting available day");
                return false;
            }
        }
    }
}