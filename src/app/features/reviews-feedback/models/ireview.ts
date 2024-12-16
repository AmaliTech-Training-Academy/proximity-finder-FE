import { IProfile } from "../../profile-management/models/profile";

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
    providerServiceId: string;
    userEmail: string;
    authorInfo?: IProfile
}

export interface appReview{
    reviewerName: string;
    reviewerImage: string;
    reason: string;
    ratings: number;
}

export interface reviewAnalytics {
    status: string;
    result: analyticsResult
}

export interface analyticsResult {
    oneStarCount: number;
    twoStarCount: number;
    threeStarCount: number;
    fourStarCount: number;
    fiveStarCount: number;
    totalReviews: number;
    averageRating: number;
}