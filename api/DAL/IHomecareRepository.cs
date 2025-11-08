    using HomecareApp.Models;

    namespace HomecareApp.DAL;

    public interface IHomecareRepository
    {
        //Appointment metoder
        Task<IEnumerable<Appointment>?> GetAllAppointments();
        Task<Appointment?> GetAppointmentById(int id);
        Task<bool> CreateAppointment(Appointment appointment);
        Task<bool> UpdateAppointment(Appointment appointment);
        Task<bool> DeleteAppointment(int id);


        //AvailableDay metoder
        Task<IEnumerable<AvailableDay>?> GetAllAvailableDays();
        Task<AvailableDay?> GetAvailableDayById(int id);
        Task<bool> CreateAvailableDay(AvailableDay availableDay);
        Task<bool> UpdateAvailableDay(AvailableDay availableDay);
        Task<bool> DeleteAvailableDay(int id);
    }
