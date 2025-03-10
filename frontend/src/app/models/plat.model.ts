import { ICommandeLine } from "./commande_line.model";
import { IComposition } from "./composition.model";

export interface IPlat {
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
    CreatedAt?: Date;
    UpdatedAt?: Date;
    signature: string;
    commandeLines?: ICommandeLine[];
    Compositions?: IComposition[];
}