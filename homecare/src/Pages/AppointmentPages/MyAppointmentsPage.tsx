import React, { useState, useEffect } from 'react';
import { Button, Alert, Spinner, Badge, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { getAuthHeaders } from '../../types/api';

const API_URL = 'http://localhost:5169';

interface Appointment {
  appointmentId: number;
  availableDayId: number;
  patientName: string;
  taskType: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  caregiverName: string;
  status: string;
}

const MyAppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

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

  const fetchAppointments = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/Appointment/appointmentlist`, {
        headers: getAuthHeaders()  
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Appointment[] = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Could not fetch appointments: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

 const handleCancelAppointment = async (appointmentId: number) => {
  if (!window.confirm('Are you sure you want to cancel your appointment?')) return;

  try {
    const response = await fetch(`${API_URL}/api/Appointment/cancel/${appointmentId}`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error(`Cancellation failed: ${response.status}`);

    const updatedAppointment: Appointment = await response.json();

    setAppointments(prev =>
      prev.map(a => a.appointmentId === appointmentId ? updatedAppointment : a)
    );

    setSuccess('Appointment cancelled successfully!');
  } catch (error) {
    console.error('Cancel error:', error);
    setError('Cancellation failed: ' + (error as Error).message);
  }
};


  const handleEditAppointment = (appointment: Appointment): void => {
    navigate('/book', { 
      state: { 
        editingAppointment: appointment,
        isEditing: true 
      } 
    });
  };

  const handleCompleteAppointment = async (appointmentId: number) => {
  if (!window.confirm('Mark this appointment as completed?')) return;

  try {
    const response = await fetch(`${API_URL}/api/Appointment/complete/${appointmentId}`, {
      method: 'PUT',
      headers: getAuthHeaders()
    });

    if (!response.ok) throw new Error(`Mark complete failed: ${response.status}`);

    const updatedAppointment: Appointment = await response.json();

    setAppointments(prev =>
      prev.map(a => a.appointmentId === appointmentId ? updatedAppointment : a)
    );

    setSuccess('Appointment marked as completed!');
  } catch (error) {
    console.error('Complete error:', error);
    setError('Failed to mark appointment as completed: ' + (error as Error).message);
  }
};


  const getStatusVariant = (status: string): string => {
    switch (status) {
      case 'Scheduled': return 'primary';
      case 'Completed': return 'success';
      case 'Cancelled': return 'danger';
      default: return 'secondary';
    }
  };

  const getServiceIcon = (taskType: string) => {
    const service = services.find(s => s.id === taskType);
    return service ? service.icon : '📋';
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading your appointments...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header i samme stil som BookAppointment */}
      <div className="text-center mb-5">
        <h1 className="display-5 text-primary fw-bold mb-3">My Appointments</h1>
        <h3 className="mb-3 text-secondary">
          View and manage all your scheduled appointments
        </h3>
        <p className="lead" style={{ color: '#6c757d' }}>
          Edit, cancel, or check the status of your appointments
        </p>
      </div>

      {/* Statistics Cards i samme stil */}
      <Row className="mb-5">
        <Col md={3}>
          <Card className="text-center h-100 border-light">
            <Card.Body className="p-3 d-flex flex-column justify-content-center align-items-center">
              <div className="mb-2" style={{ fontSize: '2.5rem', color: '#0d6efd' }}>
                {appointments.filter(a => a.status === 'Scheduled').length}
              </div>
              <Card.Text className="mb-0 fw-medium text-primary">
                Scheduled
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 border-light">
            <Card.Body className="p-3 d-flex flex-column justify-content-center align-items-center">
              <div className="mb-2" style={{ fontSize: '2.5rem', color: '#198754' }}>
                {appointments.filter(a => a.status === 'Completed').length}
              </div>
              <Card.Text className="mb-0 fw-medium text-success">
                Completed
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 border-light">
            <Card.Body className="p-3 d-flex flex-column justify-content-center align-items-center">
              <div className="mb-2" style={{ fontSize: '2.5rem', color: '#dc3545' }}>
                {appointments.filter(a => a.status === 'Cancelled').length}
              </div>
              <Card.Text className="mb-0 fw-medium text-danger">
                Cancelled
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100 border-light">
            <Card.Body className="p-3 d-flex flex-column justify-content-center align-items-center">
              <div className="mb-2" style={{ fontSize: '2.5rem', color: '#6c757d' }}>
                {appointments.length}
              </div>
              <Card.Text className="mb-0 fw-medium text-secondary">
                Total
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Alerts i samme stil */}
      {error && (
        <Alert variant="danger" className="mb-4" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" className="mb-4" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      {/* Appointments List - kort i samme stil som BookAppointment */}
      {appointments.length === 0 ? (
        <Card className="text-center border-primary" style={{ borderWidth: '2px' }}>
          <Card.Body className="py-5">
            <div className="display-1 text-primary mb-4" style={{ fontSize: '4rem' }}>
              📅
            </div>
            <h3 className="text-primary mb-3">No appointments found</h3>
            <p className="text-muted mb-4">
              You haven't booked any appointments yet. Book your first appointment to get started.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/book")}
              className="px-5"
            >
              Book Your First Appointment
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {appointments.map((appointment) => (
            <Col key={appointment.appointmentId}>
              <Card 
                className={`h-100 ${appointment.status === 'Scheduled' ? 'border-primary border-2' : 'border-light'}`}
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  backgroundColor: appointment.status === 'Scheduled' ? 'rgba(13, 110, 253, 0.05)' : 'white'
                }}
              >
                <Card.Body>
                  <div className="mb-3">
                    <div className="d-flex justify-content-between align-items-start">
                      <div>
                        <Card.Title className="mb-1 text-primary">{appointment.patientName}</Card.Title>
                        <small className="text-muted">Appointment #{appointment.appointmentId}</small>
                      </div>
                      <div style={{ fontSize: '2.5rem' }}>
                        {getServiceIcon(appointment.taskType)}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-2">
                    <strong>Service:</strong> {appointment.taskType}
                  </div>
                  
                  <div className="mb-2">
                    <strong>Date:</strong> {new Date(appointment.appointmentDate).toLocaleDateString('no-NO', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </div>
                  
                  <div className="mb-2">
                    <strong>Time:</strong> {appointment.startTime} - {appointment.endTime}
                  </div>
                  
                  <div className="mb-3">
                    <strong>Caregiver:</strong> {appointment.caregiverName}
                  </div>
                  
                  <div className="mb-3">
                    <Badge 
                      bg={getStatusVariant(appointment.status)} 
                      className="p-2 fs-6 d-flex align-items-center justify-content-center"
                    >
                      {appointment.status}
                    </Badge>
                  </div>
                  
                  {appointment.status === 'Scheduled' && (
  <div className="d-flex gap-2">
    <Button
      variant="outline-primary"
      onClick={() => handleEditAppointment(appointment)}
      className="flex-grow-1"
    >
      Edit
    </Button>
    <Button
      variant="outline-success"
      onClick={() => handleCompleteAppointment(appointment.appointmentId)}
      className="flex-grow-1"
    >
      Complete
    </Button>
    <Button
      variant="outline-danger"
      onClick={() => handleCancelAppointment(appointment.appointmentId)}
      className="flex-grow-1"
    >
      Cancel
    </Button>
  </div>

                  )}
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* CTA Button i samme stil */}
      {appointments.length > 0 && (
        <div className="text-center mt-5">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/book")}
            className="px-5"
          >
            Book New Appointment
          </Button>
        </div>
      )}

      <style>{`
        .card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
        .card {
          transition: all 0.3s ease;
        }
        .btn-outline-primary:hover {
          background: #0d6efd;
          color: white;
          transform: translateY(-2px);
        }
        .btn-outline-danger:hover {
          background: #dc3545;
          color: white;
          transform: translateY(-2px);
        }
        .btn {
          transition: all 0.3s ease;
        }
      `}</style>
    </Container>
  );
};

export default MyAppointmentsPage;