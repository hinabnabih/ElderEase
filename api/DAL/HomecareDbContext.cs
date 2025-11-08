using Microsoft.EntityFrameworkCore;
using HomecareApp.Models;

namespace HomecareApp.DAL
{
    public class HomecareDbContext : DbContext
    {
        public HomecareDbContext(DbContextOptions<HomecareDbContext> options) : base(options)
        {
        }
        
        public DbSet<Appointment> Appointments { get; set; }
        public DbSet<AvailableDay> AvailableDays { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseLazyLoadingProxies();
        }
    }
}