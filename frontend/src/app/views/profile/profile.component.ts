import { Component } from '@angular/core';
import { JwtService } from 'src/app/services/jwt.service';
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from 'src/app/services/employee.service';
import { Token } from "src/app/models/token.model";
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer } from '@angular/platform-browser'; 

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  user : Employee ;

  image : any;   
  private readonly imageType : string = 'data:image/PNG;base64,'; 

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
    private sanitizer: DomSanitizer,
    private fb: FormBuilder,
    private toastr: ToastrService){}

  ngOnInit(): void {
    this.getUserInformation();
  }

  getUserInformation() : void {
    let tokendecode : Token = this.jwtService.DecodeToken() ;
    this.employeeService.loadUserData(tokendecode.sub).subscribe({
      next : (res : Employee) => {
        this.user = res ;
      },
      error: err => {
        console.log("err", err);
      },
      complete: ()  => {
        this.getImage()
      }
    })  
  }

  getImage() : void {
    this.employeeService.getImage(this.user?.image).subscribe({
        next : (data : any ) => {  
          this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content); 
        },
        error: err => {
          console.log("err", err)
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

  /** change profile image */
  uploadedImage: File;
  imagename : string = null;
  imageValidation: Boolean;


  changeUploadImage() : void {
    this.employeeService.uploadImage(this.uploadedImage).subscribe({
      next : (result : any) => {
        this.imagename = result.filename ;
        console.log("imagename", result.filename , this.imagename);
        
      },
      error: err => {
        console.log("err", err)
        this.toastr.error('Error while uploading image!', 'Error')
      },
      complete : () => {
        this.employeeService.changeImage(this.user.username , this.imagename).subscribe({
          next : (res: Employee) => {
            this.toastr.success('Image changed successfully!', 'Success')
            this.user = res ;
           
          },
          error: err => {
            console.log("err", err)
            this.toastr.error('Something went wrong!','Error')
          },
          complete : () => {
          }
        })
        this.getImage()
      }
    })
  }
  


  public initUpload() {
    let fileInput = document.getElementById('upload');
    console.log(fileInput);
    if (fileInput)
      fileInput.click();
    else
      console.log('ERROR: cannot find file input');
  }

  public onChange(event): void {
    let files = event.target.files;
    let file = files[0];
    this.imageValidation = true;
    if (file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.imageValidation = false;
    }
    if(this.imageValidation){       
      this.uploadedImage = file;
      this.changeUploadImage()
    }
    
  }

}
