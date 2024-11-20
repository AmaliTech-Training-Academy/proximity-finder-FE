export interface IClient{
    userName: string,
    mobileNumber:number,
    email:string
    password: string,
    confirmPassword: string,
    role:string
}

export interface IRes{
    message: string,
    statusCode:number
}