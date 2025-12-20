import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AvailableDayForm from "./AvailabledayForm";
import { Spinner, Alert, Container } from "react-bootstrap";
import { getAuthHeaders } from "../../types/api";

const API_URL = "http://localhost:5169";

const UpdateAvailableDayPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchAvailableDay = async () => {
      try {
        const response = await fetch(`${API_URL}/api/AvailableDay/${id}`, {
          headers: getAuthHeaders(),
        });

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json();
        setInitialData({
          date: data.date.split("T")[0],
          startTime: data.startTime,
          endTime: data.endTime,
          notes: data.notes || "",
          serviceType: data.serviceType,
          healthcareWorker: data.healthcareWorker,
        });
      } catch (err) {
        setSubmitError(
          "Could not fetch available day: " + (err as Error).message
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (id) fetchAvailableDay();
  }, [id]);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const updatedAvailableDay = {
        availableDayId: parseInt(id!),
        date: formData.date + "T00:00:00",
        startTime: formData.startTime,
        endTime: formData.endTime,
        healthcareWorker: formData.healthcareWorker,
        notes: formData.notes || null,
        serviceType: formData.serviceType,
      };

      const response = await fetch(`${API_URL}/api/AvailableDay/update/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updatedAvailableDay),
      });

      if (!response.ok)
        throw new Error(`Server responded with status ${response.status}`);

      setSubmitSuccess("Available day updated!");
      setTimeout(() => navigate("/availableDays"), 1500);
    } catch (err) {
      setSubmitError(
        "Could not update available day: " + (err as Error).message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <Container className="py-5">
        <div className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading available day details...</p>
        </div>
      </Container>
    );
  }

  if (submitError && !initialData) {
    return (
      <Container className="py-4">
        <Alert variant="danger">{submitError}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-5 text-primary fw-bold mb-3">Edit Available Day</h1>
        <h3 className="mb-3 text-secondary">
          Update the existing available day details
        </h3>
        <p className="lead" style={{ color: '#6c757d' }}>
          Make changes to the available day information
        </p>
      </div>

      <AvailableDayForm
        initialData={initialData}
        onSubmit={handleSubmit}
        mode="edit"
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
      />
    </Container>
  );
};

export default UpdateAvailableDayPage;