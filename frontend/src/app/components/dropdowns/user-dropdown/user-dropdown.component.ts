import { Component, ViewChild, ElementRef } from "@angular/core";
import { createPopper } from "@popperjs/core";
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";

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

  constructor(private router: Router,
    private authService : AuthService) { 
    
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
