using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Homecare.Controllers;
using Homecare.DAL;
using Homecare.Models;

namespace Homecare.Tests.Controllers;

public class AvailableDayControllerTests
{
    [Fact]
    public async Task TestPostAvailableDayNotOk()
    {
        // Arrange
        var testAvailableDay = new AvailableDay
        {
            Date = new DateTime(2024, 1, 15),
            StartTime = new TimeSpan(8, 0, 0),
            EndTime = new TimeSpan(16, 0, 0),
            HealthcareWorker = "Test Worker",
            Notes = "Test notes",
            ServiceType = "Test Service"
        };

        var mockAvailableDayRepository = new Mock<IAvailableDayRepository>();
        mockAvailableDayRepository.Setup(repo => repo.CreateAvailableDay(It.IsAny<AvailableDay>())).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<AvailableDayController>>();
        var availableDayController = new AvailableDayController(mockAvailableDayRepository.Object, mockLogger.Object);

        // Act
        var result = await availableDayController.PostAvailableDay(testAvailableDay);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestResult>(result.Result);
    }

    [Fact]
    public async Task TestGetAvailableDayNotFound()
    {
        // Arrange
        var mockAvailableDayRepository = new Mock<IAvailableDayRepository>();
        mockAvailableDayRepository.Setup(repo => repo.GetAvailableDayById(It.IsAny<int>())).ReturnsAsync((AvailableDay?)null);

        var mockLogger = new Mock<ILogger<AvailableDayController>>();
        var availableDayController = new AvailableDayController(mockAvailableDayRepository.Object, mockLogger.Object);

        // Act
        var result = await availableDayController.GetAvailableDay(999); // Non-existing ID

        // Assert
        var notFoundResult = Assert.IsType<NotFoundResult>(result.Result);
    }

    [Fact]
    public async Task TestPutAvailableDayNotOk()
    {
        // Arrange
        var existingAvailableDay = new AvailableDay
        {
            AvailableDayId = 1,
            Date = new DateTime(2024, 1, 15),
            StartTime = new TimeSpan(8, 0, 0),
            EndTime = new TimeSpan(16, 0, 0),
            HealthcareWorker = "Original Worker",
            Notes = "Original notes",
            ServiceType = "Original Service"
        };

        var updatedAvailableDay = new AvailableDay
        {
            AvailableDayId = 1,
            Date = new DateTime(2024, 1, 16),
            StartTime = new TimeSpan(9, 0, 0),
            EndTime = new TimeSpan(17, 0, 0),
            HealthcareWorker = "Updated Worker",
            Notes = "Updated notes",
            ServiceType = "Updated Service"
        };

        var mockAvailableDayRepository = new Mock<IAvailableDayRepository>();
        mockAvailableDayRepository.Setup(repo => repo.GetAvailableDayById(1)).ReturnsAsync(existingAvailableDay);
        mockAvailableDayRepository.Setup(repo => repo.UpdateAvailableDay(It.IsAny<AvailableDay>())).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<AvailableDayController>>();
        var availableDayController = new AvailableDayController(mockAvailableDayRepository.Object, mockLogger.Object);

        // Act
        var result = await availableDayController.PutAvailableDay(1, updatedAvailableDay);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundResult>(result);
    }

    [Fact]
    public async Task TestDeleteAvailableDayNotOk()
    {
        // Arrange
        var mockAvailableDayRepository = new Mock<IAvailableDayRepository>();
        mockAvailableDayRepository.Setup(repo => repo.DeleteAvailableDay(It.IsAny<int>())).ReturnsAsync(false);

        var mockLogger = new Mock<ILogger<AvailableDayController>>();
        var availableDayController = new AvailableDayController(mockAvailableDayRepository.Object, mockLogger.Object);

        // Act
        var result = await availableDayController.DeleteAvailableDay(1);

        // Assert
        var notFoundResult = Assert.IsType<NotFoundResult>(result);
    }

    
}