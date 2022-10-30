
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserComponent } from './user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { LayoutRoutingModule } from 'src/app/layout-member/layout-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    UserComponent,
    AddUserComponent,
    EditUserComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: UserComponent,
      },
      {
        path: 'add', component: AddUserComponent,
      },
      {
        path: 'edit/:UserId/:Type', component: EditUserComponent,
      }
    ]),
  ]
})
export class UserModule { }
