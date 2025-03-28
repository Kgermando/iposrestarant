import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { routes } from '../../../shared/routes/routes';
import { IFournisseur } from '../../../models/fournisseur.model';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../auth/models/user';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { MatTableDataSource } from '@angular/material/table';
import { FournisseurService } from '../fournisseur.service';


@Component({
  selector: 'app-fournisseur-table',
  templateUrl: './fournisseur-table.component.html',
  styleUrl: './fournisseur-table.component.scss'
})
export class FournisseurTableComponent implements OnInit, AfterViewInit {
  loadUserData = false;
  isLoadingData = false;
  public routes = routes;
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;

  // Table 
  dataList: IFournisseur[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  length: number = 0;


  // Table 
  displayedColumns: string[] = ['name', 'type_fourniture', 'telephone', 'email', 'adresse', 'action', 'uuid'];
  dataSource = new MatTableDataSource<IFournisseur>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public search = '';

  // Forms  
  uuidItem!: string;
  dataItem!: IFournisseur; // Single data 

  formGroup!: FormGroup;
  currentUser!: IUser;
  isLoading = false;

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private fournisseurService: FournisseurService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserData = false;
        this.fournisseurService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.currentUser);
        });
        this.fetchProducts(this.currentUser);
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
    this.formGroup = this._formBuilder.group({
      name: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      adresse: ['', Validators.required],
      type_fourniture: ['', Validators.required],
    });
  }

  onPageChange(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.fetchProducts(this.currentUser);
  }

  fetchProducts(currentUser: IUser) {
    if (currentUser.role === 'Manager général' ||
      currentUser.role === 'Support') {
      this.fournisseurService.getPaginatedEntreprise(currentUser.entreprise?.code!, this.pageIndex, this.pageSize, this.search).subscribe((res) => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IFournisseur>(this.dataList);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      });
    } else {
      this.fournisseurService.getPaginatedEntrepriseByPos(currentUser.entreprise?.code!, currentUser.pos?.uuid!, this.pageIndex, this.pageSize, this.search).subscribe((res) => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IFournisseur>(this.dataList);
        this.dataSource.sort = this.sort;
        this.isLoadingData = false;
      });
    }
  }

  onSearchChange(search: string) {
    this.search = search;
    this.fetchProducts(this.currentUser);
  }

  public sortData(sort: Sort) {
    const data = this.dataList.slice();
    if (!sort.active || sort.direction === '') {
      this.dataList = data;
    } else {
      this.dataList = data.sort((a, b) => {
        const aValue = (a as never)[sort.active];
        const bValue = (b as never)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === 'asc' ? 1 : -1);
      });
    }
  }


  generateMailtoLink(email: string): string {
    return `mailto:${email}`;
  }

  generateTeltoLink(tel: string): string {
    return `tel:${tel}`;
  }



  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        const body: IFournisseur = {
          name: this.formGroup.value.name,
          telephone: this.formGroup.value.telephone,
          email: this.formGroup.value.email,
          adresse: this.formGroup.value.adresse,
          type_fourniture: this.formGroup.value.type_fourniture,
          signature: this.currentUser.fullname,
          code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
        };
        this.fournisseurService.create(body).subscribe(() => {
          this.isLoading = false;
          this.formGroup.reset();
          this.toastr.success('Fournisseur ajoutée avec succès!', 'Success!');
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
      const body: IFournisseur = {
        name: this.formGroup.value.name,
        telephone: this.formGroup.value.telephone,
        email: this.formGroup.value.email,
        adresse: this.formGroup.value.adresse,
        type_fourniture: this.formGroup.value.type_fourniture,
        signature: this.currentUser.fullname,
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.fournisseurService.update(this.uuidItem, body).subscribe(() => {
        this.formGroup.reset();
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
    this.fournisseurService.get(this.uuidItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        name: this.dataItem.name,
        telephone: this.dataItem.telephone,
        email: this.dataItem.email,
        adresse: this.dataItem.adresse,
        type_fourniture: this.dataItem.type_fourniture,
      });
    });
  }


  delete(): void {
    this.isLoading = true;
    this.fournisseurService.delete(this.uuidItem).subscribe(() => {
      this.formGroup.reset();
      this.toastr.info('Supprimé avec succès!', 'Success!');
      this.isLoading = false;
    });
  }

}

