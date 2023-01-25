import { Component, OnInit } from "@angular/core";
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from "src/app/services/employee.service";
import { ToastrService } from 'ngx-toastr';
import { Role } from "src/app/models/role.model";
import { RoleService } from "src/app/services/role.service";
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

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
  rejectRoleModal : Boolean = false ;

  id: Number ;
  username : String ;
  employees : Employee[] ;
  roles : Role[] ;
  rolesNotAssigned : Role[] ; 
  selectedRole : Role[] ;

  roleCheckboxList : any[] = [] ;
  rejectRoleForm : FormGroup ;

  searchText : string ;
  
  private readonly imageType : string = 'data:image/PNG;base64,'; 
  employeeFinalList : any[] = [];

  constructor(private employeeService: EmployeeService,
    private toastr: ToastrService,
    private sanitizer: DomSanitizer,
    private roleService: RoleService) { }

  ngOnInit(): void {
    this.getEmployeesList();
    this.getRolesList();
    this.rejectRoleForm = new FormGroup({
      rejectedRoles: new FormArray([]),
    })
  }

  getEmployeesList() : void {
    this.employeeService.getEmployees().subscribe({
      next : (res: Employee[]) => {
        this.employees = res;
      },
      error: err => {
        console.log("err", err);
      },
      complete : () => {
        this.setImageForEmployees()
      }
    });
  }
  
  setImageForEmployees() : void {

    this.employees.forEach(employee => {
      this.employeeService.getImage(employee?.image).subscribe({
        next : (data : any ) => {  
          let employee2 = {...employee, imageBase64 : this.sanitizer.bypassSecurityTrustUrl(this.imageType + data.content)};        
          this.employeeFinalList.push(employee2);     
        },
        error: err => {
          console.log("err", err);
        }
      }) 
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

  /** Delete employee */

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

  /** Assign role */

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

  /** Reject Role */

  private patchValues(): void {
    // get array control
    const formArray = this.rejectRoleForm.get('rejectedRoles') as FormArray;
    // loop for each existing value
    this.roleCheckboxList.forEach((checkbox) => {
      // add new control to FormArray
      formArray.push(
        // here the new FormControl with item value from RADIO_LIST_FROM_DATABASE
        new FormGroup({
          name: new FormControl(checkbox.name),
          checked: new FormControl(checkbox.checked),
        })
      );
    });
  }

  
  setCheckboxRoleList(list : Role[]) : void {
    list.forEach((role : Role) => {
      this.roleCheckboxList.push({ name : role.rolename , checked : false});
    });
    this.patchValues();
  }

  get refForm() {
    return this.rejectRoleForm.get('rejectedRoles') as FormArray;
  }

  openRejectRoleModal(username : String, list: Role[]) : void {
    this.username = username ;
    this.setCheckboxRoleList(list);
    this.rejectRoleModal = true ;
  }

  closeRejectRoleModal() : void {
    this.username = null ;
    this.roleCheckboxList = [];
    this.rejectRoleModal = false ; 
    this.dropdownPopoverShow = false ;
  }

  rejectRole() : void {
    this.rejectRoleForm.value.rejectedRoles.forEach((role) => {
      if(role.checked){
        this.employeeService.rejectRole(this.username, role.name).subscribe({
          next : (res : Employee) => {
            console.log("res", res);
            this.toastr.success(`Role ${role.name} rejected successfully.`,'Success');
            this.closeRejectRoleModal()
            this.dropdownPopoverShow = false;
            this.ngOnInit();
          },
          error: err => {
            console.log("err", err);
            this.toastr.error('Something went wrong!','Error')
          }
        })
      }
    });
  }


 
}
