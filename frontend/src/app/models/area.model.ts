import { ILivraison } from "./livraison.model";

export interface IArea {
    ID?: string;
    uuid?: string;
    name: string;
    province: string;
    signature: string;
    code_entreprise: number;

    Livraisons?:ILivraison[]
}