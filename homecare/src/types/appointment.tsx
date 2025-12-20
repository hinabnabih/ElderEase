export interface Appointment {
  appointmentId?: number;
  availableDayId?: number;
  patientName: string;
  taskType: string;
  //description: string;
  appointmentDate: string;
  startTime: string;
  endTime: string;
  caregiverName: string;
  status: string;
}