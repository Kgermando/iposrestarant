import { IComposition } from "./composition.model";

export interface IIngredient {
    ID?: string;
    uuid?: string;
    name: string;
    description: string; 
    unite: string;
    pos_uuid: string;
    CreatedAt?: Date;
    UpdatedAt?: Date;
    signature: string;
    code_entreprise: number;
    Compositions?: IComposition[]; 
}
