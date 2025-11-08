using Microsoft.AspNetCore.Mvc;

namespace HomecareApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}