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
    image:string,
    decision:string,
    price:string
    duration:string
    approvalDetails?:string
}

export interface acceptQuote{
    price:string
    decision:string
    
}
export interface declineQuote{
    decision:string
}



