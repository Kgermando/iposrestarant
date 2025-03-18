import { Component, OnInit } from '@angular/core';
import { ICommande } from '../../../models/commande.model';
import { CurrencyPipe } from '@angular/common';
import { PdfService } from '../../../shared/services/pdf.service';
import { IUser } from '../../../auth/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ICommandeLine } from '../../../models/commande_line.model';
import { CommandeLineService } from '../../commandes-lines/commande-line.service';
import { CommandeService } from '../commande.service';

@Component({
  selector: 'app-facture-view',
  templateUrl: './facture-view.component.html',
  styleUrl: './facture-view.component.scss'
})
export class FactureViewComponent implements OnInit {

  isLoading = false;
  currentUser!: IUser;
  commandeuuId!: string;
  commandeLineList: ICommandeLine[] = [];
  commande!: ICommande;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private currencyPipe: CurrencyPipe,
    private commandeService: CommandeService,
    private commaneLineService: CommandeLineService,
    private pdfService: PdfService,
  ) { }


  ngOnInit(): void {
    this.isLoading = true;
     this.route.params.subscribe(routeParams => {
      this.commandeuuId = routeParams['uuid'];
      this.getProduct(this.commandeuuId);
    });
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
      },
      error: (error) => {
        this.isLoading = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

   // Get One commande
   getProduct(uuid: any) { 
    this.commandeService.get(uuid).subscribe(item => {
      this.commande = item.data;
      this.commaneLineService.getAllById(this.commande!.uuid!).subscribe((line) => {
        this.commandeLineList = line.data; 
        this.isLoading = false;
      });
    });
  }



  generatePdf() {
    this.pdfService.generateInvoice(this.commandeLineList);
  }

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
    return  this.totalPlatTVA + this.totalProductTVA;
  }

  get subtotalSansTVA(): number {
    return  this.totalPlatSansTVA + this.totalProductSansTVA;
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

}
