using HomecareApp.Models;

namespace HomecareApp.DAL;

public interface IAppointmentRepository
{
    Task<IEnumerable<Appointment>?> GetAllAppointments();
    Task<Appointment?> GetAppointmentById(int id);
    Task<bool> CreateAppointment(Appointment appointment);
    Task<bool> UpdateAppointment(Appointment appointment);
    Task<bool> DeleteAppointment(int id);
}