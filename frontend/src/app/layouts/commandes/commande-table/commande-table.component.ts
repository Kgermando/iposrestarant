import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICommande } from '../../../models/commande.model';
import { routes } from '../../../shared/routes/routes';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from '../../../auth/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { IClient } from '../../../models/client.model';
import { PdfService } from '../../../shared/services/pdf.service';
import { CommandeService } from '../commande.service';
import { ClientService } from '../../clients/client.service';
import { CommandeLineService } from '../../commandes-lines/commande-line.service';
import { ICommandeLine } from '../../../models/commande_line.model';
import { ITableBox } from '../../../models/table-box.model';
import { TableBoxService } from '../../table-box/table-box.service';

@Component({
  selector: 'app-commande-table',
  templateUrl: './commande-table.component.html',
  styleUrl: './commande-table.component.scss'
})
export class CommandeTableComponent implements OnInit, AfterViewInit {
  loadUserData = false;
  isLoadingData = false;
  loading = false;
  public routes = routes;

  // Table 
  dataList: ICommande[] = [];
  totalItems: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;
  length: number = 0;

  // Table 
  displayedColumns: string[] = ['ncommande', 'status', 'created_at', 'uuid'];
  dataSource = new MatTableDataSource<ICommande>(this.dataList);

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public search = '';

  // Forms  
  uuidItem!: string;
  dataItem!: ICommande; // Single data 

  formGroup!: FormGroup;
  currentUser!: IUser;
  isLoading = false;

  tableuuId!: string;
  tableBox!: ITableBox;

  clientList: IClient[] = [];

  commandeLineList: ICommandeLine[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private commandeService: CommandeService,
    private clientService: ClientService,
    private commaneLineService: CommandeLineService,
    private tableBoxService: TableBoxService,
    private pdfService: PdfService,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.authService.user().subscribe({
      next: (user) => {
        this.currentUser = user;
        this.loadUserData = false;
        this.commandeService.refreshDataList$.subscribe(() => {
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
    this.loading = true;
    this.route.params.subscribe(routeParams => {
      this.tableuuId = routeParams['uuid'];
      this.getProduct(this.tableuuId);
    });

    this.formGroup = this._formBuilder.group({
      ncommande: ['', Validators.required],
      client_id: [''],
    });
  }


  // Get One commande
  getProduct(uuid: any) {
    this.tableBoxService.get(uuid).subscribe(res => {
      this.tableBox = res.data;
      this.loading = false; 
    });
  }


  onPageChange(event: PageEvent): void {
    this.isLoadingData = true;
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.fetchProducts(this.currentUser);
  }

  fetchProducts(currentUser: IUser) {
    console.log("tableuuid", this.tableuuId );

    this.commandeService.getPaginatedCommandeByTableBox(currentUser.entreprise?.code!, currentUser.pos?.uuid!,
      this.tableuuId, this.pageIndex, this.pageSize, this.search).subscribe((res) => {
        console.log("res", res);
        this.dataList = res.data;
        this.totalItems = res.pagination.total_pages;
        this.length = res.pagination.length;
        this.dataSource = new MatTableDataSource<ICommande>(this.dataList);
        this.dataSource.sort = this.sort;

        this.clientService.getAllEntreprise(currentUser.entreprise?.code!).subscribe(re => {
          this.clientList = re.data;
        });
        this.isLoadingData = false;
      });
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


  onSubmit() {
    try {
      this.isLoading = true;
      const code = Math.floor(1000000000000 + Math.random() * 9999999999999);
      const body: ICommande = {
        ncommande: code, 
        status: 'En cours',
        table_box_uuid: this.tableuuId,
        signature: this.currentUser.fullname,
        pos_uuid: this.currentUser.pos!.uuid!,
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.commandeService.create(body).subscribe((res) => {
        const body: ITableBox = {
          name: this.tableBox.name,
          numero: parseInt(this.tableBox.numero.toString()),
          status: 'Occuper',
          signature: this.currentUser.fullname,
          pos_uuid: this.currentUser.pos!.uuid!,
          code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
        };
        this.tableBoxService.update(this.tableuuId, body).subscribe(() => {
          this.isLoading = false;
          this.toastr.success('Commande crée avec succès!', 'Success!');
          console.log("res.data.uuid", res.data.uuid)
          this.router.navigate(['/web/table-box/commandes', res.data.uuid, 'line']); 
        });
      });
    } catch (error) {
      this.isLoading = false;
      console.log(error);
    }
  }



  findValue(value: string) {
    this.uuidItem = value;
    this.commandeService.get(this.uuidItem).subscribe(item => {
      this.dataItem = item.data;
      this.formGroup.patchValue({
        ncommande: this.dataItem.ncommande,
        status: this.dataItem.status,
        table_box_uuid: this.dataItem.table_box_uuid,
        client_uuid: this.dataItem.client_uuid,
      });
      this.commaneLineService.getAllById(this.dataItem!.uuid!).subscribe((line) => {
        this.commandeLineList = line.data;
      });
    });
  }



  delete(): void {
    this.isLoading = true;
    const dataL = this.dataList.filter((v) => v.status === 'En cours');
    if (dataL.length === 1) {
      const body: ITableBox = {
        name: this.tableBox.name,
        numero: parseInt(this.tableBox.numero.toString()),
        status: 'Libre',
        signature: this.currentUser.fullname,
        pos_uuid: this.currentUser.pos!.uuid!,
        code_entreprise: parseInt(this.currentUser.entreprise!.code.toString()),
      };
      this.tableBoxService.update(this.tableuuId, body).subscribe(() => {
        this.commandeService.delete(this.uuidItem).subscribe(() => {
          this.formGroup.reset();
          this.toastr.info('Supprimé avec succès!', 'Success!');
          this.isLoading = false;
        });
      });
    } else {
      this.commandeService.delete(this.uuidItem).subscribe(() => {
        this.formGroup.reset();
        this.toastr.info('Supprimé avec succès!', 'Success!');
        this.isLoading = false;
      });  
    }
  }

  generatePdf() {
    this.pdfService.generateInvoice(this.commandeLineList);
  }

}

