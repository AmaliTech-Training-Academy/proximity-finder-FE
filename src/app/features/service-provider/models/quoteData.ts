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
  providerEmail: any;
  quoteId: number;
  title: string;
  description: string;
  location: string;
  additionalDetails: string;
  status: "DECLINED" | "APPROVED"  
  startDate: string; 
  startTime: string; 
  endDate: string; 
  endTime: string;
  createdBy: string; 
  assignedProvider: string; 
  images: string[]; 
  decision: {
      price: number | null;  
      approvalDetails: string | null; 
      declineReason: string | null; 
  };
  duration: string; 
}



export interface acceptQuote{
    price:string
    aprrovalDetails:string
    
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
  


