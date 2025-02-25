import { IClient } from "./client.model";
import { ICommandeLine } from "./commande_line.model";
import { ITableBox } from "./table-box.model";

export interface ICommande {
	ID?: string;
	CreatedAt?: Date;
	UpdatedAt?: Date;
	uuid?: string;
	table_box_uuid: string;
	TableBox?: ITableBox;
	ncommande?: number;
	status: string;
	client_uuid?: string;
	Client?: IClient;
	signature: string;
	pos_uuid?: string;
	code_entreprise?: number;
	commandeLines?: ICommandeLine[];
}
 