import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  submitted = false;

  constructor(
    private primengConfig: PrimeNGConfig,
    private userService: UserService,
    private router: Router, 
    private messageService: MessageService
    ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;
    this.initForm();
  }

  initForm() {
    this.loginForm = new UntypedFormGroup({
      username: new UntypedFormControl(null, [Validators.required]),
      password: new UntypedFormControl(null, [Validators.required, Validators.minLength(6)])
    })
  }

  get f(){
    return this.loginForm.controls;
  }

  onLogin() {
    if(this.loginForm.invalid) {
      this.messageService.add({severity:'warn', summary: 'warn', detail: 'Please input username'});
      return;
    }
    this.submitted = true;
    this.userService.loginUser(this.loginForm.value).subscribe((data:any)=> {
      if(data.access_token){
        localStorage.setItem('Token', data.access_token);
        localStorage.setItem('login', 'true');
        this.messageService.add({ severity:'success', summary:'Login success' })
        this.userVerify();
      } else {
        this.submitted = false;
        this.messageService.add({ severity:'error', summary:data.message })
      }
    },(err) => {
      this.submitted = false;
      this.messageService.add({ 
        key:'alertLogin', 
        severity:'error', 
        summary:'Login fail'
      });
    });
    
  }

  userVerify() {
    this.userService.userVerify().subscribe((data: any) => {
      if (data.user) {
        localStorage.setItem('userDetails', JSON.stringify(data.user));
        setTimeout(() => {
          this.router.navigate(['/admin']);
        }, 2000);
      }else{
        this.router.navigate(['/login']);
      }
    },
    error => {
      this.router.navigate(['/login']);
    })
  }

}
