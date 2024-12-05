import { ServiceCategory } from "../../../core/models/IServiceCategory";

    export interface ProDetails {
        id: string,
        userId: string,
        service: ServiceCategory,
        paymentPreference: string,
        placeName: string,
        serviceExperience: string | null;
        schedulingPolicy: string,
        bookingDays: [],
        documents: [],
        createdAt: string,
        updatedAt: string
    }

  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    }
  }
    export interface ProResponse {
    content: ProDetails[];
    pageable: Pageable;
    last: boolean;
    totalElements: number;
    totalPages: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
  }
  