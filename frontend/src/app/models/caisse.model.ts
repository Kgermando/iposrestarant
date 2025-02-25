import { IPos } from "./pos.model";

export interface ICaisse {
    ID?: string; // ID de la caisse
    CreatedAt?: Date; // Date de creation 
    UpdatedAt?: Date;  // Date de mise a jour 
    uuid?: string; // Identifiant de la caisse
    name: string; // Nom de la caisse 
    signature: string; // Signature de la transaction
   pos_uuid?: string; // ID du point de vente
    Pos?: IPos // Point de vente
    code_entreprise: number;  // ID de l'entreprise
    Caisseitems?: ICaisseItem[];
}

export interface ICaisseItem {
    ID?: string; // ID de la caisse 
    uuid?: string; // Identifiant de la caisse
    CreatedAt?: Date; // Date de creation 
    UpdatedAt?: Date;  // Date de mise a jour
    caisse_uuid: string; // Identifiant de la caisse 
    Caisse?: ICaisse;
    type_transaction: string;   // Entrée ou Sortie
    montant: number; // Montant de la transaction
    libelle: string; // Description de la transaction
    reference: string; // Nombre aleatoire
    signature: string; // Signature de la transaction 
    code_entreprise: number;  // ID de l'entreprise
}
 