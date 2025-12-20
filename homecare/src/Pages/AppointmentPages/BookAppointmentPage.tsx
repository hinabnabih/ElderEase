  import React, { useState, useEffect } from 'react';
  import { Card, Button, Form, Alert, Spinner, Row, Col, Container, Badge } from 'react-bootstrap';
  import { useLocation, useNavigate } from 'react-router-dom';
  import { getAuthHeaders } from '../../types/api';

  // Base API URL for backend requests
  const API_URL = 'http://localhost:5169';


  // Type definitions for AvailableDay and Appointment
  interface AvailableDay {
    availableDayId: number;
    date: string;
    startTime: string;
    endTime: string;
    healthcareWorker: string;
    notes?: string;
    serviceType: string;
  }

  interface Appointment {
    appointmentId: number;
    availableDayId: number;
    patientName: string;
    taskType: string;
    //description: string;
    appointmentDate: string;
    startTime: string;
    endTime: string;
    caregiverName: string;
    status: string;
  }

  // List of services with display names and icons for UI
  const services = [
    { id: 'Assistance', name: 'Assistance', icon: '👤' },
    { id: 'Medication', name: 'Medication Reminder', icon: '💊' },
    { id: 'Shopping', name: 'Grocery Shopping', icon: '🛒' },
    { id: 'Chores', name: 'Housework', icon: '🏠' },
    { id: 'Cooking', name: 'Cooking', icon: '🍳' },
    { id: 'Companionship', name: 'Companionship', icon: '👥' },
    { id: 'Transport', name: 'Driving / Transport', icon: '🚗' },
    { id: 'PersonalCare', name: 'Personal Care', icon: '🚿' }
  ];

  // Define steps for multi-step booking process
  type BookingStep = 'select-service' | 'select-datetime' | 'enter-name';

  const BookAppointmentPage: React.FC = () => {
    const location = useLocation(); // Used to detect if editing an existing appointment
    const navigate = useNavigate(); // For programmatic navigation


    // State variables
    const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [booking, setBooking] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);


    // Booking form states
    const [currentStep, setCurrentStep] = useState<BookingStep>('select-service');
    const [selectedService, setSelectedService] = useState<string>('');
    const [selectedDay, setSelectedDay] = useState<AvailableDay | null>(null);
    const [patientName, setPatientName] = useState<string>('');
    
    // Editing mode states
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingAppointmentId, setEditingAppointmentId] = useState<number | null>(null);

  
    useEffect(() => {
      if (location.state && (location.state as any).editingAppointment) {
        const appointment = (location.state as any).editingAppointment as Appointment;
        setIsEditing(true);
        setEditingAppointmentId(appointment.appointmentId);
        setSelectedService(appointment.taskType);
        setPatientName(appointment.patientName);
        
        setCurrentStep('select-service');
      }
    }, [location.state]);

    const fetchAvailableDays = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/AvailableDay/availabledays`, {
        headers: getAuthHeaders() 
      });
      
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      const data: AvailableDay[] = await response.json();
      setAvailableDays(data);
      
      
      if (isEditing && location.state && (location.state as any).editingAppointment) {
        const appointment = (location.state as any).editingAppointment as Appointment;
        const originalDay = data.find(day => day.availableDayId === appointment.availableDayId);
        if (originalDay) {
          setSelectedDay(originalDay);
        }
      }
    } catch (error) {
      setError(`Could not fetch availabledays :( : ${(error as Error).message}`);
    } finally {
      setLoading(false);
    }
  };
    
    const handleUpdateAppointment = async (): Promise<void> => {
      if (!patientName.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!selectedService) {
        setError('Please select a service.');
        return;
      }
      if (!selectedDay) {
        setError('Please select an available time.');
        return;
      }
      if (!editingAppointmentId) {
        setError('No appointment ID for update');
        return;
      }

      setUpdating(true);
      setError(null);
      setSuccess(null);

      try {
        const startHour = parseInt(selectedDay.startTime.split(":")[0]);
        const endTime = `${startHour + 1}:00`;

        const appointmentData = {
          availableDayId: selectedDay.availableDayId,
          patientName: patientName,
          taskType: selectedService,
          //description: selectedService,
          appointmentDate: selectedDay.date,
          startTime: selectedDay.startTime,
          endTime: endTime,
          caregiverName: selectedDay.healthcareWorker,
          status: "Scheduled"
        };

        // Bruk riktig endpoint: /api/Appointment/update/{id}
        const response = await fetch(`${API_URL}/api/Appointment/update/${editingAppointmentId}`, {
          method: 'PUT',
          headers: getAuthHeaders(),
          body: JSON.stringify(appointmentData)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Update failed: ${response.status} - ${errorText}`);
        }

        await response.json();
        setSuccess("Appointment updated successfully!");
        
        setTimeout(() => {
          navigate('/myAppointments');
        }, 2000);

      } catch (error) {
        setError(`Update failed: ${(error as Error).message}`);
      } finally {
        setUpdating(false);
      }
    };

    // Eksisterende booking funksjon
    const handleBookAppointment = async (): Promise<void> => {
      if (!patientName.trim()) {
        setError('Please enter your name');
        return;
      }
      if (!selectedService) {
        setError('Please select a service.');
        return;
      }
      if (!selectedDay) {
        setError('Please select an available time.');
        return;
      }

      setBooking(true);
      setError(null);
      setSuccess(null);

      try {
        const startHour = parseInt(selectedDay.startTime.split(":")[0]);
        const endTime = `${startHour + 1}:00`;

        const appointmentData = {
          availableDayId: selectedDay.availableDayId,
          patientName: patientName,
          taskType: selectedService,
          //description: selectedService,
          appointmentDate: selectedDay.date,
          startTime: selectedDay.startTime,
          endTime: endTime,
          caregiverName: selectedDay.healthcareWorker,
          status: "Scheduled"
        };

        const response = await fetch(`${API_URL}/api/Appointment/create`, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify(appointmentData)
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Booking failed: ${response.status} - ${errorText}`);
        }

        await response.json();
        setSuccess("Appointment booked, you will find it under 'My Appointments'");
        
        setTimeout(() => {
          setCurrentStep('select-service');
          setSelectedService('');
          setSelectedDay(null);
          setPatientName('');
          setSuccess(null);
          fetchAvailableDays();
        }, 2000);

      } catch (error) {
        setError(`Booking failed: ${(error as Error).message}`);
      } finally {
        setBooking(false);
      }
    };

    useEffect(() => {
      fetchAvailableDays();
    }, []);

    const renderServiceSelection = () => (
      <div className="service-selection-step">
        <div className="text-center mb-5">
          <h1 className="display-5 text-primary fw-bold mb-3">ElderEase</h1>
          <h3 className="mb-3 text-secondary">
            {isEditing ? 'Edit your appointment' : 'What do you need help/ Assistance with?'}
          </h3>
          <p className="lead" style={{ color: '#6c757d' }}>
            {isEditing ? 'You can change the service type if needed' : 'Choose one service'}
          </p>
        </div>

        <Row xs={2} md={4} className="g-3 mb-4">
          {services.map((service) => (
            <Col key={service.id}>
              <Card
                className={`text-center h-100 ${selectedService === service.id ? 'border-primary border-2' : 'border-light'}`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: selectedService === service.id ? 'rgba(13, 110, 253, 0.05)' : 'white'
                }}
                onClick={() => setSelectedService(service.id)}
              >
                <Card.Body className="p-3 d-flex flex-column justify-content-center align-items-center">
                  <div className="mb-2" style={{ fontSize: '2rem' }}>
                    {service.icon}
                  </div>
                  <Card.Text className="mb-0 fw-medium">
                    {service.name}
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>

        {selectedService && (
          <Card className="mt-4 mb-4 border-primary" style={{ borderWidth: '2px' }}>
            <Card.Header className="bg-primary text-white">
              <strong>{isEditing ? 'Selected service for update:' : 'You have chosen:'}</strong>
            </Card.Header>
            <Card.Body>
              <div className="d-flex align-items-center">
                {(() => {
                  const selectedServiceObj = services.find(s => s.id === selectedService);
                  return (
                    <Badge bg="primary" className="p-3 fs-6 d-flex align-items-center">
                      <span className="me-2" style={{ fontSize: '1.5rem' }}>{selectedServiceObj?.icon}</span>
                      {selectedServiceObj?.name}
                    </Badge>
                  );
                })()}
              </div>
            </Card.Body>
          </Card>
        )}

        <div className="text-center">
          <Button
            size="lg"
            variant="primary"
            onClick={() => {
              if (selectedService) {
                setCurrentStep('select-datetime');
              } else {
                setError('Please select a service first');
              }
            }}
            disabled={!selectedService}
            className="px-5"
          >
            {isEditing ? 'Next: Select day and time →' : 'Select day and time →'}
          </Button>
          {isEditing && (
            <Button
              variant="outline-secondary"
              onClick={() => navigate('/myAppointments')}
              className="ms-3 px-5"
            >
              Cancel
            </Button>
          )}
        </div>
      </div>
    );

    const renderDateTimeSelection = () => (
      <div className="datetime-selection-step">
        <div className="text-center mb-4">
          <h2 className="text-primary fw-bold">
            {isEditing ? 'Change the day and time if needed' : 'Choose the day and time that suit you'}
          </h2>
          <p className="text-muted">You chose this service: </p>
          {selectedService && (
            <div className="mb-3">
              <Badge bg="primary" className="fs-6 p-2">
                {services.find(s => s.id === selectedService)?.name}
              </Badge>
            </div>
          )}
        </div>

        <h4 className="text-primary mb-3">Available days</h4>

        {loading ? (
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">Loading available days...</p>
          </div>
        ) : availableDays.length === 0 ? (
          <Alert variant="info" className="text-center">
            No available days at the moment 
          </Alert>
        ) : (
          <Row>
            {availableDays.map((day) => (
              <Col key={day.availableDayId} md={6} lg={4} className="mb-3">
                <Card className={`h-100 ${selectedDay?.availableDayId === day.availableDayId ? 'border-primary border-2' : 'border-light'}`}>
                  <Card.Body>
                    <div className="mb-3">
                      <Card.Title className="mb-1 text-primary">{day.healthcareWorker}</Card.Title>
                      <small className="text-muted">{day.serviceType}</small>
                    </div>
                    <div className="mb-2">
                      <strong>Date:</strong> {new Date(day.date).toLocaleDateString('no-NO', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </div>
                    <div className="mb-2">
                      <strong>Time:</strong> {day.startTime} - {day.endTime}
                    </div>
                    {day.notes && (
                      <div className="mt-2">
                        <small className="text-muted">{day.notes}</small>
                      </div>
                    )}
                  </Card.Body>
                  <Card.Footer className="bg-white">
                    <Button
                      variant={selectedDay?.availableDayId === day.availableDayId ? "primary" : "outline-primary"}
                      onClick={() => setSelectedDay(day)}
                      className="w-100"
                    >
                      {selectedDay?.availableDayId === day.availableDayId ? '✓ Selected' : 'Select this'}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        <div className="d-flex justify-content-between mt-4">
          <Button
            variant="outline-secondary"
            onClick={() => setCurrentStep('select-service')}
          >
            ← {isEditing ? 'Change Service' : 'Back to Services'}
          </Button>
        
          <Button
            variant="primary"
            onClick={() => {
              if (selectedDay) {
                setCurrentStep('enter-name');
              } else {
                setError('Please choose an available day first');
              }
            }}
            disabled={!selectedDay}
          >
            {isEditing ? 'Next: Update your name →' : 'Next →'}
          </Button>
        </div>
      </div>
    );
    
    const renderNameInput = () => (
      <div className="name-input-step">
        <div className="text-center mb-5">
          <h2 className="text-primary fw-bold">
            {isEditing ? 'Update your name if needed' : 'What is your name?'}
          </h2>
          <div className="bg-light p-3 rounded d-inline-block">
            <p className="mb-0 text-primary">
              {isEditing ? 'You can update your name ' : 'Type your name below'}
            </p>
          </div>
        </div>

        <Card className="mb-4 border-primary" style={{ borderWidth: '2px' }}>
          <Card.Header className="bg-primary text-white">
            <strong>{isEditing ? 'Appointment Update' : 'Your Booking'}</strong>
          </Card.Header>
          <Card.Body style={{ backgroundColor: 'rgba(13, 110, 253, 0.05)' }}>
            <div className="mb-4">
              <h5 className="fw-bold mb-3 text-primary">Booking Details:</h5>
              <div className="p-3 rounded">
                <div className="mb-2">
                  <strong>Service:</strong> {services.find(s => s.id === selectedService)?.name}
                </div>
                <div className="mb-2">
                  <strong>Date:</strong> {selectedDay && new Date(selectedDay.date).toLocaleDateString('en-EN')}
                </div>
                <div className="mb-2">
                  <strong>Time:</strong> {selectedDay?.startTime} - {selectedDay?.endTime}
                </div>
                <div>
                  <strong>Caregiver:</strong> {selectedDay?.healthcareWorker}
                </div>
              </div>
            </div>

            <Form.Group className="mb-4">
              <Form.Label className="fw-bold text-primary">
                {isEditing ? 'Update your name if needed' : 'Type your name'}
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                size="lg"
                className="border-primary"
                required
                pattern="[0-9a-zA-ZæøåÆØÅ. \-]{2,20}"
                isInvalid={patientName !== "" && !/^[a-zA-ZæøåÆØÅ. ]{5,20}$/.test(patientName)}
              />
              <Form.Control.Feedback type="invalid">
                Name must be 5–20 characters and can only include letters.
              </Form.Control.Feedback>
            </Form.Group>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-between">
          <div>
            {isEditing && (
              <Button
                variant="outline-danger"
                onClick={() => navigate('/myAppointments')}
                className="me-2"
              >
                Cancel Edit
              </Button>
            )}
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentStep('select-datetime')}
            >
              ← {isEditing ? 'Change day and time' : 'Back to date selection'}
            </Button>
          </div>
        
          <Button
            variant="primary"
            size="lg"
            onClick={isEditing ? handleUpdateAppointment : handleBookAppointment}
            disabled={updating || booking || !patientName.trim()}
          >
            {updating ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Updating...
              </>
            ) : booking ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Booking...
              </>
            ) : isEditing ? (
              '✓ Update Appointment'
            ) : (
              '✓ Confirm Booking'
            )}
          </Button>
        </div>
      </div>
    );

    return (
      <Container className="booking-page py-4">
        {error && <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>{error}</Alert>}
        {success && <Alert variant="success" className="mb-4" onClose={() => setSuccess(null)} dismissible>{success}</Alert>}

        {/* Trinn-indikator */}
        <div className="mb-5">
          <div className="d-flex justify-content-center align-items-center mb-3">
            <div className={`step-circle ${currentStep === 'select-service' ? 'active' : ''}`}>
              1
            </div>
            <div className={`step-line ${currentStep === 'select-datetime' || currentStep === 'enter-name' ? 'active' : ''}`}></div>
            <div className={`step-circle ${currentStep === 'select-datetime' ? 'active' : ''}`}>
              2
            </div>
            <div className={`step-line ${currentStep === 'enter-name' ? 'active' : ''}`}></div>
            <div className={`step-circle ${currentStep === 'enter-name' ? 'active' : ''}`}>
              3
            </div>
          </div>
          <div className="d-flex justify-content-between px-5">
            <span className={`step-label ${currentStep === 'select-service' ? 'active' : ''}`}>
              {isEditing ? 'Select Service' : 'Choose Service'}
            </span>
            <span className={`step-label ${currentStep === 'select-datetime' ? 'active' : ''}`}>
              {isEditing ? 'Select Time' : 'Choose Time'}
            </span>
            <span className={`step-label ${currentStep === 'enter-name' ? 'active' : ''}`}>
              {isEditing ? 'Confirm Update' : 'Confirm'}
            </span>
          </div>
        </div>

        {currentStep === 'select-service' && renderServiceSelection()}
        {currentStep === 'select-datetime' && renderDateTimeSelection()}
        {currentStep === 'enter-name' && renderNameInput()}

        <style>{`
          .step-circle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: #e9ecef;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            transition: all 0.3s ease;
          }
          .step-circle.active {
            background: #0d6efd;
            color: white;
          }
          .step-line {
            width: 100px;
            height: 2px;
            background: #e9ecef;
            transition: all 0.3s ease;
          }
          .step-line.active {
            background: #0d6efd;
          }
          .step-label {
            color: #6c757d;
            font-size: 0.9rem;
            transition: all 0.3s ease;
          }
          .step-label.active {
            color: #0d6efd;
            font-weight: bold;
          }
          .service-selection-step .card:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          }
        `}</style>
      </Container>
    );
  };

  export default BookAppointmentPage;