export interface AvailableDay {
  availableDayId: number;
  date: string;
  startTime: string;
  endTime: string;
  healthcareWorker: string;
  notes?: string;
  serviceType: string;
}