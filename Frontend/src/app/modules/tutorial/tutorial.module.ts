import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorialComponent } from './tutorial.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { AddTutorialComponent } from './add-tutorial/add-tutorial.component';
import { EditTutorialComponent } from './edit-tutorial/edit-tutorial.component';
import { PreviewTutorialComponent } from './preview-tutorial/preview-tutorial.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: TutorialComponent,
      },
      {
        path: 'add', component: AddTutorialComponent,
      },
      {
        path: 'edit/:id', component: EditTutorialComponent,
      },
      {
        path: 'preview/:id', component: PreviewTutorialComponent,
      },
    ]),
  ],
  declarations: [
    TutorialComponent,
    AddTutorialComponent,
    EditTutorialComponent,
    PreviewTutorialComponent
  ]
})
export class TutorialModule { }
