import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {

  uploadedImage: File;
  imagename : string = null;
  imageValidation: Boolean;

  registerForm: FormGroup = this.fb.group({
    firstName: [null, [
      Validators.required,
      Validators.pattern(/^[A-z0-9]*$/),
      Validators.minLength(3)
    ]],
    lastName: [null, [
      Validators.required,
      Validators.pattern(/^[A-z0-9]*$/),
      Validators.minLength(3)
    ]],
    username: [null, [
      Validators.required,
      Validators.pattern(/^[A-z0-9]*$/),
      Validators.minLength(3)
    ]],
    password: [null, [
      Validators.required,
      Validators.pattern(
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/
      ),
      Validators.minLength(8)
    ]],
    image: [null, [Validators.required]]
  });

  constructor(private fb: FormBuilder,
    private toastr: ToastrService,
    private authService: AuthService,
    private router: Router,
    private employeeServie : EmployeeService) { }

  ngOnInit(): void {
  }

  register = () => {

    this.employeeServie.uploadImage(this.uploadedImage).subscribe({
      next : (result : any) => {
        this.imagename = result.filename ;
      },
      error: err => {
        console.log("err", err)
        this.toastr.error('Error while uploading image!', 'Error')
      }
    })
    
    if(this.imagename !== null ){

      let employee: Employee = {
        firstName: this.registerForm.value.firstName,
        lastName: this.registerForm.value.lastName,
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        image: this.imagename
      }

      this.authService.register(employee)
        .subscribe({
          next: (res: any) => {
            console.log("res", res)
            this.toastr.success('Account created successfully.', 'Success');
            this.registerForm.reset()
            this.router.navigate(['/auth/login'])
          },
          error: err => {
            console.log("err", err)
            this.toastr.error('Something went wrong!', 'Error')
          } 
      })
    }
  }

  handleFileSelect(event) {
    let files = event.target.files;
    let file = files[0];
    this.imageValidation = true;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.imageValidation = false;
    }
    if(this.imageValidation){       
      this.uploadedImage = file;
    }
    
  }

}
