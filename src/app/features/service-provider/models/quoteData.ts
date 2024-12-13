export interface Quote{
    title:string;
    location:string;
    startDate:string;
    endDate:string;
    description:string;
    additionalDetails:string;
    image:string
    email:string;
}

export interface getQuote{
    title:string;
    location:string;
    startDate:string;
    endDate:string;
    description:string;
    additionalDetails:string;
    images:string,
    decision:string,
    price:string
    duration:string
    approvalDetails?:string
    id?:number
}

export interface acceptQuote{
    price:string
    decision:string
    
}
export interface declineQuote{
    decision:string
}


export interface Request {
    requestId: number;
    clientName: string;
    description: string;
    clientEmail: string;
    requestDate: string;
    assignedProvider: string;
  }
  
  export interface SortInfo {
    sorted: boolean;
    empty: boolean;
    unsorted: boolean;
  }
  
  export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: SortInfo;
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface ResponseData {
    content: Request[];
    pageable: Pageable;
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: SortInfo;
    numberOfElements: number;
    empty: boolean;
  }
  


