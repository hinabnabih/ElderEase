import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AvailableDayForm from "./AvailabledayForm";
import { getAuthHeaders } from "../../types/api";
import { Container } from "react-bootstrap";

const API_URL = "http://localhost:5169";

const CreateAvailableDay: React.FC = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  const handleSubmit = async (formData: any) => {
    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(null);

    try {
      const newAvailableDay = {
        date: formData.date + "T00:00:00",
        startTime: formData.startTime,
        endTime: formData.endTime,
        healthcareWorker: formData.healthcareWorker,
        notes: formData.notes || null,
        serviceType: formData.serviceType,
      };

      const response = await fetch(`${API_URL}/api/AvailableDay/create`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(newAvailableDay),
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      setSubmitSuccess("Available day added successfully!");
      setTimeout(() => navigate("/availableDays"), 1500);
    } catch (err) {
      setSubmitError(
        "Could not create available day: " + (err as Error).message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="display-5 text-primary fw-bold mb-3">Add Available Day</h1>
        <h3 className="mb-3 text-secondary">
          Schedule a new available time for caregiving services
        </h3>
        <p className="lead" style={{ color: '#6c757d' }}>
          Fill in the details below to add your availability
        </p>
      </div>

      <AvailableDayForm
        onSubmit={handleSubmit}
        mode="create"
        isSubmitting={isSubmitting}
        submitError={submitError}
        submitSuccess={submitSuccess}
      />
    </Container>
  );
};

export default CreateAvailableDay;