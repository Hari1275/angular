import { Component, Inject, OnInit } from '@angular/core';
import { DashboardComponent, DialogData } from '../dashboard/dashboard.component';;
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { KetooService } from '../ketoo.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  original:any; 
  iddata:any;
  id:any;
  searchValue:any;
  constructor(public dialogRef: MatDialogRef<DashboardComponent>,
    @Inject(MAT_DIALOG_DATA) public data:DialogData,public service:KetooService) {
      console.log(data); 
      this.original=data;
      this.iddata=this.original.data;
      this.id=this.original.id;
     }

  ngOnInit() {
  }

  send(msg:any)
  {
var s={
  note:msg
}
    this.service.msgUpdate(s,this.id).subscribe(data => {
      this.service.msgData(this.id).subscribe(data=>{
        this.iddata=data;
        this.searchValue='';
      })
    });
  }
  

}
