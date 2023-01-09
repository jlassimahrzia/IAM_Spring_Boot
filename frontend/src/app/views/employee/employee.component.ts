import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from "src/app/services/employee.service";
import { ToastrService } from 'ngx-toastr';
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  dropdownPopoverShow : Boolean = false;
  line: Number;

  deleteModal : Boolean = false ;
  assignRoleModal : Boolean = false ;

  id: Number ;
  username : String ;
  employees : Employee[];
  roles : Role[];
  rolesNotAssigned : Role[]; 
  selectedRole : any;
  
  constructor(private employeeService: EmployeeService,
    private toastr: ToastrService,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.getEmployeesList()
    this.getRolesList()
  }

  getEmployeesList() : void {
    this.employeeService.getEmployees().subscribe({
      next : (res: Employee[]) => {
        this.employees = res;
      },
      error: err => {
        console.log("err", err);
      }
    });
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

  toggleDropdown(event, index) : void {
    event.preventDefault();
    if (this.dropdownPopoverShow) {
      this.dropdownPopoverShow = false;
    } else {
      this.dropdownPopoverShow = true;
    }
    this.line = index ;
  }

  openDeleteModal(id : Number) : void {
    this.id = id ;
    this.deleteModal = true;
  }

  closeDeleteModal() : void {
    this.deleteModal = false;
    this.dropdownPopoverShow = false;
  }

  deleteEmployee() : void {
    this.employeeService.deleteEmployee(this.id).subscribe({
      next: (res : any) => {
        console.log("res", res);
        this.toastr.success('Employee deleted successfully.','Success');
        this.closeDeleteModal()
        this.dropdownPopoverShow = false;
        this.ngOnInit();
      },
      error: err => {
        console.log("err", err);
        this.toastr.error('Something went wrong!','Error')
      }
    })
    
  }

  openAssignRoleModal(username : String, userRoles : Role[]) : void {
    this.username = username;
    this.rolesNotAssigned = this.roles.filter(role1 => {
      return !userRoles.some(role2 => {
        return role1.id === role2.id;
      });
    });
    this.assignRoleModal = true;
  }

  closeAssignRoleModal() : void {
    this.assignRoleModal = false;
    this.dropdownPopoverShow = false;
  }

  assignRole() : void {
    this.selectedRole.forEach((role : Role) => {
      this.employeeService.assignRole(this.username, role.rolename).subscribe({
        next : (res : Employee) => {
          console.log("res", res);
          this.toastr.success(`Role ${role.rolename} assigned successfully.`,'Success');
          this.closeAssignRoleModal()
          this.dropdownPopoverShow = false;
          this.ngOnInit();
        },
        error: err => {
          console.log("err", err);
          this.toastr.error('Something went wrong!','Error')
        }
      })
    });
  }

}
