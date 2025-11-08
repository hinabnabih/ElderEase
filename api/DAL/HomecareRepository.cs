using Microsoft.EntityFrameworkCore;
using HomecareApp.Models;

namespace HomecareApp.DAL
{
    public class HomecareRepository : IHomecareRepository
    {
        private readonly HomecareDbContext _db;
        private readonly ILogger<HomecareRepository> _logger;

        public HomecareRepository(HomecareDbContext db, ILogger<HomecareRepository> logger)
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
                await Task.Delay(100);
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
        
    // Appointment metoder (implementer etter samme mønster)
        public async Task<IEnumerable<Appointment>?> GetAllAppointments()
        {
            try
            {
                return await _db.Appointments.ToListAsync();
            }
            catch (Exception e)
            {
                _logger.LogError("[HomecareRepository] Appointments ToListAsync() failed when GetAllAppointments(), error message: {e}", e.Message);
                return null;
            }
        }

        public async Task<Appointment?> GetAppointmentById(int id)
        {
            try
            {
                return await _db.Appointments.FindAsync(id);
            }
            catch (Exception e)
            {
                _logger.LogError("[HomecareRepository] Appointment FindAsync(id) failed when GetAppointmentById for AppointmentId {AppointmentId:0000}, error message: {e}", id, e.Message);
                return null;
            }
        }

        public async Task<bool> CreateAppointment(Appointment appointment)
        {
            try
            {
                _db.Appointments.Add(appointment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[HomecareRepository] Appointment creation failed for appointment {@appointment}, error message: {e}", appointment, e.Message);
                return false;
            }
        }

        public async Task<bool> UpdateAppointment(Appointment appointment)
        {
            try
            {
                _db.Appointments.Update(appointment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[HomecareRepository] Appointment update failed for AppointmentId {AppointmentId:0000}, error message: {e}", appointment.AppointmentId, e.Message);
                return false;
            }
        }

        public async Task<bool> DeleteAppointment(int id)
        {
            try
            {
                var appointment = await _db.Appointments.FindAsync(id);
                if (appointment == null)
                {
                    _logger.LogError("[HomecareRepository] Appointment not found for the AppointmentId {AppointmentId:0000}", id);
                    return false;
                }

                _db.Appointments.Remove(appointment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[HomecareRepository] Appointment deletion failed for the AppointmentId {AppointmentId:0000}, error message: {e}", id, e.Message);
                return false;
            }
        }
    }
}