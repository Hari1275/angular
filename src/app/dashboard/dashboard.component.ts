import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { KetooService } from '../ketoo.service';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { MessageComponent } from '../message/message.component';
import { Router } from '@angular/router';


export interface DialogData {
  message: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

constructor(    private router: Router,public dialog: MatDialog,public service:KetooService) { }
orderdata:any;
flag:boolean;
name:any;
  ngOnInit() {
    if(sessionStorage.getItem("token")==null)
    {
      this.router.navigate(['login'])
    }

    this.getorders();
    var role=sessionStorage.getItem("role");
    this.name=sessionStorage.getItem("username");
    if(role=="executive")
    {
      this.flag=false;
    }
    else{
       this.flag=true;
    }

  }
logout()
{
  sessionStorage.clear();
  this.router.navigate(['login'])
}

getorders()
{
    this.service.ordersData().subscribe(data => {
    this.orderdata=data;
    
  });
}
event:any;
event1:any;
updatestatus(status:Event,id:any)
{
this.event=status
  var json = {
    status: this.event.value
  }
  this.service.statusUpdate(json,id).subscribe(data => {
    });
}

updateexecutive(status:Event,id:any)
{
this.event1=status
  var json = {
    customer_note: this.event1.value
  }
  this.service.statusUpdate(json,id).subscribe(data => {
    });
}

iddata:any;
message(id:any): void {
  this.service.msgData(id).subscribe(data => {
    this.iddata=data;
    this.open(id);
    });
  }
open(id:any){
  console.log(this.iddata)
  const dialogRef = this.dialog.open(MessageComponent, {
    width: '35%',
    height:'80%',
    data: {data:this.iddata,id:id}
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    // this.animal = result;
  });
}

}
