import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutMemberComponent } from './layout-member.component';
import { SharedModule } from '../shared/shared.module';
import { MessageService } from 'primeng/api';
import { ModalProfileComponent } from '../modules/modals/modal-profile/modal-profile.component';


@NgModule({
  declarations: [
    LayoutMemberComponent,
    ModalProfileComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    LayoutRoutingModule
  ],
  providers: [MessageService]
})
export class LayoutMemberModule { }
