export interface BookingData {
  bookingId?: number;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  status?: string;
  assignedProvider: string;
  createdBy?: string;
  description: string;
}
