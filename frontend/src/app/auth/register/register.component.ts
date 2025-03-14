import { Component, OnInit } from '@angular/core';
import { routes } from '../../shared/routes/routes';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { IEntreprise } from '../../models/entreprise.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  dateY = "";
  public routes = routes;
  isLoading = false;

  formGroup!: FormGroup;

  typeEntrepriseList: string[] = ['PME', 'GE', 'Particulier'];

  type_abonnementList: string[] = ['Standard', 'Premium', 'Entreprise'];

  constructor(
    private router: Router,
    private _formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.dateY = formatDate(new Date(), 'yyyy', 'en');
  }

  ngOnInit(): void {
    this.formGroup = this._formBuilder.group({
      type_entreprise: ['', Validators.required],
      name: ['', Validators.required],
      rccm: [''],
      idnat: [''],
      nimpot: [''],
      adresse: [''],
      email: [''], // Utilise deja Title
      telephone: ['', Validators.required],
      manager: ['', Validators.required],
      type_abonnement: ['', Validators.required],
    });
  }


  onSubmit() {
    try {
      if (this.formGroup.valid) {
        this.isLoading = true;
        var code = Math.floor(1000 + Math.random() * 90000);
        var body = {
          type_entreprise: this.formGroup.value.type_entreprise,
          name: this.formGroup.value.name,
          code: code.toString(),
          rccm: this.formGroup.value.rccm,
          idnat: this.formGroup.value.idnat,
          nimpot: this.formGroup.value.nimpot,
          adresse: this.formGroup.value.adresse,
          email: this.formGroup.value.email,
          telephone: this.formGroup.value.telephone,
          manager: this.formGroup.value.manager,
          status: false,
          type_abonnement: this.formGroup.value.type_abonnement,
          abonnement: new Date(),
          signature: 'Auto',
        };
        this.authService.entreprise(body).subscribe({ 
          next: (res) => {
            const entreprise: IEntreprise = res.data;
            var dataUser = {
              entreprise_uuid: entreprise.uuid!,
              fullname: entreprise.manager,
              email: entreprise.email,
              telephone: entreprise.telephone,
              role: 'Manager général',
              password: '1234',
              password_confirm: '1234',
              permission: 'V',
              status: false,
              currency: 'CDF',
              signature: 'Auto',
            };
            this.authService.register(dataUser).subscribe({
              next: () => {
                this.isLoading = false;
                this.formGroup.reset();
                this.toastr.success('L\'administrateur vous contactera dans un delai de 24h pour activation du compte.', 'Success!');
                this.router.navigate(['/auth/login'])
              },
              error: (err) => {
                this.isLoading = false;
                this.toastr.error(`${err.error.message}`, 'Oupss!');
                console.log(err);
              }
            });
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

  public password: boolean[] = [false];

  public togglePassword(index: any) {
    this.password[index] = !this.password[index]
  }

}
