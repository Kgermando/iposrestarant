import { ICommande } from "./commande.model";

export interface IClient {
    ID?: string; 
    created_at?: Date;
    updated_at?: Date;
    uuid?: string;
    fullname: string;
    telephone: string;
    telephone2?: string;
    email?: string; 
    adress?: string;
    // birthday? : string;
    organisation?: string;
    website?: string;
    signature: string; // Code secret pour le client
    code_entreprise?: number;
    commandes? :ICommande[];
}
 