export interface IFacture {
    id?: string; 
    created_at?: Date;
    updated_at?: Date;
    uuid?: string;
    n_facture: number;
    commande_id?: string;
    status: string; // Cash ou Creance
    delai_paiement?: Date;
    signature: string;
	pos_uuid?: string;
	code_entreprise?: number; 
}
