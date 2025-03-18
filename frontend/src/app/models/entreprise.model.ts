import { IUser } from "../auth/models/user";
import { IPos } from "./pos.model";

export interface IEntreprise {
    ID?: string;
    id?: string;
    uuid?: string;
    type_entreprise: string;
    name: string;
    code: number;
    rccm: string;
    idnat: string;
    nimpot: string;
    adresse: string;
    email: string;                        // Email officiel
    telephone: string;
    manager: string;
    status: boolean;
    currency: string;
    type_abonnement: string;
    abonnement: Date;
    signature: string;
    Users?: IUser[]
    Pos?: IPos[]

    total_user?: number;
    total_pos?: number;

    created_at?: Date;
    updated_at?: Date;
}
