import { IFournisseur } from "./fournisseur.model";
import { IProduct } from "./product.model";

export interface IStock {
    ID?: string;
    uuid?: string;
    pos_uuid?: string;
    product_uuid: string;
    description: string;
    quantity: number;
    fournisseur_uuid?: string;
    Fournisseur?: IFournisseur;
    prix_achat: number;
    date_expiration: Date;
    signature: string;
    code_entreprise?: number;
    Product?: IProduct;
    CreatedAt?: Date;
    UpdatedAt?: Date;
} 