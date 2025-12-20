import React, { useState } from "react";
import { Form, Button, Alert, Card, Row, Col, Spinner } from "react-bootstrap";

interface AvailableDayFormProps {
  initialData?: {
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    healthcareWorker: string;
    serviceType: string;
  };
  onSubmit: (data: {
    date: string;
    startTime: string;
    endTime: string;
    notes: string;
    healthcareWorker: string;
    serviceType: string;
  }) => Promise<void>;
  mode: "create" | "edit";
  isSubmitting: boolean;
  submitError?: string | null;
  submitSuccess?: string | null;
}

const AvailableDayForm: React.FC<AvailableDayFormProps> = ({
  initialData,
  onSubmit,
  mode,
  isSubmitting,
  submitError,
  submitSuccess,
}) => {
  const [date, setDate] = useState(initialData?.date || "");
  const [startTime, setStartTime] = useState(initialData?.startTime || "09:00");
  const [endTime, setEndTime] = useState(initialData?.endTime || "17:00");
  const [notes, setNotes] = useState(initialData?.notes || "");
  const [healthcareWorker, setHealthcareWorker] = useState(initialData?.healthcareWorker || "");
  const [serviceType, setServiceType] = useState(initialData?.serviceType || "General Care");

  const serviceTypes = [
    "General Care",
    "Personal Care",
    "Medication Management",
    "Companionship",
    "Housekeeping",
    "Transportation",
    "Meal Preparation",
    "Nursing Care"
  ];

  const getTodayDate = () => new Date().toISOString().split("T")[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit({
      date,
      startTime,
      endTime,
      notes,
      healthcareWorker,
      serviceType,
    });
  };

  return (
    <div>
      {submitError && (
        <Alert variant="danger" className="mb-4" onClose={() => {}} dismissible>
          {submitError}
        </Alert>
      )}
      
      {submitSuccess && (
        <Alert variant="success" className="mb-4" onClose={() => {}} dismissible>
          {submitSuccess}
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="mb-4 border-primary" style={{ borderWidth: '2px' }}>
            <Card.Header className="bg-primary text-white">
              <h5 className="mb-0 fw-bold">
                {mode === "create" ? "New Available Day Details" : "Edit Available Day Details"}
              </h5>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-primary">
                        Date *
                      </Form.Label>
                      <Form.Control
                        type="date"
                        value={date}
                        min={getTodayDate()}
                        required
                        onChange={(e) => setDate(e.target.value)}
                        className="border-primary"
                      />
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-primary">
                        Caregiver Name *
                      </Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter caregiver name"
                        value={healthcareWorker}
                        required
                        pattern="[0-9a-zA-ZæøåÆØÅ. \-]{2,20}"
                        onChange={(e) => setHealthcareWorker(e.target.value)}
                        isInvalid={
                          healthcareWorker !== "" &&
                          !/^[a-zA-ZæøåÆØÅ. ]{2,20}$/.test(healthcareWorker)
                        }
                        className="border-primary"
                      />
                      <Form.Control.Feedback type="invalid">
                        Name must be 2–20 characters and can only contain letters
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-primary">
                        Service Type *
                      </Form.Label>
                      <Form.Select
                        value={serviceType}
                        required
                        onChange={(e) => setServiceType(e.target.value)}
                        className="border-primary"
                      >
                        {serviceTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-primary">
                        Start Time *
                      </Form.Label>
                      <Form.Control
                        type="time"
                        value={startTime}
                        required
                        min="08:00"
                        max="16:00"
                        onChange={(e) => setStartTime(e.target.value)}
                        isInvalid={
                          startTime !== "" &&
                          (startTime < "08:00" || startTime > "16:00")
                        }
                        className="border-primary"
                      />
                      <Form.Control.Feedback type="invalid">
                        Start time must be between 08:00 and 16:00.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label className="fw-bold text-primary">
                        End Time *
                      </Form.Label>
                      <Form.Control
                        type="time"
                        value={endTime}
                        required
                        min="08:00"
                        max="16:00"
                        onChange={(e) => setEndTime(e.target.value)}
                        isInvalid={
                          endTime !== "" && (endTime < "08:00" || endTime > "16:00")
                        }
                        className="border-primary"
                      />
                      <Form.Control.Feedback type="invalid">
                        End time must be between 08:00 and 16:00.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold text-primary">
                    Notes
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter any exceptions or notes..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="border-primary"
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting || !date}
                    size="lg"
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        {mode === "create" ? "Adding..." : "Updating..."}
                      </>
                    ) : mode === "create" ? (
                      '✓ Add Available Day'
                    ) : (
                      '✓ Update Available Day'
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Preview Section - Similar to BookAppointment */}
          {date && healthcareWorker && (
            <Card className="border-primary mb-4" style={{ borderWidth: '2px' }}>
              <Card.Header className="bg-primary text-white">
                <h5 className="mb-0">Preview</h5>
              </Card.Header>
              <Card.Body style={{ backgroundColor: 'rgba(13, 110, 253, 0.05)' }}>
                <div className="mb-3">
                  <strong>Date:</strong> {new Date(date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="mb-3">
                  <strong>Caregiver:</strong> {healthcareWorker}
                </div>
                <div className="mb-3">
                  <strong>Service Type:</strong> {serviceType}
                </div>
                <div className="mb-3">
                  <strong>Time:</strong> {startTime} - {endTime}
                </div>
                {notes && (
                  <div>
                    <strong>Notes:</strong> {notes}
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>

      <style>{`
        .btn-primary {
          background: #0d6efd;
          border: none;
        }
        
        .btn-primary:hover {
          background: #0b5ed7;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(13, 110, 253, 0.3);
        }
        
        .btn-primary:disabled {
          background: #6c757d;
        }
        
        .form-control:focus, .form-select:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25);
        }
        
        .card {
          transition: all 0.3s ease;
        }
        
        .card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

export default AvailableDayForm;