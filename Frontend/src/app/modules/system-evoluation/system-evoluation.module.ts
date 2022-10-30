import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SystemEvoluationComponent } from './system-evoluation.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { AddSystemEvoluationComponent } from './add-system-evoluation/add-system-evoluation.component';
import { EditSystemEvoluationComponent } from './edit-system-evoluation/edit-system-evoluation.component';

@NgModule({
  declarations: [
    SystemEvoluationComponent,
    AddSystemEvoluationComponent,
    EditSystemEvoluationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: SystemEvoluationComponent,
      },
      {
        path: 'add', component: AddSystemEvoluationComponent,
      },
      {
        path: 'edit/:id', component: EditSystemEvoluationComponent,
      },
    ]),
  ],
})
export class SystemEvaluationModule { }
