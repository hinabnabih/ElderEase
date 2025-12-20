using Microsoft.EntityFrameworkCore;
using Homecare.Models;

namespace Homecare.DAL
{
    public static class DBInit
    {
        public static void Seed(IApplicationBuilder app)
        {
            using var serviceScope = app.ApplicationServices.CreateScope();
            HomecareDbContext context = serviceScope.ServiceProvider.GetRequiredService<HomecareDbContext>();
            context.Database.EnsureDeleted();
            context.Database.EnsureCreated();

            if (!context.AvailableDays.Any())
            {
                var availableDays = new List<AvailableDay>
            {
                new AvailableDay {
                Date = DateTime.Today.AddDays(1),
                StartTime = "08:00",
                EndTime = "16:00",
                HealthcareWorker = "Dr Jonas Hansen",
                Notes = "Regular day schedule",
                ServiceType = "General Care"
            },

                new AvailableDay {
                Date = DateTime.Today.AddDays(2),
                StartTime = "10:00",
                EndTime = "18:00",
                HealthcareWorker = "Nurse Johansen",
                Notes = "Can take extra appointments",
                ServiceType = "Assistance with shopping"
            },

                new AvailableDay {
                Date = DateTime.Today.AddDays(3),
                StartTime = "09:00",
                EndTime = "15:00",
                HealthcareWorker = "Dr. Larsen",
                Notes = "Short shift",
                ServiceType = "Household chores"

            },
        };

                context.AddRange(availableDays);
                context.SaveChanges();

            }

            if (!context.Appointments.Any())
            {

                var appointments = new List<Appointment>
{
    new Appointment {
        AvailableDayId = 1,
        PatientName = "John Doe",
        TaskType = "Medication",
        //Description = "Daily blood pressure medication",
        AppointmentDate = DateTime.Today.AddDays(1),
        StartTime = "09:00",
        EndTime = "09:30",
        CaregiverName = "Rabia",
        Status = "Scheduled"
    },
    new Appointment {
        AvailableDayId = 2,
        PatientName = "Jane Smith",
        TaskType = "Assistance",
        //Description = "Help with grocery shopping",
        AppointmentDate = DateTime.Today.AddDays(2),
        StartTime = "11:00",
        EndTime = "12:00",
        CaregiverName = "Rabia",
        Status = "Completed"
    },
    new Appointment {
        AvailableDayId = 3,
        PatientName = "Ola Nordmann",
        TaskType = "Chores",
        //Description = "Help with cleaning the living room",
        AppointmentDate = DateTime.Today.AddDays(3),
        StartTime = "13:00",
        EndTime = "14:00",
        CaregiverName = "Rabia",
        Status = "Cancelled"
    }
};

                context.AddRange(appointments);
                context.SaveChanges();

            }
        }
    }
}
