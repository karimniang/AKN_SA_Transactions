import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TransactionCoursComponent } from './tab2/transaction-cours/transaction-cours.component';
import { TransactionLoadingPage } from './tab2/transaction-loading/transaction-loading.page';
import { TabsPage } from './tabs/tabs.page';
import { DepotComponent } from './transactions/depot/depot.component';
import { RetraitComponent } from './transactions/retrait/retrait.component';

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:'',
    redirectTo: 'login',
    pathMatch : 'full'
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path:'transaction/depot',
    component:DepotComponent
  },
  {
    path:'transaction/retrait',
    component:RetraitComponent
  },
  {
    path:'transaction/encours',
    component:TransactionCoursComponent
  },
  {
    path: 'commission',
    loadChildren: () => import('./commission/commission.module').then( m => m.CommissionPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
