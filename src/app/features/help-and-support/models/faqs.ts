export interface Faq{
    id: any;
    question: string;
    answer: string;
    groupId: number;
    groupName?: string;
}

export interface Faqs{
    question: string;
    answer: string;
    groupId: number;
    id?:number
    
}

export interface Efaqs{
    question: string;
    answer: string;
    groupId: number;
    id:number 
}


