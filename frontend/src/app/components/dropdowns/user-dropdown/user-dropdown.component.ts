import { Component, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { DomSanitizer } from '@angular/platform-browser'; 
import { EmployeeService } from "src/app/services/employee.service";
import { Employee } from "src/app/models/employee.model";
import { JwtService } from "src/app/services/jwt.service";
import { Token } from "src/app/models/token.model";

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  styleUrls: ['./user-dropdown.component.css']
})
export class UserDropdownComponent {
  dropdownPopoverShow = false;
  @ViewChild("btnDropdownRef", { static: false }) btnDropdownRef: ElementRef;
  @ViewChild("popoverDropdownRef", { static: false })
  popoverDropdownRef: ElementRef;

  image : any;   
  private readonly imageType : string = 'data:image/PNG;base64,'; 

  user : Employee ;

  constructor(private router: Router,
    private authService : AuthService,
    private sanitizer: DomSanitizer,
    private jwtService: JwtService,
    private employeeService : EmployeeService) { 
    
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
    if(this.user?.image){
      this.employeeService.getImage(this.user?.image).subscribe((data : any ) => {  
        this.image = this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content);  
      })
    }
  }

  ngOnInit() {
    this.getUserInformation();
  }

  
  ngAfterViewInit() {
    createPopper(
      this.btnDropdownRef.nativeElement,
      this.popoverDropdownRef.nativeElement,
      {
        placement: "bottom-start",
      }
    );
  }

  toggleDropdown(event) {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
  }

  logOut() : void {
    console.log("Clicked");
    this.authService.logOut();
    this.router.navigate(['/auth/login'])
  }

  
}
