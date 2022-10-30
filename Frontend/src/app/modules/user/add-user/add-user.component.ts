import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../auth/_services/auth.service';
import { MustMatch } from '../../auth/_services/must-match.validator';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
  providers: [MessageService]
})
export class AddUserComponent implements OnInit {
  addUser: UntypedFormGroup;
  submitted: boolean = false;
  users: any[];
  parents: any[];
  loading = false;
  currentUser = null;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private userService: UserService,
    private messageService: MessageService,
    private authService: AuthService
  ) { 
    this.currentUser = this.authService.getUserDetail();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
    this.getParents();
  }

  initForm() {
    this.addUser = new UntypedFormGroup({
      firstname: new UntypedFormControl(null, [Validators.required]),
      lastname: new UntypedFormControl(null, [Validators.required]),
      tel: new UntypedFormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      address: new UntypedFormControl(null),
      email: new UntypedFormControl(null, [Validators.email]),
      username: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required]),
      cpassword: new UntypedFormControl(null, [Validators.required]),
      role: new UntypedFormControl(null, [Validators.required]),
      parent: new UntypedFormControl(null)
    });
    this.addUser.setValidators([MustMatch('password', 'cpassword')]);
  }

  get f() {
    return this.addUser.controls;
  }

  getParents() {
    this.userService.getListParent().subscribe((data:any) => {
      if( data ) {
        this.parents = data
      }
    });
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;    
    if (this.addUser.invalid) {
      this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Please input validate fields.'});
      this.loading = false;
      return;
    }
    let email = this.addUser.get('email') 

    if( email.valid && email.value != null) {
      this.userService.checkEmail( email.value ).subscribe((data:any) => {
        if( !data ) {
          this.createUser(this.addUser.value);
        } else {
          this.loading = false;
          this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Email already exists.'});
        }
      });
    } else {
      this.createUser(this.addUser.value);
    }
  }

  createUser(data: object) {
    this.userService.addUser(data).subscribe((data:any) => {
      if( data ) {
        this.showSuccess()
        setTimeout(() => {
          this.router.navigate(['/admin/user']);
        }, 1000);
      } else {
        this.loading = false;
        this.showError('Error: Data invalid.');
      }
    },
    (error:any)=> {
      this.loading = false;
      this.showError(error.message);
    });
  }

  onCancel() {
    this.router.navigate(['/admin/user']);
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Add user success'});
  }

  showError(message) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }
}
