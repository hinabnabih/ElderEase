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


            context.Database.Migrate();
            System.Threading.Thread.Sleep(500);


            var availableDays = new List<AvailableDay>
                {
                    new AvailableDay {
                        Date = DateTime.Today.AddDays(1),
                        HealthcareWorker = "Dr. Smith",
                        Notes = "Morning shift"
                    },
                    new AvailableDay {
                        Date = DateTime.Today.AddDays(2),
                        HealthcareWorker = "Nurse Johnson",
                        Notes = "Full day available"
                    }
                };
            context.AddRange(availableDays);
            context.SaveChanges();

            var appointments = new List<Appointment>
                {
                    new Appointment {
                        AvailableDayId = 1,
                        PatientName = "John Doe",
                        TaskType = "Medication Reminder",
                        Description = "Morning medication",
                        StartTime = new TimeSpan(9, 0, 0),
                        EndTime = new TimeSpan(9, 30, 0),
                        CaregiverName = "Rabia",
                        Status = "Cancelled"
                    },
                    new Appointment {
                        AvailableDayId = 2,
                        PatientName = "Jane Smith",
                        TaskType = "Physical Therapy",
                        Description = "Afternoon session",
                        StartTime = new TimeSpan(14, 0, 0),
                        EndTime = new TimeSpan(15, 0, 0),
                        CaregiverName = "Rabia",
                        Status = "Completed"
                    },
                    new Appointment {
                        AvailableDayId = 3,
                        PatientName = "Jane Smith",
                        TaskType = "Physical Therapy",
                        Description = "Afternoon session",
                        StartTime = new TimeSpan(14, 0, 0),
                        EndTime = new TimeSpan(15, 0, 0),
                        CaregiverName = "Rabia",
                        Status = "Completed"
                    }
                };
            context.AddRange(appointments);
            context.SaveChanges();
        }
    }
}
