import { Component, OnInit } from '@angular/core';
import { RoleService } from "src/app/services/role.service";
import { Role } from "src/app/models/role.model";

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  roles : Role[];
  dropdownPopoverShow : Boolean = false;
  line: Number;

  constructor(private roleService: RoleService) { }

  ngOnInit(): void {
    this.getRolesList()
  }
  
  toggleDropdown(event, index) : void {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
    this.line = index ;
  }

  getRolesList() : void {
    this.roleService.getRoles().subscribe({
      next : (res: Role[]) => {
        this.roles = res;
      },
      error: err => {
        console.log("err", err);
      }
    });  
  }

}
