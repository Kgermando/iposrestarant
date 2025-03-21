import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutsComponent } from './layouts.component';
import { ProfileComponent } from './profile/profile.component';
import { EntrepriseComponent } from './entreprise/entreprise.component';
import { PosComponent } from './pos/pos.component';
import { ProductComponent } from './products/product/product.component';
import { StocksComponent } from './stocks/stocks.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ClientsComponent } from './clients/clients.component';
import { FournisseursComponent } from './fournisseurs/fournisseurs.component';
import { CommandesLinesComponent } from './commandes-lines/commandes-lines.component';
import { FactureViewComponent } from './commandes/facture-view/facture-view.component';
import { PlatComponent } from './plat/plat.component';
import { TableBoxComponent } from './table-box/table-box.component';
import { ProductLineComponent } from './commandes-lines/product-line/product-line.component';
import { PlatLineComponent } from './commandes-lines/plat-line/plat-line.component';
import { IngredientsComponent } from './ingredients/ingredients.component';
import { IngredientStocksComponent } from './ingredient-stocks/ingredient-stocks.component';
import { LivraisonsComponent } from './livraisons/livraisons.component';
import { LivreursComponent } from './livreurs/livreurs.component';
import { AreaComponent } from './area/area.component';
import { LivraisonLineComponent } from './livraisons/livraison-line/livraison-line.component';
import { LivProductLineComponent } from './livraisons/liv-product-line/liv-product-line.component';
import { LivPlatLineComponent } from './livraisons/liv-plat-line/liv-plat-line.component';
import { LivraisonFactureComponent } from './livraisons/livraison-facture/livraison-facture.component';


const routes: Routes = [
  {
    path: '', component: LayoutsComponent, children: [
      {
        path: 'profil',
        component: ProfileComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./user/user.module').then(
            (m) => m.UserModule
          ),
      },
      {
        path: 'entreprises/entreprise-list',
        component: EntrepriseComponent,
      },
      {
        path: 'pos/pos-list',
        component: PosComponent,
      },
      {
        path: 'table-box/table-box-list',
        component: TableBoxComponent,
      },
      {
        path: 'table-box/commandes/:uuid/table-view',
        component: CommandesComponent,
      }, 
      {
        path: 'table-box/commandes/:uuid/line',
        component: CommandesLinesComponent, children: [
          { 
            path: 'product-line',
            component: ProductLineComponent, 
          },
          {
            path: 'plat-line',
            component: PlatLineComponent,
          },
          {
            path: '',
            redirectTo: 'plat-line',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'table-box/commandes/:uuid/facture/:number',
        component: FactureViewComponent,
      },
      {
        path: 'plats/plat-list',
        component: PlatComponent,
      },
      {
        path: 'products/product-list',
        component: ProductComponent,
      },
      {
        path: 'products/:uuid/stocks',
        component: StocksComponent,
      },
      {
        path: 'ingredients/ingredient-list',
        component: IngredientsComponent,
      },
      {
        path: 'ingredients/:uuid/stocks',
        component: IngredientStocksComponent,
      },
      {
        path: 'clients/client-list',
        component: ClientsComponent,
      },
      {
        path: 'fournisseurs/fournisseur-list',
        component: FournisseursComponent,
      },
      {
        path: 'livreurs/livreur-list',
        component: LivreursComponent,
      },
      {
        path: 'livraisons/livraison-list',
        component: LivraisonsComponent,
      },
      {
        path: 'livraisons/view/:uuid/facture/:fullname',
        component: LivraisonFactureComponent,
      },
      {
        path: 'livraisons/:uuid/line',
        component: LivraisonLineComponent, children: [
          { 
            path: 'product-line',
            component: LivProductLineComponent, 
          },
          {
            path: 'plat-line',
            component: LivPlatLineComponent,
          },
          {
            path: '',
            redirectTo: 'plat-line',
            pathMatch: 'full'
          }
        ]
      },
      {
        path: 'areas/area-list',
        component: AreaComponent,
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'finances',
        loadChildren: () =>
          import('./finances/finances.module').then(
            (m) => m.FinancesModule
          ),
      },

      { path: '', redirectTo: 'dashboard', pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutsRoutingModule { }
