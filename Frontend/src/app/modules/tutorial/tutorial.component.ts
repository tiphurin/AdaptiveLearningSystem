import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { EvoluationService } from 'src/app/services/evoluation.service';
import { TutorialService } from 'src/app/services/tutorial.service';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.component.html',
  styleUrls: ['./tutorial.component.scss'],
  providers: [MessageService]
})
export class TutorialComponent implements OnInit {

  @ViewChild(Table) table: Table;
  lists: any;
  rows:number =10;
  first:number = 0;
  currentUser: any;
  loadingTable: boolean = true;
  id = null

  constructor(
    private tutorialService: TutorialService,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetail();
    this.getList();
    this.primengConfig.ripple = true;
  }

  getList(){
    this.loadingTable = true;
    this.tutorialService.getList('').subscribe((data:any) =>{
      if(data) {
        this.lists = data;
        this.loadingTable = false;
      }
    })
  }

  onDelete(){
    this.tutorialService.deleteById(this.id).subscribe((data:any)=> {
      if(data) {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Delete Success'});
        this.messageService.clear('c');
        this.getList();
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
    this.id = user;
    this.messageService.clear();
    this.messageService.add({key: 'c', sticky: true, severity:'error', summary:'คุณต้องการลบข้อมูลนี้ใช่หรือไม่', detail:''});
  }

  onReject() {
    this.messageService.clear('c');
  }

}
