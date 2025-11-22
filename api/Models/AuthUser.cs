using Microsoft.AspNetCore.Identity;

namespace Homecare.Models
{
    public class AuthUser : IdentityUser
    {
        // Du kan legge til egendefinerte egenskaper her om nødvendig
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}