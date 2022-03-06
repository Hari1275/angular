import { Component, OnInit } from '@angular/core';
import { KetooService } from '../ketoo.service';
import { SpinnerService } from '../spinner.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable,of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


interface Employee {
  id: string;
  name: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  ELEMENT_DATA: Employee[] = [];

  constructor(
    private router: Router,
    public service: KetooService,
    public spinnerOverlayService: SpinnerService) {
  }


  
  ngOnInit(): void {
    sessionStorage.clear();
  }

  username: any;
  password: any;
  userdata: any;
  userdetails:any;
  role:any;
  name:any;
  employeeid:any;

credentials:any;

  login() {
   
    this.spinnerOverlayService.show();
    var json = {
      username: this.username,
      password: this.password
    }
    this.credentials=json
    this.service.login(json).subscribe(data => {
      this.userdata = data;
      if (this.userdata.data != "") {
        sessionStorage.setItem('username', this.userdata.data.displayName);
        sessionStorage.setItem('token', this.userdata.data.token);
        sessionStorage.setItem('role', this.userdata.data.user_role[0]);
        this.router.navigate(['dashboard'])
      }
      else {
        this.spinnerOverlayService.hide();
        alert("Invalid credentials");
      }
    });
  }




}
