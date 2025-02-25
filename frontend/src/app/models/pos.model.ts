import { ICommande } from "./commande.model";
import { IEntreprise } from "./entreprise.model";
import { IStock } from "./stock.model";

export interface IPos {
    ID?: string;
    uuid?: string;
    entreprise_uuid: string;
    entreprise?: IEntreprise;
    name: string;
    adresse: string;
    email: string;
    telephone: string;
    manager: string;
    status: string;  // Actif ou Inactif
    signature: string;
    stocks?: IStock[];
    commandes?: ICommande[];
}