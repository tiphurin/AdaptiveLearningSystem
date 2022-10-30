import { LayoutMemberComponent } from './layout-member/layout-member.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { AuthGuard } from './modules/auth/_services/auth.guard';

const routes: Routes = [
  // { path:'', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'admin',
    loadChildren: () => import('./layout-member/layout-member.module').then((m) => m.LayoutMemberModule),
    canActivate: [AuthGuard]
  },
  { path:'**', redirectTo: 'login'}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
