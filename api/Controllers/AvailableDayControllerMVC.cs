using Microsoft.AspNetCore.Mvc;
using HomecareApp.Models;
using HomecareApp.ViewModels;
using HomecareApp.DAL;

namespace HomecareApp.Controllers;
    public class AvailableDayController : Controller
    {
    private readonly IHomecareRepository _repository;
        private readonly ILogger<AvailableDayController> _logger;

        public AvailableDayController(IHomecareRepository homecareRepository, ILogger<AvailableDayController> logger)
        {
        _repository = homecareRepository;
        _logger = logger;
        }

        public async Task<IActionResult> Table()
        {
        var availableDays = await _repository.GetAllAvailableDays();
            if (availableDays == null)
            {
                _logger.LogError("[AvailableDayController][Table] No available days found.");
                return NotFound("No available days found.");
            }
            var viewModel = new AvailableDayListViewModel(availableDays, "Table");
            return View(viewModel);
        }

        public async Task<IActionResult> Details(int id)
        {
            var availableDay = await _repository.GetAvailableDayById(id);
        if (availableDay == null)
        {
            _logger.LogError("[AvailableDayController][Details] Available day with ID {Id} not found.", id);
            return NotFound("Available day with ID {id} not found.");
        }
            return View(availableDay);
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> Create(AvailableDay availableDay)
        {
        if (ModelState.IsValid)
        {
            bool returnOK = await _repository.CreateAvailableDay(availableDay);
            if (returnOK)
                return RedirectToAction(nameof(Table));
        }
            _logger.LogWarning("[AvailableDayController][Create] Failed to create available day.");
            return View(availableDay);
        }

        [HttpGet]
        public async Task<IActionResult> Update(int id)
        {
            var availableDay = await _repository.GetAvailableDayById(id);
            if (availableDay == null)
            {
                _logger.LogError("[AvailableDayController][Update] Available day with ID {Id} not found.", id);
                return BadRequest("Available day with ID {id} not found.");
            }
            return View(availableDay);
        }

        [HttpPost]
        public async Task<IActionResult> Update(AvailableDay availableDay)
        {
        if (ModelState.IsValid)
        {
            bool returnOK = await _repository.UpdateAvailableDay(availableDay);
            if (returnOK)
                return RedirectToAction(nameof(Table));
        }
            _logger.LogWarning("[AvailableDayController][Update] Failed to update available day with ID {Id}.", availableDay);
            return View(availableDay);
        }
        

    [HttpGet]
    public async Task<IActionResult> Delete(int id)
    {
        var availableDay = await _repository.GetAvailableDayById(id);
        if (availableDay == null)
        {
            _logger.LogError("[AvailableDayController][Delete] Available day with ID {Id} not found.", id);
            return BadRequest("Available day with ID {id} not found.");
        }
        return View(availableDay);
    }

    [HttpPost]
    public async Task<IActionResult> DeleteConfirmed(int id)
    {
        bool returnOK = await _repository.DeleteAvailableDay(id);
        if (!returnOK)
        {
            _logger.LogWarning("[AvailableDayController][DeleteConfirmed] Failed to delete available day with ID {Id}.", id);
            return BadRequest("Failed to delete available day with ID {id}.");
    }
        return RedirectToAction(nameof(Table));
    }
}