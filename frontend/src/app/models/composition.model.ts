import { IIngredient } from "./ingredient.model";
import { IPlat } from "./plat.model";
import { IPos } from "./pos.model";

export interface IComposition {
    ID?: string;
    uuid?: string;
    pos_uuid?: string;
    plat_uuid?: string;
    ingredient_uuid: string;
    quantity: number;
    signature: string;
    code_entreprise: number;
    Plat?: IPlat;
    Ingredient?: IIngredient;
    Pos?: IPos
    CreatedAt?: Date;
    UpdatedAt?: Date; 
}
