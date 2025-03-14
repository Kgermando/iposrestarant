import { CurrencyPipe } from '@angular/common';
import { Component, computed, Input, OnInit, signal } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../../auth/models/user';
import { ICommandeLine } from '../../../../models/commande_line.model';
import { IProduct } from '../../../../models/product.model';
import { CommandeLineService } from '../../../commandes-lines/commande-line.service';
import { StockService } from '../../../stocks/stock.service';

@Component({
  selector: 'app-liv-prod-item',
  templateUrl: './liv-prod-item.component.html',
  styleUrl: './liv-prod-item.component.scss'
})
export class LivProdItemComponent implements OnInit {
  @Input() currentUser!: IUser;
  @Input() item!: IProduct;
  @Input() livraisonuuId!: string;


  isLoading = false; // for Submit
  isloading = false; // for qtyDispo

  // Qty du panier
  quantity = signal<number>(1); // Initialiser à 1
  qty = signal<number>(1);


  stockQty = signal<number>(0);
  cmdLineQty = signal<number>(0);
  stockDispo = computed(() => this.stockQty() - this.cmdLineQty());
  pourcentQty = computed(() => 100 - (this.cmdLineQty() * 100 / this.stockQty()));

  
  constructor(
    private commaneLineService: CommandeLineService,
    private stocksService: StockService,
    private currencyPipe: CurrencyPipe,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.isloading = true;
    this.getTotalQty();
  } 

  getTotalQty() { 
    this.commaneLineService.getTotalQty(this.item.uuid!).subscribe((res) => {
      this.cmdLineQty.set(res.data);  
    });
    this.stocksService.getTotalQty(this.item.uuid!).subscribe((res) => {
      this.stockQty.set(res.data); 
    });
    this.isloading = false;
  }

  onQuantityChange(product: IProduct, newQuantity: number) {
    console.log("prod", product); 
    this.qty.set(newQuantity);
  }

    // Format de devise
    formatCurrency(price: number, currency: string): string {
      return this.currencyPipe.transform(price, currency, 'symbol', '1.2-2', 'fr-FR') || '';
    }
  


  onSubmit(product: IProduct) {
    this.isLoading = true;
    const body: ICommandeLine = {
      commande_uuid: "00000000-0000-0000-0000-000000000000",
      livraison_uuid: this.livraisonuuId!,
      product_uuid: product.uuid!,
      plat_uuid: "00000000-0000-0000-0000-000000000000",
      quantity: this.qty(),
      code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
    };
    this.commaneLineService.create(body).subscribe(() => {
      this.toastr.success('Produit ajouté dans le panier!', 'Success!');
      this.qty.set(0);
      this.quantity.set(1);
      this.getTotalQty();
      this.isLoading = false;
    });
  }

}

