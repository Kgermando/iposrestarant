import { CurrencyPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../../auth/models/user';
import { ICommandeLine } from '../../../../models/commande_line.model';
import { CommandeLineService } from '../../../commandes-lines/commande-line.service';
import { ILivraison } from '../../../../models/livraison.model';
import { LivraisonService } from '../../livraison.service';
import { ICaisse, ICaisseItem } from '../../../../models/caisse.model';
import { CaisseService } from '../../../finances/caisse/caisse.service';
import { CaisseItemService } from '../../../finances/caisse/caisse-item.service';

@Component({
  selector: 'app-liv-facture',
  templateUrl: './liv-facture.component.html',
  styleUrl: './liv-facture.component.scss'
})
export class LivFactureComponent {
  @Input() currentUser!: IUser;
  @Input() livraison_uuid: string | undefined;
  @Input() livraison!: ILivraison;
  @Input() commandeLineList: ICommandeLine[] = [];
  @Input() selectCaisseList: ICaisse[] = [];
  isLoading = false;


  constructor(private router: Router,
    private currencyPipe: CurrencyPipe,
    private livraisonService: LivraisonService,
    private commandeLineService: CommandeLineService,
    private caisseItemService: CaisseItemService,
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


  onSubmitFacture(status: string, caisse_uuid: string) {
    try {
      this.isLoading = true;
      var body: ILivraison = {
        area_uuid: this.livraison.Area!.uuid!,
        cout_livraison: parseFloat(this.livraison.cout_livraison.toString()),
        client_uuid: this.livraison.Client!.uuid!,
        livreur_uuid: this.livraison.Livreur!.uuid!,
        operator_name: this.livraison.operator_name,
        pos_uuid: this.currentUser.pos!.uuid!,
        status: status,
        signature: this.currentUser.fullname,
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.livraisonService.update(this.livraison_uuid!, body).subscribe((res) => {
        var code = Math.floor(1000000000 + Math.random() * 90000000000);
        const body: ICaisseItem = {
          caisse_uuid: caisse_uuid,
          type_transaction: 'Entrée',
          montant: this.total,
          libelle: `Livraison ${this.livraison.Client!.fullname}`,
          reference: code.toString(),
          signature: this.currentUser.fullname,
          code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
        };
        this.caisseItemService.create(body).subscribe((res) => {
          this.isLoading = false;
          this.toastr.success(`Facture ${status} effectuée avec succès!`, 'Success!');
          this.router.navigate(['/web/livraisons/livraison-list']);
        });
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  restitutionBtn(uuid: string) {
    try {
      this.isLoading = true;
      this.commandeLineService.delete(uuid).subscribe(() => {
        this.isLoading = false;
        this.toastr.info('Livraison annulée avec succès!', 'Success!');
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  delete(): void {
    this.isLoading = true;
    this.livraisonService.delete(this.livraison_uuid!).subscribe(() => {
      for (let index = 0; index < this.commandeLineList.length; index++) {
        const element = this.commandeLineList[index];
        this.restitutionBtn(element.uuid!);
      };
      this.isLoading = false;
      this.router.navigate(['/web/livraisons/livraison-list']);
      this.toastr.info('Livraison annulée avec succès!', 'Success!');
    });
  }



}

