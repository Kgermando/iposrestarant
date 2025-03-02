import { Component, ElementRef, Input, OnInit, signal, ViewChild } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { IUser } from '../../../auth/models/user';
import { ICommande } from '../../../models/commande.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommandeService } from '../../commandes/commande.service';
import { ICommandeLine } from '../../../models/commande_line.model';
import { CommandeLineService } from '../commande-line.service';
import { ITableBox } from '../../../models/table-box.model';
import { TableBoxService } from '../../table-box/table-box.service';
import { ICaisse, ICaisseItem } from '../../../models/caisse.model';
import { CaisseItemService } from '../../finances/caisse/caisse-item.service';
import { ClientService } from '../../clients/client.service';
import { IClient } from '../../../models/client.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-cmd-facture',
  templateUrl: './cmd-facture.component.html',
  styleUrl: './cmd-facture.component.scss'
})
export class CmdFactureComponent implements OnInit {
  @Input() currentUser!: IUser;
  @Input() commande_uuid: string | undefined;
  @Input() commande!: ICommande;
  @Input() commandeLineList: ICommandeLine[] = [];
  @Input() selectCaisseList: ICaisse[] = [];
  isLoading = false;

  searchField = '';
  clientList: IClient[] = [];
  clientListFilter: IClient[] = [];
  filteredOptionsClient: IClient[] = [];
  totalItemsClient: number = 0;
  pageSizeClient: number = 15;
  pageIndexClient: number = 0;
  lengthClient: number = 0;
  @ViewChild('client_id') client_id!: ElementRef<HTMLInputElement>;
  clientId!: string;
  isloadClient = false;

  constructor(private router: Router,
    private currencyPipe: CurrencyPipe,
    private commandeService: CommandeService,
    private commandeLineService: CommandeLineService,
    private tableBoxService: TableBoxService,
    private caisseItemService: CaisseItemService,
    private clientService: ClientService,
    private toastr: ToastrService
  ) { }


  // Plat
  get totalPlatTVA(): number {
    return this.commandeLineList.filter((f) => f.Plat!.tva === 16).reduce((sum, item) => sum + (item.quantity * item.Plat!.prix_vente), 0);
  }
  get totalPlatSansTVA(): number {
    return this.commandeLineList.filter((f) => f.Plat!.tva !== 16).reduce((sum, item) => sum + (item.quantity * item.Plat!.prix_vente), 0);
  }

  //  Product
  get totalProductTVA(): number {
    return this.commandeLineList.filter((f) => f.Product!.tva === 16).reduce((sum, item) => sum + (item.quantity * item.Product!.prix_vente), 0);
  }
  get totalProductSansTVA(): number {
    return this.commandeLineList.filter((f) => f.Product!.tva !== 16).reduce((sum, item) => sum + (item.quantity * item.Product!.prix_vente), 0);
  }


  get subtotalTVA(): number {
    return this.totalPlatTVA + this.totalProductTVA;
  }

  get subtotalSansTVA(): number {
    return this.totalPlatSansTVA + this.totalProductSansTVA;
  }

  get subtotal(): number {
    return this.subtotalSansTVA + this.subtotalTVA;
  }

  get tax(): number {
    return this.subtotalTVA * 0.16; // 16% de TVA
  }

  get total(): number {
    return this.subtotalSansTVA + this.subtotalTVA + this.tax;
  }

  // Format de devise
  formatCurrency(price: number, currency: string): string {
    return this.currencyPipe.transform(price, currency, 'symbol', '1.2-2', 'fr-FR') || '';
  }

  ngOnInit() {
    this.isloadClient = true;
    this.getAllClient(this.currentUser);
  }


  getAllClient(currentUser: IUser): void {
    const filterValue = this.client_id.nativeElement.value.toLowerCase();
    this.clientService.getPaginatedEntreprise(currentUser.entreprise?.code!, this.pageIndexClient, this.pageSizeClient, this.searchField).subscribe((res) => {
      this.clientList = res.data;
      this.clientListFilter = this.clientList;
      this.filteredOptionsClient = this.clientListFilter.filter(o => o.fullname.toLowerCase().includes(filterValue));
      this.totalItemsClient = res.pagination.total_pages;
      this.lengthClient = res.pagination.length;
      this.isloadClient = false;
    });
  }

  displayFnClient(client: any): any {
    return client && client.fullname ? client.fullname : '';
  }

  optionSelectedClient(event: MatAutocompleteSelectedEvent) {
    const selectedOption = event.option.value;
    this.clientId = selectedOption.ID;
  }


  onChange(event: any) {
    console.log("Submit", event.value)
    this.onSubmit();
  }

  onSubmit() {
    try {
      this.isLoading = true;
      const body: ICommande = {
        ncommande: this.commande.ncommande,
        status: this.commande.status,
        table_box_uuid: this.commande.table_box_uuid,
        client_uuid: this.clientId,
        signature: this.currentUser.fullname,
        pos_uuid: this.currentUser.pos!.uuid!,
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.commandeService.update(this.commande.uuid!, body).subscribe((res) => {
        this.isLoading = false;
        this.toastr.success('Client ajoutée à la facture!', 'Success!');
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  onSubmitFacture(status: string, caisse_uuid: string) {
    try {
      this.isLoading = true;
      const body: ICommande = {
        ncommande: this.commande.ncommande,
        status: status,
        signature: this.currentUser.fullname,
        table_box_uuid: this.commande.TableBox!.uuid!,
        pos_uuid: this.currentUser.pos!.uuid!,
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.commandeService.update(this.commande_uuid!, body).subscribe((res) => {
        const body: ITableBox = {
          name: this.commande.TableBox!.name,
          numero: parseInt(this.commande.TableBox!.numero.toString()),
          status: 'Libre',
          signature: this.currentUser.fullname,
          pos_uuid: this.currentUser.pos!.uuid!,
          code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
        };
        this.tableBoxService.update(this.commande.TableBox!.ID!, body).subscribe(() => {
          var code = Math.floor(1000000000 + Math.random() * 90000000000);
          const body: ICaisseItem = {
            caisse_uuid: caisse_uuid,
            type_transaction: 'Entrée',
            montant: this.total,
            libelle: `Vente #${this.commande.ncommande}`,
            reference: code.toString(),
            signature: this.currentUser.fullname,
            code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
          };
          this.caisseItemService.create(body).subscribe((res) => {
            this.isLoading = false;
            this.toastr.success(`Facture ${status} effectuée avec succès!`, 'Success!');
            this.router.navigate(['/web/table-box/table-box-list']);
          });
          this.isLoading = false;
        });
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  restitutionBtn(id: string): void {
    try {
      this.isLoading = true;
      this.commandeLineService.delete(id).subscribe(() => {
        this.isLoading = false;
        this.toastr.info('Commande annulée avec succès!', 'Success!');
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  delete(): void {
    this.isLoading = true;
    const body: ITableBox = {
      name: this.commande.TableBox!.name,
      numero: parseInt(this.commande.TableBox!.numero.toString()),
      status: 'Libre',
      signature: this.currentUser.fullname,
      pos_uuid: this.currentUser.pos!.uuid!,
      code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
    };
    this.tableBoxService.update(this.commande.TableBox!.uuid!, body).subscribe(() => {
      this.commandeService.delete(this.commande_uuid!).subscribe(() => {
        for (let index = 0; index < this.commandeLineList.length; index++) {
          const element = this.commandeLineList[index];
          this.restitutionBtn(element.uuid!);
        };

        this.isLoading = false;
        this.router.navigate(['/web/table-box/table-box-list']);
        this.toastr.info('Commande annulée avec succès!', 'Success!');
      });
    });
  }



} 
