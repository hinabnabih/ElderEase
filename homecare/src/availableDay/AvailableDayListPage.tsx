import React, { useState, useEffect } from 'react';
import { Table, Button, Alert, Spinner } from 'react-bootstrap';

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

const AvailableDayListPage: React.FC = () => {
  const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAvailableDays = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/ApiAvailableDay`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: AvailableDay[] = await response.json();
      console.log('Fetched available days:', data);
      setAvailableDays(data);
    } catch (error) {
      console.error('Fetch error:', error);
      setError('Kunne ikke hente tilgjengelige dager: ' + (error as Error).message);
    } finally {
      setLoading(false);
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
        <p>Laster tilgjengelige dager...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Tilgjengelige Dager</h2>
        <Button onClick={fetchAvailableDays} disabled={loading} variant="primary">
          {loading ? 'Laster...' : 'Oppdater'}
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      {availableDays.length === 0 && !loading ? (
        <Alert variant="info">Ingen tilgjengelige dager funnet</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Dato</th>
              <th>Omsorgsperson</th>
              <th>Start Tid</th>
              <th>Slutt Tid</th>
              <th>Service Type</th>
              <th>Notater</th>
            </tr>
          </thead>
          <tbody>
            {availableDays.map(day => (
              <tr key={day.availableDayId}>
                <td>{day.availableDayId}</td>
                <td>{new Date(day.date).toLocaleDateString('no-NO')}</td>
                <td>{day.healthcareWorker}</td>
                <td>{day.startTime}</td>
                <td>{day.endTime}</td>
                <td>{day.serviceType}</td>
                <td>{day.notes || '-'}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}; export default AvailableDayListPage;