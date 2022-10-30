import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../auth/_services/auth.service';
import { MustMatch } from '../../auth/_services/must-match.validator';

@Component({
  selector: 'app-modal-profile',
  templateUrl: './modal-profile.component.html',
  styleUrls: ['./modal-profile.component.scss'],
  providers: [MessageService]
})
export class ModalProfileComponent implements OnInit {
  profile: UntypedFormGroup;
  submitted:boolean = false;
  user: any;
  imageFile: any;
  currentUser: any;
  loading = false;

  employeeId:string;

  constructor(
    private primengConfig: PrimeNGConfig, 
    private messageService: MessageService,
    private router: Router, 
    private userService: UserService,
    private activatedRoute:ActivatedRoute,
    private authService: AuthService,
    public ref: DynamicDialogRef, 
  ) { 
    this.currentUser = this.authService.getUserDetail();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
    this.getUserById();
  }

  initForm() {
    this.profile = new UntypedFormGroup({
      firstname: new UntypedFormControl(null, [Validators.required]),
      lastname: new UntypedFormControl(null, [Validators.required]),
      tel: new UntypedFormControl(null, [Validators.minLength(10)]),
      password: new UntypedFormControl(null),
      cpassword: new UntypedFormControl(null),
      address: new UntypedFormControl(null),
      email: new UntypedFormControl(null, [Validators.required])
    })
    this.profile.setValidators([MustMatch('password', 'cpassword')]);

  }

  getUserById() {
    this.userService.getUserById(this.currentUser.id).subscribe((data:any)=> {
      this.user = data;
      this.profile.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        tel: data.tel,
        address: data.address,
      })
    },
    (error:any)=> {
      this.showError('Error load Data');
    });
  }

  get f(){
    return this.profile.controls;
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if(this.profile.invalid) {
      this.messageService.add({severity:'warn', summary: 'warn', detail: 'Please input validate fields.'});
      this.loading = false;
      return;
    }

    let data =this.profile.value
    let password = data.password;
    let email = this.profile.get('email');
    if( password == null ) {
      delete data.password;
    }

    if( email.valid && email.value != null) {
      this.userService.checkEmail( email.value ).subscribe((data:any) => {
        if( !data ) {
          this.createUser(this.profile.value);
        } else {
          this.loading = false;
          this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Email already exists.'});
        }
      });
    } else {
      this.createUser(this.profile.value);
    }
  }

  createUser(data: object) {
    this.userService.updateUser(data, this.currentUser.id).subscribe((data:any) => {
      if( data ) {
        this.showSuccess()
        setTimeout(() => {
          this.ref.close();
          window.location.reload();
        }, 2000);
      } else {
        this.loading = false;
        this.showError('Update data fail');
      }
    },
    (error:any)=> {
      this.loading = false;
      this.showError('Update data fail');
    });
  }

  onCancel() {
    this.ref.close();
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Update data success'});
  }

  showError(message) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }

}