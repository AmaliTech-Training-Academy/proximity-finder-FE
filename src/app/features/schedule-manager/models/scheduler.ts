export interface Event {
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
}

export interface EventResponse {
    eventId: number;
    title: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    description: string;
    createdBy: string;
} 

export interface FormattedEvent {
  title: string;
  start: string;
  end: string;
  description: string;
}

export interface Availablity {
  schedulingDate: string;
  estimatedHours: number;
  createdBy: string;
}