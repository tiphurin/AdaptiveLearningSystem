import { AuthService } from './../modules/auth/_services/auth.service';
import { Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ModalProfileComponent } from '../modules/modals/modal-profile/modal-profile.component';

@Component({
  selector: 'app-layout-member',
  templateUrl: './layout-member.component.html',
  styleUrls: ['./layout-member.component.scss'],
  providers: [MessageService,DialogService]
})
export class LayoutMemberComponent implements OnInit {
  items: MenuItem[] = [];
  userMenu: MenuItem[] = [];
  showSidebar: boolean = true;
  currentUser:any;
  ref: DynamicDialogRef;
  user: any;
  

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private messageService: MessageService,
    public dialogService: DialogService,
  ) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetail();
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink: 'home'
      },
      {
        label: 'Course Managements',
        icon: 'pi pi-book',
        routerLink: 'course'
      },
      {
        label: 'User Managements',
        icon: 'pi pi-users',
        routerLink: 'user'
      },
      {
        label: 'Tutorial Managements',
        icon: 'pi pi-file',
        routerLink: 'tutorial'
      },
      {
        label: 'Evaluation Managements',
        icon: 'pi pi-cog',
        routerLink: 'system'
      },
      // {
      //   label: 'Main',
      //   icon: 'pi pi-list',
      //   routerLink: 'main',
      //   routerLinkActiveOptions: { exact: true },
      //   visible: this.visible()
      // },
    ]
    this.getEmployeeById();
  }

  toggleSidebar() {
    this.showSidebar = !this.showSidebar;
    // console.log(this.showSidebar)
  }

  logout() {
    localStorage.removeItem('userDetails');
    localStorage.removeItem('Token');
    localStorage.removeItem('login');
    this.router.navigate(['/login'], {
      queryParams: {},
    });
  }

  showProfileModal() {
    this.ref = this.dialogService.open(ModalProfileComponent, {
      baseZIndex: 10000,
      width: '70%',
      header: `Profile : ${this.currentUser.username}`
    })
  }

  getEmployeeById() {
    this.userService.getUserById(this.currentUser.id).subscribe((data:any)=> {
      this.user = data;
    });
  }

}
