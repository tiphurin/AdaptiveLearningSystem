import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
// import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  // providers: [MessageService]
})
export class AppComponent {
  title = 'Course Online';

  constructor(private messageService: MessageService) {
    // this.messageService.add({ key:'alertApp', severity:'success', summary:'เพิ่มหมวดหมู่สำเร็จ' }); //!
  }

  ngOnInit(): void {
    // this.success()
  }

}
