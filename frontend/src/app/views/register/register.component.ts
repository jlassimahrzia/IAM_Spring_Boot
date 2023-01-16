import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { Employee } from "src/app/models/employee.model";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  registerForm : FormGroup = this.fb.group({
    firstName: [ null , [
      Validators.required,
      Validators.pattern(/^[A-z0-9]*$/),
      Validators.minLength(3)
    ]],
    lastName: [ null , [
      Validators.required,
      Validators.pattern(/^[A-z0-9]*$/),
      Validators.minLength(3)
    ]],
    username: [ null , [
      Validators.required,
      Validators.pattern(/^[A-z0-9]*$/),
      Validators.minLength(3)
    ]],
    password: [ null , [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),
      Validators.minLength(8)
    ]]
  });

  constructor(private fb: FormBuilder, 
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  register = () => {

    let employee : Employee = {
      firstName: this.registerForm.value.firstName,
      lastName: this.registerForm.value.lastName,
      username: this.registerForm.value.username,
      password: this.registerForm.value.password 
    }

    this.authService.register(employee)
        .subscribe({
          next: (res:any) => { 
            console.log("res", res)
            this.toastr.success('Account created successfully.','Success');
            this.registerForm.reset()
            this.router.navigate(['/auth/login'])
          }, 
          error: err => {
            console.log("err", err)
            this.toastr.error('Something went wrong!','Error')
          }
        })

  }

}
