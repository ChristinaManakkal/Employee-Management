import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeRestService } from '../services/employee.service';
import { LoginRestService } from '../services/login.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  IsAuthenticationFailed: boolean = false;
  first_id: number;
  dob_id: number;
  signin: any;

  loginForm = new FormGroup({
    UserName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    Password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })
  
  //dummyToken: 'asw23sgd46hghgyfujgj';

  constructor(private router: Router, private employeeRestService: EmployeeRestService,  private loginRestService: LoginRestService) {
    this.IsAuthenticationFailed = false;
  }

  // login() {

  //   var logindto: any = {};
  //   logindto.first_name = this.loginForm.controls.UserName.value;
  //   logindto.dob = this.loginForm.controls.Password.value;
  //   console.log(logindto)
  //   this.loginRestService.signin(logindto).subscribe((response: any) =>   {
  //       console.log('Logged In successfully!', response);
  //       console.log(response.id);
  //       if (response.id) {
  //         this.IsAuthenticationFailed = false;      // Goes to the Html file to display the error if there is any
  //         const id = response.id;
  //         localStorage.setItem("token", JSON.stringify(this.dummyToken));
  //         localStorage.setItem("id", JSON.stringify(id));
  //         this.router.navigate(['welcome', id]);
  //       } else {
  //         console.log("Employee Not Found!");
  //         this.IsAuthenticationFailed = true;      // Goes to the Html file to display the error if there is any
  //         window.alert("Employee Not Found!");
  //       }
  //     },
  //     (error) => {
  //       this.IsAuthenticationFailed = true;
  //       window.alert("Invalid User Credentials")
  //       console.error('Error while Logged In!', error);
  //     });
  // }

  login() {
    const logindto: any = {
      first_name: this.loginForm.controls.UserName.value,
      dob: this.loginForm.controls.Password.value,
    };
  
    this.loginRestService.signin(logindto).subscribe(
      (response: any) => {
        if (response.token) {
          this.IsAuthenticationFailed = false;
          const id = response.id;
          const token = response.token; // Use the actual field name "token" received from the server
          localStorage.setItem("token", token); // Store the received token
          localStorage.setItem("id", JSON.stringify(id));
          this.router.navigate(['welcome', id]);
        } else {
          this.IsAuthenticationFailed = true;
          console.log("Employee Not Found!");
          window.alert("Employee Not Found!");
        }
      },
      (error) => {
        this.IsAuthenticationFailed = true;
        window.alert("Invalid User Credentials");
        console.error('Error while Logged In!', error);
      }
    );
  }

  
}
