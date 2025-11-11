import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner, Badge, Card } from 'react-bootstrap';

const API_URL = 'http://localhost:5169';

interface Appointment {
  appointmentId: number;
  availableDayId: number;
  patientName: string;
  taskType: string;
  description: string;
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

  const fetchAppointments = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/Appointment/appointmentlist`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: Appointment[] = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Kunne ikke hente avtaler: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: number): Promise<void> => {
    if (!window.confirm('Er du sikker på at du vil avbryte denne avtalen?')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/Appointment/delete/${appointmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Avbestilling feilet: ${response.status}`);
      }

      setSuccess('Avtalen ble avbrutt');
      fetchAppointments();
    } catch (error) {
      console.error('Cancel error:', error);
      setError('Avbestilling feilet: ' + (error as Error).message);
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

  useEffect(() => {
    fetchAppointments();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Laster...</span>
        </Spinner>
        <p>Laster dine avtaler...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Mine Avtaler</h2>
        <Button onClick={fetchAppointments} variant="outline-primary">
          Oppdater
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      {appointments.length === 0 ? (
        <Card>
          <Card.Body className="text-center">
            <Card.Text>Ingen avtaler funnet.</Card.Text>
            <Button variant="primary">
              Book din første time
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Pasient</th>
              <th>Oppgavetype</th>
              <th>Beskrivelse</th>
              <th>Dato</th>
              <th>Tid</th>
              <th>Omsorgsperson</th>
              <th>Status</th>
              <th>Handling</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appointment => (
              <tr key={appointment.appointmentId}>
                <td>{appointment.appointmentId}</td>
                <td>{appointment.patientName}</td>
                <td>{appointment.taskType}</td>
                <td>{appointment.description || '-'}</td>
                <td>{new Date(appointment.appointmentDate).toLocaleDateString('no-NO')}</td>
                <td>{appointment.startTime} - {appointment.endTime}</td>
                <td>{appointment.caregiverName}</td>
                <td>
                  <Badge bg={getStatusVariant(appointment.status)}>
                    {appointment.status}
                  </Badge>
                </td>
                <td>
                  {appointment.status === 'Scheduled' && (
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleCancelAppointment(appointment.appointmentId)}
                    >
                      Avbryt
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}; export default MyAppointmentsPage;