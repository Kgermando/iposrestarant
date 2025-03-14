import { IStock } from "./stock.model";

export interface IProduct {
    ID?: string;
    uuid?: string;
    reference: string;
    name: string;
    description: string;
    unite_vente: string;
    prix_vente: number;
    tva: number;
    pos_uuid?: string;
    code_entreprise?: number;
    created_at?: Date;
    updated_at?: Date;
    signature: string;
    stocks?: IStock[];
}
