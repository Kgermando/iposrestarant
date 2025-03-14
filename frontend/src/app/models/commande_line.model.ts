import { IClient } from "./client.model";
import { ICommande } from "./commande.model";
import { IPlat } from "./plat.model";
import { IProduct } from "./product.model";

export interface ICommandeLine {
    ID?: string; 
    CreatedAt?: Date;
    UpdatedAt?: Date;
    uuid?: string;
    commande_uuid: string;
    livraison_uuid: string;
    product_uuid: string;
    plat_uuid: string;
    quantity: number; 
    code_entreprise?: number;
    Commande?: ICommande;
    Product?: IProduct;
    Plat?: IPlat;
}
