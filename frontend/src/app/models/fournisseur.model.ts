import { IStock } from "./stock.model";

export interface IFournisseur {
    ID?: string;
    uuid?: string;
    created_at?: Date;
    updated_at?: Date;
    name: string;
    telephone: string;
    email: string;
    adresse: string;
    type_fourniture: string;
    signature: string;
    code_entreprise?: number;
    Stocks?: IStock[];
}