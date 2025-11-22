import React, { useState, useEffect } from 'react';
import { Card, Button, Form, Alert, Spinner, Row, Col } from 'react-bootstrap';

const API_URL = 'http://localhost:5169';

interface AvailableDay {
  availableDayId: number;
  date: string;
  startTime: string;
  endTime: string;
  healthcareWorker: string;
  notes?: string;
  serviceType: string;
}

interface BookingForm {
  patientName: string;
  taskType: string;
  description: string;
  selectedDate: string;
  selectedTime: string;
}

const BookAppointmentPage: React.FC = () => {
  const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [booking, setBooking] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<BookingForm>({
    patientName: '',
    taskType: 'Velg',
    description: '',
    selectedDate: '',
    selectedTime: ''
  });

  const getNextDays = (numberOfDays: number): { date: string; weekDay: string; day: number; month: string }[] => {
    const days = [];
    const today = new Date();
    
    for (let i = 0; i < numberOfDays; i++) {
      const date = new Date();
      date.setDate(today.getDate() + i);
      
      const weekDay = date.toLocaleDateString('nb-NO', { weekday: 'short' });
      const day = date.getDate();
      const month = date.toLocaleDateString('nb-NO', { month: 'short' });
      
      days.push({
        date: date.toISOString().split('T')[0], // YYYY-MM-DD format
        weekDay: weekDay.charAt(0).toUpperCase() + weekDay.slice(1), // Stor forbokstav
        day: day,
        month: month
      });
    }
    
    return days;
  };

  const fetchAvailableDays = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/AvailableDay`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: AvailableDay[] = await response.json();
      setAvailableDays(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Kunne ikke hente tilgjengelige dager: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleBookAppointment = async (availableDay: AvailableDay): Promise<void> => {
    if (!formData.patientName.trim()) {
      setError('Vennligst fyll ut pasientnavn');
      return;
    }

    setBooking(true);
    setError(null);
    setSuccess(null);

    try {
      const appointmentData = {
        availableDayId: availableDay.availableDayId,
        patientName: formData.patientName,
        taskType: formData.taskType,
        description: formData.description,
        appointmentDate: availableDay.date,
        startTime: availableDay.startTime,
        endTime: availableDay.endTime,
        caregiverName: availableDay.healthcareWorker,
        status: 'Scheduled'
      };

      const response = await fetch(`${API_URL}/api/Appointment/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Booking feilet: ${response.status} - ${errorText}`);
      }

      await response.json();
      
      
      
      fetchAvailableDays();
    } catch (error) {
      console.error('Booking error:', error);
      setError('Booking feilet: ' + (error as Error).message);
    } finally {
      setBooking(false);
    }
  };

  useEffect(() => {
    fetchAvailableDays();
  }, []);

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Laster...</span>
        </Spinner>
        <p>Laster tilgjengelige tider...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-4">
        <h2>Book Omsorgstime</h2>
        <p className="lead">Velg en tilgjengelig time og fyll ut informasjonen</p>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4">
        <Card.Header>
          <h5>Informasjon om avtalen</h5>
        </Card.Header>
        <Card.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Pasientnavn *</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Fyll inn pasientens navn"
                    value={formData.patientName}
                    onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Oppgavetype *</Form.Label>
                  <Form.Select
                    value={formData.taskType}
                    onChange={(e) => setFormData({...formData, taskType: e.target.value})}
                    required
                  >
                    <option value="Velg">Velg oppgavetype</option>
                    <option value="Personal-care">Personlig pleie</option>
                    <option value="Medication">Medisinering</option>
                    <option value="Health-check">Helse sjekk</option>
                    <option value="Shopping-help">Handlehjelp</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            {/* Seniorvennlig kalender */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Velg dato *</Form.Label>
        <div className="d-flex flex-wrap gap-3">
          {getNextDays(4).map((day) => (
            <div
              key={day.date}
              className={`p-3 border rounded text-center cursor-pointer ${
                formData.selectedDate === day.date 
                  ? 'bg-primary text-white' 
                  : 'bg-light'
              }`}
              style={{ 
                minWidth: '120px',
                fontSize: '1.1rem',
                transition: 'all 0.2s'
              }}
              onClick={() => setFormData({...formData, selectedDate: day.date})}
            >
              <div className="fw-bold">{day.weekDay}</div>
              <div>{day.date}</div>
              <small className="text-muted">{day.month}</small>
            </div>
          ))}
        </div>
      </Form.Group>

      {/* Enkel tidvelger */}
      <Form.Group className="mb-4">
        <Form.Label className="fw-bold">Velg klokkeslett *</Form.Label>
        <div className="d-flex flex-wrap gap-2">
          {[
            '08:00', '09:00', '10:00', '11:00', 
            '12:00', '13:00', '14:00', '15:00',
            '16:00', '17:00', '18:00'
          ].map((time) => (
            <button
              key={time}
              type="button"
              className={`btn ${
                formData.selectedTime === time 
                  ? 'btn-primary' 
                  : 'btn-outline-primary'
              }`}
              style={{ 
                fontSize: '1.1rem',
                padding: '10px 15px',
                minWidth: '80px'
              }}
              onClick={() => setFormData({...formData, selectedTime: time})}
            >
              {time}
            </button>
          ))}
        </div>
      </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Beskrivelse</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Beskriv oppgaven i detalj..."
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Card.Body>
      </Card>

      <div>
        <h4 className="mb-3">Tilgjengelige tider</h4>
        
        {availableDays.length === 0 ? (
          <Alert variant="info">
            Ingen tilgjengelige tider for øyeblikket.
          </Alert>
        ) : (
          <Row>
            {availableDays.map(day => (
              <Col key={day.availableDayId} md={6} lg={4} className="mb-3">
                <Card className="h-100">
                  <Card.Body>
                    <Card.Title>{day.healthcareWorker}</Card.Title>
                    <Card.Text>
                      <strong>Dato:</strong> {new Date(day.date).toLocaleDateString('no-NO')}<br/>
                      <strong>Tid:</strong> {day.startTime} - {day.endTime}<br/>
                      <strong>Service:</strong> {day.serviceType}<br/>
                      {day.notes && <><strong>Notater:</strong> {day.notes}</>}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button
                      variant="primary"
                      onClick={() => handleBookAppointment(day)}
                      disabled={booking || !formData.patientName.trim()}
                    >
                      {booking ? 'Booker...' : 'Book Time'}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        
      </div>
    </div>
  );

  
}; export default BookAppointmentPage;