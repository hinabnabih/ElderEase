using Microsoft.EntityFrameworkCore;
using Homecare.Models;
 
namespace Homecare.DAL
{
    public class AppointmentRepository : IAppointmentRepository
    {
        private readonly HomecareDbContext _db;
        private readonly ILogger<AppointmentRepository> _logger;
 
        public AppointmentRepository(HomecareDbContext db, ILogger<AppointmentRepository> logger)
        {
            _db = db;
            _logger = logger;
        }
 
        public async Task<IEnumerable<Appointment>?> GetAllAppointments()
        {
            try
            {
                return await _db.Appointments.ToListAsync();
            }
            catch (Exception e)
            {
                _logger.LogError("[AppointmentRepository] appointments ToListAsync() failed when GetAllAppointments(), error message: {e}", e.Message);
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
                _logger.LogError("[AppointmentRepository] appointment FindAsync(id) failed when GetAppointmentById for AppointmentId {AppointmentId:0000}, error message: {e}", id, e.Message);
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
                _logger.LogError("[AppointmentRepository] appointment creation failed for appointment {@appointment}, error message: {e}", appointment, e.Message);
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
                _logger.LogError("[AppointmentRepository] appointment update failed for appointment {@appointment}, error message: {e}", appointment, e.Message);
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
                    _logger.LogError("[AppointmentRepository] appointment not found for the AppointmentId {AppointmentId:0000}", id);
                    return false;
                }
 
                _db.Appointments.Remove(appointment);
                await _db.SaveChangesAsync();
                return true;
            }
            catch (Exception e)
            {
                _logger.LogError("[AppointmentRepository] appointment deletion failed for the AppointmentId {AppointmentId:0000}, error message: {e}", id, e.Message);
                return false;
            }
        }
    }
}
 