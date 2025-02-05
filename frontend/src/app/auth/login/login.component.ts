import { formatDate } from '@angular/common';
import { Component, ElementRef, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { routes } from '../../shared/routes/routes';
import { AuthService } from '../auth.service';
import { IUser } from '../models/user';
import { UserService } from '../../layouts/user/user.service';
import { IEntreprise } from '../../models/entreprise.model';
import { EntrepriseService } from '../../layouts/entreprise/entreprise.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  dateY = "";
  public routes = routes;
  isLoading = false;
  isLoadEntreprise = false; 

  form!: FormGroup;

  // user Local
  userLocalList: IUser[] = [];

  // User cloud
  userList: IUser[] = [];
  userListFilter: IUser[] = [];

  isload = false;
  entrepriseList: IEntreprise[] = [];
  entrepriseListFilter: IEntreprise[] = [];
  filteredOptions: IEntreprise[] = [];

  isLoadSync = false;
  progress = 0;
  failedAttempts = 0;

  @ViewChild('entreprise_id') entreprise_id: ElementRef<HTMLInputElement> = {} as ElementRef<HTMLInputElement>;

  entrepriseId: number = 0;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private userService: UserService,
    private entrepriseService: EntrepriseService,
    private toastr: ToastrService
  ) {
    this.dateY = formatDate(new Date(), 'yyyy', 'en');
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.getLocalUser(); 
  }

  // Get all users cloud database
  getLocalUser() {
    this.userService.getAll().subscribe(res => {
      this.userLocalList = res.data;
      if(this.userLocalList.length === 0) {
        this.isLoadEntreprise = true;
        this.getAllEntrepriseCloud();
      }
    })
  }

  // Get all entreprise cloud database
  getAllEntrepriseCloud() {
    const filterValue = this.entreprise_id.nativeElement.value.toLowerCase();
    this.entrepriseService.getAllEntrepriseCloud().subscribe((res) => {
      this.entrepriseList = res.data;
      this.entrepriseListFilter = this.entrepriseList;
      this.filteredOptions = this.entrepriseListFilter.filter(o => o.name.toLowerCase().includes(filterValue));
      this.isLoadEntreprise = false;
    });
  }


  displayFn(entreprise: any): any {
    return entreprise && entreprise.name ? entreprise.name : '';
  }

  optionSelected(event: MatAutocompleteSelectedEvent) {
    const selectedOption: IEntreprise = event.option.value;
    this.isLoadSync = true;
    this.entrepriseId = selectedOption.ID!;
    var bodyEntreprise: IEntreprise = {
      ID: selectedOption.ID,
      type_entreprise: selectedOption.type_entreprise,
      name: selectedOption.name,
      code: selectedOption.code,
      rccm: selectedOption.rccm,
      idnat: selectedOption.idnat,
      nimpot: selectedOption.nimpot,
      adresse: selectedOption.adresse,
      email: selectedOption.email,
      telephone: selectedOption.telephone,
      manager: selectedOption.manager,
      status: selectedOption.status,
      type_abonnement: selectedOption.type_abonnement,
      abonnement: selectedOption.abonnement,
      signature: selectedOption.signature,
      created_at: selectedOption.created_at,
      updated_at: selectedOption.updated_at, 
    };
    this.entrepriseService.create(bodyEntreprise).subscribe((res) => {
      for (let item of selectedOption.Users!) {
        var body: IUser = {
          entreprise_id: item.entreprise_id,
          fullname: item.fullname,
          email: item.email,
          telephone: item.telephone,
          role: item.role,
          password: '1234',
          password_confirm: '1234',
          permission: item.permission,
          status: item.status,
          currency: item.currency,
          signature: item.signature,
          pos_id: item.pos_id,
          created_at: item.created_at,
          updated_at: item.updated_at,
        };
        this.userService.create(body).subscribe({
          next: (res) => {
            // this.progress = progress;
            this.isLoadSync = false;
            console.log("res", res)
          },
          error: (err) => {
            this.isLoadSync = false;
            this.toastr.error(`${err.error.message}`, 'Oupss!');
            console.log(err);
          }
        });
      }
    });


  }



  onSubmit(): void {
    if (this.form.valid) {
      this.isLoading = true;
      var body = {
        email: this.form.value.email.toLowerCase(),
        password: this.form.value.password
      };

      this.authService.login(body).subscribe({
        next: (res) => {
          localStorage.setItem("auth_id", res.data.ID);
          this.authService.user().subscribe({
            next: (user) => {
              this.isLoading = false;
              if (user.role == 'Support') {
                this.router.navigate([this.routes.entrepriseList]);
              } else if (user.role == 'Manager général') {
                this.router.navigate([this.routes.dashboard]);
                this.toastr.success(`Bienvenue ${user.fullname} ! 🎉`, 'Success!');
              } else if(user.role == 'Manager') {
                this.router.navigate([this.routes.dashboard]); // Faire le filtre sur les donnees only POS data
                this.toastr.success(`Bienvenue ${user.fullname} ! 🎉`, 'Success!');
              } else if(user.role == 'Caisse') {
                this.router.navigate([this.routes.caisseList]);
                this.toastr.success(`Bienvenue ${user.fullname} ! 🎉`, 'Success!');
              } else if(user.role == 'Serveur') {
                this.router.navigate([this.routes.commandeList]); 
                this.toastr.success(`Bienvenue ${user.fullname} ! 🎉`, 'Success!');
              } else if(user.role == 'Commercial') {
                this.router.navigate([this.routes.commandeList]); 
                this.toastr.success(`Bienvenue ${user.fullname} ! 🎉`, 'Success!');
              } else {
                this.router.navigate(['/auth/login']);
                this.toastr.success(`Desole chemin d'accès non trouvée! 😓`, 'Success!');
              }
             
              // this.router.navigate(['/web']); 
            },
            error: (error) => {
              this.isLoading = false;
              this.router.navigate(['/auth/login']);
              console.log(error);
            }
          });
        },
        error: (e) => {
          this.isLoading = false;
          console.error(e);

          this.failedAttempts++;
          if (this.failedAttempts >= 3) {
            this.isLoadSync = true;
            for (let item of this.userList) {
              this.userService.delete(item.ID!)
            }
            this.isLoadSync = false;
            this.toastr.error(`Ereur d'authentification, Veuillez recommancer`, 'Oupss!');
          }

          this.toastr.error(`${e.error.message}`, 'Oupss!');
          this.router.navigate(['/auth/login']);
        },
      }
      )
    }
  }

  public password: boolean[] = [false];

  public togglePassword(index: any) {
    this.password[index] = !this.password[index]
  }


}
