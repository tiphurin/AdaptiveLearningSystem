import { Component, OnInit } from '@angular/core';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { EvoluationService } from 'src/app/services/evoluation.service';

@Component({
  selector: 'app-edit-system-evoluation',
  templateUrl: './edit-system-evoluation.component.html',
  styleUrls: ['./edit-system-evoluation.component.scss']
})
export class EditSystemEvoluationComponent implements OnInit {
  
  form: UntypedFormGroup;
  submitted = false;
  loading = true;
  is_log = false;
  name = "";
  id_delete = null;
  id = null;

  constructor(
    private router: Router,
    private messageService: MessageService,
    private evoluationService: EvoluationService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, [Validators.required]),
      description: new UntypedFormControl(null, [Validators.required]),
      questions: new UntypedFormArray([],[Validators.required])
    });
    this.getEvoluationTool();
  }

  getEvoluationTool(){
    this.evoluationService.getListSystemEvaluationId(this.id).subscribe((res: any) => {
      this.loading = false;
      if( res ) {
        this.is_log = ( res.EvoluationLogs?.length );

        if( res.EvoluationQuestions?.length ) {
          let questions = this.form.get('questions') as UntypedFormArray;
          res.EvoluationQuestions.forEach((quest: any, i: any) => {
            questions.push(
              this.initQuestion(quest.question, [])
            );

            if( quest.EvoluationChoices?.length ) {
              const choices = questions.controls[i].get('choices') as UntypedFormArray;
              
              quest.EvoluationChoices.forEach((ch: any) => {
                choices.push(
                  this.initChoice(ch.choice, ch.score)
                )
              });
            }
          });

          this.form.patchValue({
            name: res.name,
            description: res.description
          });
        }
      }
    })
  }

  initQuestion(question = null, choice = [this.initChoice()]) {
    return new UntypedFormGroup({
      question: new UntypedFormControl(question, [Validators.required]),
      choices: new UntypedFormArray(choice)
    });
  }

  initChoice(choice = null, score = 1) {
    return new UntypedFormGroup({
      choice: new UntypedFormControl(choice, [Validators.required]),
      score: new UntypedFormControl(score, [Validators.required]),
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

  edit() {
    this.loading = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.loading = false;
      this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please input validate fields.'});
      return;
    }
    this.evoluationService.editData( this.id, this.form.value ).subscribe((res: any) => {
      if( res ) {
        this.showSuccess();
        setTimeout(() => {
          this.router.navigate(['/admin/system']);
        }, 1000);
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

  showError(message: string) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }

  showConfirm(i: any) {
    this.id_delete = i;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'คุณต้องการลบข้อมูลนี้ใช่หรือไม่', detail:''});
  }

  onReject() {
    this.messageService.clear('c');
  }

}
