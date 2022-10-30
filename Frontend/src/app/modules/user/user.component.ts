import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [MessageService]
})
export class UserComponent implements OnInit {
  @ViewChild(Table) table: Table;
  lists: any;
  rows:number =10;
  first:number = 0;
  currentUser: any;
  loadingTable: boolean = true;
  userId = null

  constructor(
    private userService: UserService,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetail();

    this.getListUser();
    this.primengConfig.ripple = true;
  }

  getListUser(){
    this.loadingTable = true;
    this.userService.getListUser('').subscribe((data:any) =>{
      if(data) {
        this.lists = data;

        this.loadingTable = false;
      }
    })
  }

  onDeleteUser(){
    this.userService.deleteUserById(this.userId).subscribe((data:any)=> {
      if(data) {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Delete Success'});
        this.messageService.clear('c');
        this.getListUser();
      } 
    },
    (error:any)=> {
      this.showError('Delete Fail');
    });
  }

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Update data success'});
  }

  showError(message) {
    this.messageService.add({severity:'error', summary: 'Error', detail: message});
  }

  showConfirm(user) {
    this.userId = user;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'คุณต้องการลบข้อมูลนี้ใช่หรือไม่', detail:''});
  }

  onReject() {
    this.messageService.clear('c');
  }

}
