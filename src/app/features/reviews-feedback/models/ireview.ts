export interface Ireview {
    rating: number;
    content: string;
    providerServiceId: string;
    isAnonymous: boolean;
}


export interface reviewResponse {
    status: string;
    result: review[];
}

export interface review {
    anonymous: boolean;
    content: string;
    createdAt: string;
    id: string;
    rating: number;
    sentiment: string;
    serviceProviderId: string;
    userEmail: string;
}