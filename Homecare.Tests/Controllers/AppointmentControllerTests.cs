using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Moq;
using Homecare.Controllers;
using Homecare.DAL;
using Homecare.Models;
using Homecare.DTOs;

namespace Homecare.Tests.Controllers;

public class AppointmentControllerTests
{
    [Fact]
    //READ-function
    public async Task TestAppointmentList()
    {
        // Arrange
        var appointmentList = new List<Appointment>()
        {
            new Appointment
            {
                AppointmentId = 1,
                AvailableDayId = 1,
                PatientName = "Ola Nordmann",
                TaskType = "Medical care",
                //Description = "Regular checkup",
                AppointmentDate = new DateTime(2024, 1, 15),
                StartTime = new TimeSpan(10, 0, 0),
                EndTime = new TimeSpan(11, 0, 0),
                CaregiverName = "Kari Olsen",
                Status = "Scheduled"
            },
            new Appointment
            {
                AppointmentId = 2,
                AvailableDayId = 2,
                PatientName = "Kari Hansen",
                TaskType = "Personal care",
                //Description = "Assistance with daily activities",
                AppointmentDate = new DateTime(2024, 1, 16),
                StartTime = new TimeSpan(14, 0, 0),
                EndTime = new TimeSpan(15, 0, 0),
                CaregiverName = "Per Jensen",
                Status = "Completed"
            }
        };

        var mockAppointmentRepository = new Mock<IAppointmentRepository>();
        mockAppointmentRepository.Setup(repo => repo.GetAllAppointments()).ReturnsAsync(appointmentList);

        var mockLogger = new Mock<ILogger<AppointmentController>>();
        var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

        // Act
        var result = await appointmentController.AppointmentList();

        // Assert
        var okResult = Assert.IsType<OkObjectResult>(result);
        var appointmentDtos = Assert.IsAssignableFrom<IEnumerable<AppointmentDto>>(okResult.Value);
        Assert.Equal(2, appointmentDtos.Count());

        // Verify first appointment properties
        var firstAppointment = appointmentDtos.First();
        Assert.Equal("Ola Nordmann", firstAppointment.PatientName);
        Assert.Equal("Medical care", firstAppointment.TaskType);
    }

    [Fact]
    //CREATE-function
    public async Task TestCreateOk()
    {
        // Arrange - positiv test
        var testAppointmentDto = new AppointmentDto
        {
            AvailableDayId = 1,
            PatientName = "Test Patient",
            TaskType = "Test Task",
            //Description = "Test Description",
            AppointmentDate = new DateTime(2024, 1, 15),
            StartTime = new TimeSpan(10, 0, 0),
            EndTime = new TimeSpan(11, 0, 0),
            CaregiverName = "Test Caregiver",
            Status = "Scheduled"
        };

        var mockAppointmentRepository = new Mock<IAppointmentRepository>();
        mockAppointmentRepository.Setup(repo => repo.CreateAppointment(It.IsAny<Appointment>())).ReturnsAsync(true);

        var mockLogger = new Mock<ILogger<AppointmentController>>();
        var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

        // Act
        var result = await appointmentController.Create(testAppointmentDto);

        // Assert
        var createdResult = Assert.IsType<CreatedAtActionResult>(result);
        Assert.Equal(nameof(appointmentController.AppointmentList), createdResult.ActionName);
    }

    [Fact]
    public async Task TestUpdateOk()
    {
    // Arrange
    var existingAppointment = new Appointment
    {
        AppointmentId = 1,
        AvailableDayId = 1,
        PatientName = "Original Patient",
        TaskType = "Original Task",
        //Description = "Original Description",
        AppointmentDate = new DateTime(2024, 1, 15),
        StartTime = new TimeSpan(10, 0, 0),
        EndTime = new TimeSpan(11, 0, 0),
        CaregiverName = "Original Caregiver",
        Status = "Scheduled"
    };

    var updatedAppointmentDto = new AppointmentDto
    {
        AvailableDayId = 1,
        PatientName = "Updated Patient",
        TaskType = "Updated Task",
        //Description = "Updated Description",
        AppointmentDate = new DateTime(2024, 1, 15),
        StartTime = new TimeSpan(10, 0, 0),
        EndTime = new TimeSpan(11, 0, 0),
        CaregiverName = "Updated Caregiver",
        Status = "Updated"
    };

    var mockAppointmentRepository = new Mock<IAppointmentRepository>();
    mockAppointmentRepository.Setup(repo => repo.GetAppointmentById(1)).ReturnsAsync(existingAppointment);
    mockAppointmentRepository.Setup(repo => repo.UpdateAppointment(It.IsAny<Appointment>())).ReturnsAsync(true);
    
    var mockLogger = new Mock<ILogger<AppointmentController>>();
    var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

    // Act
    var result = await appointmentController.Update(1, updatedAppointmentDto);

    // Assert
    var okResult = Assert.IsType<OkObjectResult>(result);
    var returnedAppointment = Assert.IsType<Appointment>(okResult.Value);
    Assert.Equal("Updated Patient", returnedAppointment.PatientName);
    Assert.Equal("Updated Task", returnedAppointment.TaskType);
}

    [Fact]
    public async Task TestDeleteOk()
    {
    // Arrange
    var mockAppointmentRepository = new Mock<IAppointmentRepository>();
    mockAppointmentRepository.Setup(repo => repo.DeleteAppointment(It.IsAny<int>())).ReturnsAsync(true);
    
    var mockLogger = new Mock<ILogger<AppointmentController>>();
    var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

    // Act
    var result = await appointmentController.DeleteConfirmed(1);

    // Assert
    Assert.IsType<NoContentResult>(result);
}

    /*[Fact]
    public async Task TestCreateNotOk()
    {
        // Arrange
        var testAppointmentDto = new AppointmentDto
        {
            AvailableDayId = 1,
            PatientName = "Test Patient",
            TaskType = "Test Task",
            Description = "Test Description",
            AppointmentDate = new DateTime(2024, 1, 15),
            StartTime = new TimeSpan(10, 0, 0),
            EndTime = new TimeSpan(11, 0, 0),
            CaregiverName = "Test Caregiver",
            Status = "Scheduled"
        };

        var mockAppointmentRepository = new Mock<IAppointmentRepository>();
        mockAppointmentRepository.Setup(repo => repo.CreateAppointment(It.IsAny<Appointment>())).ReturnsAsync(false);
        
        var mockLogger = new Mock<ILogger<AppointmentController>>();
        var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

        // Act
        var result = await appointmentController.Create(testAppointmentDto);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Equal("Internal server error", statusCodeResult.Value);
    }

    [Fact]
    public async Task TestGetAppointmentNotFound()
    {
        // Arrange
        var mockAppointmentRepository = new Mock<IAppointmentRepository>();
        mockAppointmentRepository.Setup(repo => repo.GetAppointmentById(It.IsAny<int>())).ReturnsAsync((Appointment)null);
        
        var mockLogger = new Mock<ILogger<AppointmentController>>();
        var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

        // Act
        var result = await appointmentController.GetAppointment(999); // Non-existing ID

        // Assert
        var notFoundResult = Assert.IsType<NotFoundObjectResult>(result);
        Assert.Equal("Appointment not found for the AppointmentId", notFoundResult.Value);
    }

    [Fact]
    public async Task TestUpdateNotOk()
    {
        // Arrange
        var existingAppointment = new Appointment
        {
            AppointmentId = 1,
            AvailableDayId = 1,
            PatientName = "Original Patient",
            TaskType = "Original Task",
            Description = "Original Description",
            AppointmentDate = new DateTime(2024, 1, 15),
            StartTime = new TimeSpan(10, 0, 0),
            EndTime = new TimeSpan(11, 0, 0),
            CaregiverName = "Original Caregiver",
            Status = "Scheduled"
        };

        var updatedAppointmentDto = new AppointmentDto
        {
            AvailableDayId = 1,
            PatientName = "Updated Patient",
            TaskType = "Updated Task",
            Description = "Updated Description",
            AppointmentDate = new DateTime(2024, 1, 15),
            StartTime = new TimeSpan(10, 0, 0),
            EndTime = new TimeSpan(11, 0, 0),
            CaregiverName = "Updated Caregiver",
            Status = "Updated"
        };

        var mockAppointmentRepository = new Mock<IAppointmentRepository>();
        mockAppointmentRepository.Setup(repo => repo.GetAppointmentById(1)).ReturnsAsync(existingAppointment);
        mockAppointmentRepository.Setup(repo => repo.UpdateAppointment(It.IsAny<Appointment>())).ReturnsAsync(false);
        
        var mockLogger = new Mock<ILogger<AppointmentController>>();
        var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

        // Act
        var result = await appointmentController.Update(1, updatedAppointmentDto);

        // Assert
        var statusCodeResult = Assert.IsType<ObjectResult>(result);
        Assert.Equal(500, statusCodeResult.StatusCode);
        Assert.Equal("Internal server error", statusCodeResult.Value);
    }

    [Fact]
    public async Task TestDeleteNotOk()
    {
        // Arrange
        var mockAppointmentRepository = new Mock<IAppointmentRepository>();
        mockAppointmentRepository.Setup(repo => repo.DeleteAppointment(It.IsAny<int>())).ReturnsAsync(false);
        
        var mockLogger = new Mock<ILogger<AppointmentController>>();
        var appointmentController = new AppointmentController(mockAppointmentRepository.Object, mockLogger.Object);

        // Act
        var result = await appointmentController.DeleteConfirmed(1);

        // Assert
        var badRequestResult = Assert.IsType<BadRequestObjectResult>(result);
        Assert.Equal("Appointment deletion failed", badRequestResult.Value);
    }*/
}