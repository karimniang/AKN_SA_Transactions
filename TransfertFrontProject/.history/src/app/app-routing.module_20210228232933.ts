import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TabsPage } from './tabs/tabs.page';

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
    path: 'accueil',
    component: TabsPage,
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
