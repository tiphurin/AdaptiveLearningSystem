import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../../auth/_services/auth.service';
import { MustMatch } from '../../auth/_services/must-match.validator';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  providers: [MessageService]
})
export class EditUserComponent implements OnInit {
  editUser: UntypedFormGroup;
  submitted:boolean = false;
  user: any;
  isSuperBoss: boolean = false;
  isDisableBtn: boolean = false;
  currentUser: any;
  loading = false;
  parents: any[];
  userId:string; // รับ id จาก parameter
  type:string; // รับ id จาก parameter

  constructor(
    private primengConfig: PrimeNGConfig, 
    private router: Router, 
    private userService: UserService,
    private activatedRoute:ActivatedRoute,
    private messageService: MessageService,
    private authService: AuthService,
  ) { 
    this.userId = this.activatedRoute.snapshot.paramMap.get('UserId');
    this.type = this.activatedRoute.snapshot.paramMap.get('Type');
    this.currentUser = this.authService.getUserDetail();
  }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
    this.getUserById();
    this.getParents();
  }

  initForm() {
    this.editUser = new UntypedFormGroup({
      firstname: new UntypedFormControl(null, [Validators.required]),
      lastname: new UntypedFormControl(null, [Validators.required]),
      tel: new UntypedFormControl(null, [Validators.minLength(10), Validators.maxLength(10)]),
      address: new UntypedFormControl(null),
      email: new UntypedFormControl(null, [Validators.email]),
      username: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.minLength(6)]),
      cpassword: new UntypedFormControl(null),
      role: new UntypedFormControl(null, [Validators.required]),
      parent: new UntypedFormControl(null),
    });
    this.editUser.setValidators([MustMatch('password', 'cpassword')]);
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe((data:any)=> {
      this.user = data;
      
      this.editUser.patchValue({
        firstname: data.firstname,
        lastname: data.lastname,
        tel: data.tel,
        address: data.address,
        email: data.email,
        username: data.username,
        role: data.role,
        parent: (data.UserParents.length > 0? data.UserParents[0].parent_id: null ),
      });
    },
    (error:any)=> {
      this.showError('Error');
    });
  }

  getParents() {
    this.userService.getListParent().subscribe((data:any) => {
      if( data ) {
        this.parents = data
      }
    });
  }

  get f(){
    return this.editUser.controls;
  }

  onSubmit() {
    this.loading = true;
    this.submitted = true;
    if(this.editUser.invalid) {
      this.messageService.add({severity:'warn', summary: 'warn', detail: 'Please input invalid fields.'});
      this.loading = false;
      return;
    }
    let email = this.editUser.get('email');

    if( email.valid && this.user.email != email.value ) {
      this.userService.checkEmail( email.value ).subscribe((data:any) => {
        if( !data ) {
          this.updateUser(this.editUser.value);
        } else {
          this.loading = false;
          this.messageService.add({severity:'warn', summary: 'Warning', detail: 'Email already exists.'});
        }
      });
    } else {
      this.updateUser(this.editUser.value);
    }
  }

  updateUser(data: any) {
    let password = data.password;
    let username = data.username;
    if( password == null ) {
      delete data.password;
    }

    if( username && this.user.username == username) {
      delete data.username;
    }

    this.userService.updateUser(this.editUser.value, this.userId).subscribe((data:any) => {
      if(data) {
        this.showSuccess()
        setTimeout(() => {
          this.router.navigate(['/admin/user']);
        }, 2000);
      }else {
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
    this.router.navigate(['/admin/user']);
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Update data success'});
  }

  showError(message) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }

}
