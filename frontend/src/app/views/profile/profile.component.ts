import { Component } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from 'src/app/services/employee.service';
import { Token } from "src/app/models/token.model";
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  user : Employee ;

  updateProfileForm : FormGroup = this.fb.group({
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
    ]]
  });

  updateProfileModal : Boolean = false ;
  username : String ;

  constructor(private jwtService: JwtService,
    private employeeService : EmployeeService,
    private fb: FormBuilder,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.getUserInformation()
  }

  getUserInformation() : void {
    let tokendecode : Token = this.jwtService.DecodeToken() ;
    this.employeeService.loadUserData(tokendecode.sub).subscribe({
      next : (res : Employee) => {
        this.user = res ;
        console.log(this.user);
      },
      error: err => {
        console.log("err", err);
      }
    })  
  }

  /** Update Profile */

  openUpdateProfileModal() : void {
    this.updateProfileModal = true ;
  }

  closeUpdateProfileModal() : void {
    this.updateProfileModal = false ;
  }

  updateProfile() : void {
    let employee : Employee = {
      firstName: this.updateProfileForm.value.firstName,
      lastName: this.updateProfileForm.value.lastName,
      username: this.updateProfileForm.value.username 
    }

    this.employeeService.updateProfile(this.user.username , employee).subscribe({
      next : ( res : Employee ) => {
        console.log("res", res);
        this.toastr.success('Profile updated successfully.','Success');
        this.updateProfileForm.reset();
        this.closeUpdateProfileModal();
        this.getUserInformation();
      },
      error: err => {
        console.log("err", err)
        this.toastr.error('Something went wrong!','Error')
      }
    })
  }

}
