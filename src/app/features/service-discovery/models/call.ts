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