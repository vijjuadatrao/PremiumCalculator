export interface PremiumCalculatorRequest {
    name: string;
    age: number;
    dateOfBirth: string; // ISO format date string
    occupation: string;
    deathCoverAmount: number;
}