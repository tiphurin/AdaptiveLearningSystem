import { Component, OnInit, ViewChild } from '@angular/core';
import { PrimeNGConfig, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { EvoluationService } from 'src/app/services/evoluation.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from '../auth/_services/auth.service';

@Component({
  selector: 'app-system-evoluation',
  templateUrl: './system-evoluation.component.html',
  styleUrls: ['./system-evoluation.component.scss'],
  providers: [MessageService]
})
export class SystemEvoluationComponent implements OnInit {

  @ViewChild(Table) table: Table;
  lists: any;
  rows:number =10;
  first:number = 0;
  currentUser: any;
  loadingTable: boolean = true;
  id = null

  constructor(
    private evoluationService: EvoluationService,
    private primengConfig: PrimeNGConfig,
    private authService: AuthService,
    private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    this.currentUser = this.authService.getUserDetail();

    this.getListSystemEvaluation();
    this.primengConfig.ripple = true;
  }

  getListSystemEvaluation(){
    this.loadingTable = true;
    this.evoluationService.getListSystemEvaluation('').subscribe((data:any) =>{
      if(data) {
        this.lists = data;

        this.loadingTable = false;
      }
    })
  }

  onDeleteSystemEvaluation(){
    this.evoluationService.deleteSystemEvaluationById(this.id).subscribe((data:any)=> {
      if(data) {
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Delete Success'});
        this.messageService.clear('c');
        this.getListSystemEvaluation();
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
