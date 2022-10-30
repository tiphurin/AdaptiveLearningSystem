import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../modules/auth/_services/auth.guard';
import { LayoutMemberComponent } from './layout-member.component';

const routes: Routes = [
  { 
    path:'', 
    component: LayoutMemberComponent,
    children: [
      { 
        path: 'user', 
        loadChildren: () => import('../modules/user/user.module').then((m) => m.UserModule)
      },
      { 
        path: 'system', 
        loadChildren: () => import('../modules/system-evoluation/system-evoluation.module').then((m) => m.SystemEvaluationModule)
      },
      { 
        path: 'tutorial', 
        loadChildren: () => import('../modules/tutorial/tutorial.module').then((m) => m.TutorialModule)
      },
      { path:'*', redirectTo: '', pathMatch: 'full' },
      { path:'**', redirectTo: '', pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  // forRoot
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
