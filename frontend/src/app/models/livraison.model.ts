import { IArea } from "./area.model";
import { IClient } from "./client.model";
import { ICommande } from "./commande.model";
import { ILivreur } from "./livreur.model";
import { IPos } from "./pos.model";

export interface ILivraison {
    ID?: string;
    CreatedAt?: Date;
    UpdatedAt?: Date;

    uuid?: string;
    area_uuid: string; // Zone
    cout_livraison: number;
    client_uuid: string;
    livreur_uuid: string;
    operator_name: string;
    pos_uuid: string;
    status: string;
    signature: string;
    code_entreprise: number;

    Client?: IClient;
    Livreur?: ILivreur;
    Area?: IArea;
    Pos?: IPos;
    Commandes?: ICommande[];
}