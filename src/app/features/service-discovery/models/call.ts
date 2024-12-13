export interface Call{
    phoneNumber:number
    providerEmail:string
}

export interface CallData{
    phoneNumber: number;
    clientEmail:string
    clientName:string
    status:string
    requestDate:string
    email:string
    id?:number
}

export interface Sort {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: Sort;
    offset: number;
    paged: boolean;
    unpaged: boolean;
}

export interface RequestContent {
    requestId: number;
    clientName: string;
    phoneNumber: string;
    clientEmail: string;
    status: string;
    assignedProvider: string;
    requestDate: string;
}

export interface PaginatedRequests {
    content: RequestContent[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: Sort;
    numberOfElements: number;
    empty: boolean;
}
