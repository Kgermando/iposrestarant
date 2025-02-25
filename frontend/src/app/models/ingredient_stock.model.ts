import { IFournisseur } from "./fournisseur.model";
import { IIngredient } from "./ingredient.model";

export interface IIngredientStock {
    ID?: string;
    uuid?: string;
    pos_uuid?: string;
    ingredient_uuid: string;
    description: string;
    quantity: number;
    fournisseur_uuid?: string;
    Fournisseur?: IFournisseur;
    prix_achat: number;
    date_expiration: Date;
    signature: string;
    code_entreprise?: number;
    Ingredient?: IIngredient;
    CreatedAt?: Date;
    UpdatedAt?: Date;
} 