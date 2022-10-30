import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, FormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EvoluationService } from 'src/app/services/evoluation.service';

@Component({
  selector: 'app-add-system-evoluation',
  templateUrl: './add-system-evoluation.component.html',
  styleUrls: ['./add-system-evoluation.component.scss'],
  providers: [MessageService]
})
export class AddSystemEvoluationComponent implements OnInit {
  submitted = false;
  loading = false;
  name = "";
  form: UntypedFormGroup;
  id_delete = null

  constructor(
    private router: Router,
    private messageService: MessageService,
    private evoluationService: EvoluationService,
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      description: new UntypedFormControl(null, [Validators.required]),
      questions: new UntypedFormArray([],[Validators.required])
    });
    this.addQuestion()
  }

  initQuestion() {
    return new UntypedFormGroup({
      question: new UntypedFormControl(null, [Validators.required]),
      choices: new UntypedFormArray([
        this.initChoice()
      ])
    });
  }

  initChoice(choice = null) {
    return new UntypedFormGroup({
      choice: new UntypedFormControl(choice, [Validators.required]),
      score: new UntypedFormControl(1, [Validators.required]),
    });
  }

  addQuestion() { 
    const con_question = this.form.get('questions') as UntypedFormArray;
    con_question.push(this.initQuestion());
  }

  copyQuestion(item: any) {
    let choices = item.value.choices.map(c => {
      return this.initChoice(c.choice)
    });
    const con_question = this.form.get('questions') as UntypedFormArray;
    const group = new UntypedFormGroup({
      question:  new UntypedFormControl(item.value.question, [Validators.required]),
      choices: new UntypedFormArray(choices)
    });
    con_question.push(group);
  }

  deleteQuestion() {
    const con_question = this.form.get('questions') as UntypedFormArray;
    con_question.removeAt(this.id_delete);
    this.messageService.clear('c');
  }
  
  addChoice(i: number) {
    const con_question = this.form.get('questions') as UntypedFormArray;
    const control = con_question.controls[i].get('choices') as UntypedFormArray;
    control.push(this.initChoice());
  }

  deleteChoice(i: number, c: number) {
    const con_question = this.form.get('questions') as UntypedFormArray;
    const con_choice = con_question.controls[i].get('choices') as UntypedFormArray;
    con_choice.removeAt(c);
  }

  save() {
    this.loading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please input validate fields.'});
      return;
    }
    this.evoluationService.addData( this.form.value ).subscribe((res: any) => {
      if( res ) {
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['/admin/system']);
        }, 2000);
      } else {
        this.loading = false;
        this.submitted = false;
      }
    },
    (error: any) => {
      this.loading = false;
      this.submitted = false;
      this.showError(error.message);
    });
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Add Evoluation success'});
  }

  showError(message) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }

  showConfirm(i) {
    this.id_delete = i;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'คุณต้องการลบข้อมูลนี้ใช่หรือไม่', detail:''});
  }

  onReject() {
    this.messageService.clear('c');
  }

}
