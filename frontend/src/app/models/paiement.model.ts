export interface PaiementModel {
    ID?: string; 
    created_at: Date;
    updated_at: Date;
    uuid?: string;
    total_amount: number; 
    payment_mode: string;
}