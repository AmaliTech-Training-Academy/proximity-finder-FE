import { ServiceCategory } from "../../../core/models/IServiceCategory";

export interface ProDetails {
    id: string,
    userId: string,
    service: ServiceCategory,
    paymentPreference: string,
    placeName: string,
    schedulingPolicy: string,
    bookingDays: [],
    documents: [],
    createdAt: string,
    updatedAt: string
}