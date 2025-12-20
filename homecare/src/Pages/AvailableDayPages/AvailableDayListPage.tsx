import React, { useState, useEffect } from "react";
import { Button, Alert, Spinner, Card, Row, Col, Container,  } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import type { AvailableDay } from "../../types/availableDay";
import { getAuthHeaders } from "../../types/api";

const API_URL = "http://localhost:5169";

const AvailableDayListPage: React.FC = () => {
  const [availableDays, setAvailableDays] = useState<AvailableDay[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchAvailableDays = async (): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/api/AvailableDay/availabledays`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }

      const data: AvailableDay[] = await response.json();
      setAvailableDays(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("Could not fetch available days: " + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAvailableDay = async (availableDayId: number): Promise<void> => {
    if (!window.confirm("Are you sure you want to delete this available day?")) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/api/AvailableDay/delete/${availableDayId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Cancellation failed: ${response.status}`);
      }

      setSuccess("Available day has been deleted successfully");
      fetchAvailableDays();
    } catch (error) {
      console.error("Delete error:", error);
      setError("Deletion failed: " + (error as Error).message);
    }
  };

  const handleEditAvailableDay = (availableDayId: number): void => {
    navigate(`/available-days/edit/${availableDayId}`);
  };

  useEffect(() => {
    fetchAvailableDays();
  }, []);

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading available days...</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header i samme stil som BookAppointment */}
      <div className="text-center mb-5">
        <h1 className="display-5 text-primary fw-bold mb-3">Available Days</h1>
        <h3 className="mb-3 text-secondary">
          Manage caregiver availability and schedules
        </h3>
        <p className="lead" style={{ color: '#6c757d' }}>
          View, edit, or delete available time slots
        </p>
      </div>

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

      {/* CTA Button i samme stil */}
      <div className="text-center mb-5">
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate("/createAvailableDay")}
          className="px-5"
        >
          Add New Available Day
        </Button>
      </div>

      {/* Available Days List - kort i samme stil som BookAppointment */}
      {availableDays.length === 0 ? (
        <Card className="text-center border-primary" style={{ borderWidth: '2px' }}>
          <Card.Body className="py-5">
            <div className="display-1 text-primary mb-4" style={{ fontSize: '4rem' }}>
              📅
            </div>
            <h3 className="text-primary mb-3">No available days found</h3>
            <p className="text-muted mb-4">
              No availability has been scheduled yet. Add your first available day to get started.
            </p>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate("/createAvailableDay")}
              className="px-5"
            >
              Add First Available Day
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {availableDays.map((day) => (
            <Col key={day.availableDayId}>
              <Card 
                className="h-100 border-light"
                style={{
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
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
                  
                  <div className="mt-3 d-flex gap-2">
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => handleEditAvailableDay(day.availableDayId)}
                      className="flex-grow-1"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDeleteAvailableDay(day.availableDayId)}
                      className="flex-grow-1"
                    >
                      Delete
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
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

export default AvailableDayListPage;