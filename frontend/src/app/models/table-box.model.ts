import { ICommande } from "./commande.model";
import { IPos } from "./pos.model";

export interface ITableBox {
    ID?: string;
    uuid?: string;
    pos_uuid?: string;
    Pos?: IPos;
    name: string;
    numero: number;
    status: string;  // Libre et Fermée
    signature: string;
    code_entreprise?: number;
    Commandes?: ICommande[];
}