import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { routes } from '../../../shared/routes/routes';
import { UserService } from '../user.service'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr'; 
import { IPermission, permissions } from '../../../shared/model/permission.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator'; 
import { IUser } from '../../../auth/models/user';
import { IEntreprise } from '../../../models/entreprise.model';
import { EntrepriseService } from '../../entreprise/entreprise.service';
import { monnaies } from '../../../utils/unite_vente_et_monnaie';
import { IPos } from '../../../models/pos.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PosService } from '../../pos/pos.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit, AfterViewInit {
  loadUserData = false;
  isLoadingData = false;
  public routes = routes;
  public sidebarPopup1 = false;
  public sidebarPopup2 = false;

  // Table 
  dataList: IUser[] = [];
  totalItems: number = 0;
  pageSize: number = 15;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  displayedColumns: string[] = ['entreprise', 'pos', 'fullname', 'role', 'email', 'telephone', 'currency',  'status', 'uuid'];
  dataSource = new MatTableDataSource<IUser>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public search = '';

  // Forms  
  uuidItem!: string;
  dataItem!: IUser; // Single data 

  formGroup!: FormGroup;
  currentUser!: IUser;
  isLoading = false;

  public password: boolean[] = [false];
  isStatusList: boolean[] = [false, true];
  isRoleList: string[] = [ 
    'Manager général',
    'Manager',
    'Caisse',
    'Serveur',
    'Commercial',
    'Partenaire', 
  ]; // 'Support'

  permissionList: IPermission[] = permissions;

  entrepriseList: IEntreprise[] = []; 

  posList: IPos[] = [];
  posListFilter: IPos[] = []; 
  filteredOptions: IPos[] = [];

  @ViewChild('pos_id') pos_id!: ElementRef<HTMLInputElement>;
  posId!: any;
  isload = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private usersService: UserService, 
    private entrepriseServcice: EntrepriseService,
    private posService: PosService,
    private _formBuilder: FormBuilder, 
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserData = false;
        this.usersService.refreshDataList$.subscribe(() => {
          this.fetchProducts(this.currentUser);
        });
        this.fetchProducts(this.currentUser);
        this.getAllPos(this.currentUser);
        this.entrepriseServcice.getAll().subscribe((res) => {
          this.entrepriseList = res.data;
        });
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
      // entreprise_id: ['', Validators.required],
      fullname: ['', Validators.required],
      email: ['', Validators.required], 
      telephone: ['', Validators.required],
      password: ['', Validators.required],
      password_confirm: ['', Validators.required], 
      role: ['', Validators.required], // Utilise deja Title
      permission: ['', Validators.required], 
      status: [''],
      // pos_id: ['', Validators.required],
    });

  }



  getAllPos(currentUser: IUser): void {
    this.isload = true;
    const filterValue = this.pos_id.nativeElement.value.toLowerCase();
    this.posService.getAllById(currentUser.entreprise?.uuid!).subscribe(res => {
      this.posList = res.data;
      this.posListFilter = this.posList; 
      this.filteredOptions = this.posListFilter.filter(o => o.name.toLowerCase().includes(filterValue));  
      this.isload = false; 
    });
  } 
  
  displayFn(pos: any): any {
    return pos && pos.name ? pos.name : '';
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedOption = event.option.value;
    const pos_id = selectedOption.uuid;
    const name = selectedOption.name;
    this.posId = selectedOption.uuid;
    // Utilisez id et fullName comme vous le souhaitez
    console.log('pos_id:', pos_id);
    console.log('Name:', name);
  }


  onPageChange(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.fetchProducts(this.currentUser);
  }



  fetchProducts(currentUser: IUser) {
    console.log('currentUser', currentUser);
    if (currentUser.role == 'Support') {
      this.usersService.getPaginated(this.pageIndex, this.pageSize, this.search).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IUser>(this.dataList); 
        this.dataSource.sort = this.sort; 

        this.isLoadingData = false;
      });
    } else {
      this.usersService.getPaginatedById(currentUser.entreprise!.uuid!, this.pageIndex, this.pageSize, this.search).subscribe(res => {
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages; 
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<IUser>(this.dataList);
        this.dataSource.sort = this.sort;

        this.isLoadingData = false;
      });
    } 

  }

  onSearchChange(search: string) {
    this.search = search;
    this.fetchProducts(this.currentUser);
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
 

  public togglePassword(index: number) {
    this.password[index] = !this.password[index]
  }


  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var body: IUser = {
          entreprise_uuid: this.currentUser.entreprise?.uuid!,
          fullname: this.formGroup.value.fullname,
          email: this.formGroup.value.email,
          telephone: this.formGroup.value.telephone,
          role: this.formGroup.value.role,
          password: this.formGroup.value.password,
          password_confirm: this.formGroup.value.password_confirm,
          permission: this.formGroup.value.permission,
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          signature: this.currentUser.fullname,
          pos_uuid: this.posId,
        };
        this.usersService.create(body).subscribe({
          next: () => {
            this.isLoading = false;
            this.formGroup.reset();
            this.toastr.success('Ajouter avec succès!', 'Success!');
          },
          error: (err) => {
            this.isLoading = false;
            this.toastr.error(`${err.error.message}`, 'Oupss!');
            console.log(err);
          }
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
      if (this.currentUser.role == 'Support') {
        var body: IUser = {
          entreprise_uuid: this.dataItem.entreprise?.uuid!,
          fullname: this.formGroup.value.fullname,
          email: this.formGroup.value.email,
          telephone: this.formGroup.value.telephone,
          role: this.formGroup.value.role,
          permission: this.formGroup.value.permission,
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false,
          signature: this.currentUser.fullname,
          pos_uuid: this.dataItem.pos?.uuid!,
        };
        this.usersService.update(this.uuidItem, body)
        .subscribe({
          next: (res) => {
            this.formGroup.reset();
            this.toastr.success('Modification enregistré!', 'Success!');
            this.isLoading = false;
          },
          error: err => {
            console.log(err);
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            this.isLoading = false;
          }
        });
      } else {
        var body: IUser = {
          entreprise_uuid: this.currentUser.entreprise?.uuid!,
          fullname: this.formGroup.value.fullname,
          email: this.formGroup.value.email, 
          telephone: this.formGroup.value.telephone,  
          role: this.formGroup.value.role, 
          permission: this.formGroup.value.permission, 
          status: (this.formGroup.value.status) ? this.formGroup.value.status : false, 
          signature: this.currentUser.fullname, 
          pos_uuid: (this.posId) ? this.posId : "00000000-0000-0000-0000-000000000000",
        };
        this.usersService.update(this.uuidItem, body)
        .subscribe({
          next: (res) => {
            this.formGroup.reset();
            this.toastr.success('Modification enregistré!', 'Success!');
            this.isLoading = false;
          },
          error: err => {
            console.log(err);
            this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
            this.isLoading = false;
          }
        });
      } 
     
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }

  findValue(value: string) {
    this.uuidItem = value;
    this.usersService.get(this.uuidItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        entreprise_uuid: this.dataItem.entreprise_uuid,
        fullname: this.dataItem.fullname,
        email: this.dataItem.email, 
        telephone: this.dataItem.telephone,
        password: this.dataItem.password, 
        role: this.dataItem.role,  
        permission: this.dataItem.permission, 
        status: this.dataItem.status, 
        pos_uuid: this.dataItem.pos_uuid,
      });
    }
    );
  }



  delete(): void {
    this.isLoading = true;
    this.usersService
      .delete(this.uuidItem)
      .subscribe({
        next: () => {
          this.formGroup.reset();
          this.toastr.info('Supprimé avec succès!', 'Success!');
          this.isLoading = false; 
        },
        error: err => {
          this.toastr.error('Une erreur s\'est produite!', 'Oupss!');
          console.log(err);
        }
      }
      );
  }
 
 
}
