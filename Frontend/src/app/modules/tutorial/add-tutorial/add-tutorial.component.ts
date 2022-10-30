import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, FormArray } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-add-tutorial',
  templateUrl: './add-tutorial.component.html',
  styleUrls: ['./add-tutorial.component.scss'],
  providers: [MessageService]
})
export class AddTutorialComponent implements OnInit {

  submitted = false;
  loading = false;
  name = "";
  form: UntypedFormGroup;
  id_delete = null

  constructor(
    private router: Router,
    private messageService: MessageService,
    private tutorialService: TutorialService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      description: new UntypedFormControl(null, [Validators.required])
    });
  }

  save() {
    this.loading = true;
    // this.submitted = true;
    // if (this.form.invalid) {
    //   this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please input validate fields.'});
    //   return;
    // }
    // this.tutorialService.addData( this.form.value ).subscribe((res: any) => {
    //   if( res ) {
    //     this.showSuccess();
    //     setTimeout(() => {
    //       this.router.navigate(['/admin/system']);
    //     }, 2000);
    //   } else {
    //     this.loading = false;
    //     this.submitted = false;
    //   }
    // },
    // (error: any) => {
    //   this.loading = false;
    //   this.submitted = false;
    //   this.showError(error.message);
    // });
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Add Turorial success'});
  }

  showError(message) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }

  onReject() {
    this.messageService.clear('c');
  }

}
