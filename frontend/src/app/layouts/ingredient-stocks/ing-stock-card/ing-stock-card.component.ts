import { AfterViewInit, Component,OnInit, signal, ViewChild } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { PageEvent } from '@angular/material/paginator';
import { IUser } from '../../../auth/models/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IFournisseur } from '../../../models/fournisseur.model';
import { CurrencyPipe, formatDate } from '@angular/common';
import { FournisseurService } from '../../fournisseurs/fournisseur.service';
import { IngStockService } from '../ing-stock.service';
import { IIngredient } from '../../../models/ingredient.model';
import { IIngredientStock } from '../../../models/ingredient_stock.model';
import { IngredientService } from '../../ingredients/ingredient.service';

@Component({
  selector: 'app-ing-stock-card',
  templateUrl: './ing-stock-card.component.html',
  styleUrl: './ing-stock-card.component.scss'
})
export class IngStockCardComponent implements OnInit, AfterViewInit {
  loadUserData = false;
  isLoadingData = false;
  public routes = routes;

  // Table 
  dataList: IIngredientStock[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  length: number = 0;
  public search = '';


  // Forms  
  uuidItem!: string;
  dataItem!: IIngredientStock; // Single data 

  formGroup!: FormGroup;
  currentUser!: IUser;
  isLoading = false;

  ingredientUuid!: string;
  ingredient!: IIngredient;

  fournisseurList: IFournisseur[] = [];
  fournisseur!: IFournisseur;

  montantTotalAchat = signal<number>(0); 
  stockTotal = signal<number>(0);
  stockDispo = signal<number>(0);
  pourcentstockDispo = signal<number>(0);


  dateRange!: FormGroup;
  rangeDate: any[] = [];
  start_date!: string;
  end_date!: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private ingredientService: IngredientService,
    private ingStockService: IngStockService,
    private fournisseurService: FournisseurService,
    private toastr: ToastrService
  ) { }

  

  ngAfterViewInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserData = false;
        this.ingStockService.refreshDataList$.subscribe(() => {
          this.fetchProducts();
        });
        this.fetchProducts();
        this.getFournisseurs(this.currentUser);
        this.getStatsIngredientStock(this.currentUser, this.ingredient.uuid!);
      },
      error: (error) => {
        this.isLoadingData = false;
        this.router.navigate(['/auth/login']);
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.loadUserData = true;
    this.isLoadingData = true;
    this.route.params.subscribe(routeParams => {
      this.ingredientUuid = routeParams['uuid'];
      this.getProduct(this.ingredientUuid);
    });

    const date = new Date();
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    this.rangeDate = [firstDay, lastDay];

    this.dateRange = this._formBuilder.group({
      rangeValue: new FormControl(this.rangeDate),
    });
    this.start_date = formatDate(this.dateRange.value.rangeValue[0], 'yyyy-MM-dd', 'en-US');
    this.end_date = formatDate(this.dateRange.value.rangeValue[1], 'yyyy-MM-dd', 'en-US');

    this.formGroup = this._formBuilder.group({
      prix_achat: ['', Validators.required],
      quantity: ['', Validators.required],
      description: ['', Validators.required],
      date_expiration: ['', Validators.required],
      fournisseur_uuid: [''],
    });

    this.onChanges();
  }


  onChanges(): void {
    this.dateRange.valueChanges.subscribe(val => {
      this.start_date = formatDate(val.rangeValue[0], 'yyyy-MM-dd', 'en-US');
      this.end_date = formatDate(val.rangeValue[1], 'yyyy-MM-dd', 'en-US');
      this.getStatsIngredientStock(this.currentUser, this.ingredient.uuid!);
      this.fetchProducts();
    });
  }


  onPageChange(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.fetchProducts();
  }

  getProduct(uuid: any) {
    this.ingredientService.get(uuid).subscribe(item => {
      this.ingredient = item.data;
      // this.getStatsIngredientStock(this.currentUser, this.ingredient.uuid!);
    });
  }

  getStatsIngredientStock(currentUser: IUser, ingredient_id: string) {
    this.ingStockService.GetStatsParIngredientStock(currentUser.entreprise!.code, ingredient_id, this.start_date, this.end_date).subscribe((res) => {
      this.montantTotalAchat.set(res.data.montanttotalachat);
      this.stockTotal.set(res.data.stocktotal);
      this.stockDispo.set(res.data.stockdispo);
      this.pourcentstockDispo.set(res.data.pourcentqtydispo);
    });
  }

  // Format de devise
  formatCurrency(price: number, currency: string): string {
    return this.currencyPipe.transform(price, currency, 'symbol', '1.2-2', 'fr-FR') || '';
  }

  fetchProducts() {
    this.ingStockService.getPaginatedByIdRangeDate(
      this.ingredientUuid, this.pageIndex, this.pageSize, this.search, 
      this.start_date, this.end_date).subscribe((res) => {
      this.dataList = res.data;
      this.totalItems = res.pagination.total_pages;
      this.length = res.pagination.length; 
      this.isLoadingData = false;
    }); 
  }

  onSearchChange(search: string) {
    this.search = search;
    this.fetchProducts();
  }

   

  getFournisseurs(currentUser: IUser) {
    this.fournisseurService.getAllEntreprise(currentUser.entreprise?.code!).subscribe(val => {
      this.fournisseurList = val.data;
    });
  }
 

  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        const body: IIngredientStock = {
          ingredient_uuid: this.ingredientUuid,
          description: this.formGroup.value.description,
          fournisseur_uuid: this.formGroup.value.fournisseur_id,
          quantity: this.formGroup.value.quantity,
          prix_achat: this.formGroup.value.prix_achat,
          date_expiration: this.formGroup.value.date_expiration,
          signature: this.currentUser.fullname,
          pos_uuid: this.currentUser.pos!.uuid!,
          code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
        };
        this.ingStockService.create(body).subscribe(res => {
          this.isLoading = false;
          this.formGroup.reset();
          this.getStatsIngredientStock(this.currentUser, this.ingredient.uuid!);
          this.toastr.success('Stock ajouté avec succès!', 'Success!');
        });
      }
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  onSubmitUpdate() {
    try {
      this.isLoading = true;
      const body: IIngredientStock = {
        ingredient_uuid: this.dataItem.ingredient_uuid,
        description: this.formGroup.value.description,
        fournisseur_uuid: this.formGroup.value.fournisseur_id,
        quantity: this.formGroup.value.quantity,
        prix_achat: this.formGroup.value.prix_achat,
        date_expiration: this.formGroup.value.date_expiration,
        signature: this.currentUser.fullname,
        pos_uuid: this.currentUser.pos!.uuid!,
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.ingStockService.update(this.uuidItem, body).subscribe(res => {
        this.formGroup.reset();
        this.getStatsIngredientStock(this.currentUser, this.ingredient.uuid!);
        this.toastr.success('Modification enregistrée!', 'Success!');
        this.isLoading = false;
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }


  findValue(value: string) {
    this.uuidItem = value;
    this.ingStockService.get(this.uuidItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        ingredient_uuid: this.dataItem.ingredient_uuid,
        description: this.dataItem.description,
        fournisseur_uuid: this.dataItem.fournisseur_uuid,
        quantity: this.dataItem.quantity,
        prix_achat: this.dataItem.prix_achat,
        date_expiration: this.dataItem.date_expiration,
        signature: this.dataItem.signature,
        code_entreprise: this.dataItem.code_entreprise,
      });
    });
  }


  delete(): void {
    this.isLoading = true;
    this.ingStockService.delete(this.uuidItem).subscribe(() => {
      this.formGroup.reset();
      this.toastr.info('Supprimé avec succès!', 'Success!');
      this.isLoading = false;
    });
  }

}

