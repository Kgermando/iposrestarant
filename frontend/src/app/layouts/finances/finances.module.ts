import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinancesRoutingModule } from './finances-routing.module';
import { CaisseComponent } from './caisse/caisse.component';
import { SharedModule } from '../../shared/shared.module';
import { FinancesComponent } from './finances.component';
import { CaisseItemComponent } from './caisse/caisse-item/caisse-item.component';
import { CaisseBeginComponent } from './caisse/caisse-begin/caisse-begin.component';


@NgModule({
  declarations: [
    CaisseComponent,
    FinancesComponent,
    CaisseItemComponent,
    CaisseBeginComponent
  ],
  imports: [
    CommonModule,
    FinancesRoutingModule,
    SharedModule,
  ]
})
export class FinancesModule { }
