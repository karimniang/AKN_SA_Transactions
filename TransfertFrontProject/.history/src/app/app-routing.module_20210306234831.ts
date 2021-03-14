import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TabsPage } from './tabs/tabs.page';
import { DepotComponent } from './transactions/depot/depot.component';
import { RetraitComponent } from './transactions/retrait/retrait.component';

const routes: Routes = [
  {
    path:"login",
    component:
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
    path: 'commission',
    loadChildren: () => import('./commission/commission.module').then( m => m.CommissionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
