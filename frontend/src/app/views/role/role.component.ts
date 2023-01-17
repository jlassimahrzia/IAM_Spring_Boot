import { Component, OnInit } from '@angular/core';
import { RoleService } from "src/app/services/role.service";
import { Role } from "src/app/models/role.model";
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from '@angular/forms';
import { AuthorityService } from "src/app/services/authority.service";
import { Authority } from "src/app/models/authority.model";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})

export class RoleComponent implements OnInit {

  roles : Role[];
  dropdownPopoverShow : Boolean = false;
  line: Number;
  authorities : Authority[];
  rolename : String;

  selectedAuthorities : Authority[];
  authoritiesNotAssigned : Authority[]

  deleteModal : Boolean = false ;
  createRoleModal : Boolean = false ;
  editModal : Boolean = false ;
  assignAuthorityModal : Boolean = false ;

  searchText : string ;

  createRoleForm : FormGroup = this.fb.group({
    rolename: [ null , [Validators.required]],
    authorities: []
  })

  editRoleForm : FormGroup = this.fb.group({
    newrolename: [ null , [Validators.required]]
  })

  rejectAuthorityForm : FormGroup ;
  authorityCheckboxList : any[] = [] ;
  rejectAuthorityModal : Boolean = false ;

  constructor(private roleService: RoleService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private authorityService: AuthorityService) { }

  ngOnInit(): void {
    this.getRolesList()
    this.getAuthorityList()
    this.rejectAuthorityForm = new FormGroup({
      rejectedAuthorities: new FormArray([]),
    })
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

  getAuthorityList() : void {
    this.authorityService.getAuthorities().subscribe({
      next : (res: Authority[]) => {
        this.authorities = res;
      },
      error: err => {
        console.log("err", err);
      }
    });  
  }

  /** Create Role */

  openCreateModal() : void {
    this.createRoleModal = true ;
  }

  closeCreateModal() : void {
    this.createRoleModal = false ;
  }

  createRole() : void {
    const role : Role = {
      rolename : this.createRoleForm.value.rolename,
      authorities : this.createRoleForm.value.authorities
    }

    this.roleService.createRole(role).subscribe({
      next : (res : Role) => {
        console.log("res", res);
        this.toastr.success('Role added successfully.','Success');
        this.createRoleForm.reset();
        this.closeCreateModal();
        this.ngOnInit()
      }, 
      error: err => {
        console.log("err", err)
        this.toastr.error('Something went wrong!','Error')
      }
    })
  }


  /** Delete Role */

  openDeleteModal(rolename : String) : void {
    this.rolename = rolename;
    this.deleteModal = true;
  }

  closeDeleteModal() : void {
    this.rolename = "";
    this.deleteModal = false;
    this.dropdownPopoverShow = false ;
  }

  deleteRole() : void {
    this.roleService.deleteRole(this.rolename).subscribe({
      next : (res : any ) => {
        console.log("res", res);
        this.toastr.success('Role deleted successfully.','Success');
        this.closeDeleteModal()
        this.ngOnInit()
      }, 
      error: err => {
        console.log("err", err)
        this.toastr.error('Something went wrong!','Error')
      }
    })
  }

  /** Edit Role */

  openEditModal(rolename : String) : void {
    this.rolename = rolename ;
    this.editModal = true ;
  }

  closeEditModal() : void {
    this.rolename = null ;
    this.editModal = false ;
    this.dropdownPopoverShow = false ;
  }

  editRole() : void {
    console.log( this.editRoleForm.value.newrolename);
    

    this.roleService.editRole(this.rolename , { rolename : this.editRoleForm.value.newrolename}).subscribe({
      next : (res: Role) => {
        console.log("res", res);
        this.toastr.success('Role updated successfully.','Success');
        this.closeEditModal()
        this.ngOnInit()
      }, 
      error: err => {
        console.log("err", err)
        this.toastr.error('Something went wrong!','Error')
      }
    }) 
  }

  /** Assign Authority */

  openAssignAuthorityModal(rolename : String, roleAuthorities : Authority[]) : void {
    this.rolename = rolename ;
    this.authoritiesNotAssigned = this.authorities.filter((authority1 : Authority )=> {
      return !roleAuthorities.some(authority2 => {
        return authority1.id === authority2.id;
      });
    });
    this.assignAuthorityModal = true ;
  }

  closeAssignAuthorityModal() : void {
    this.rolename = "" ;
    this.assignAuthorityModal = false ;
    this.dropdownPopoverShow = false ;
  }

  assignAuthority() : void {
    this.selectedAuthorities.forEach((authority : Authority) => {
      this.roleService.assignAuthority(this.rolename, authority.authorityname).subscribe({
        next : (res : Role) => {
          console.log("res", res);
          this.toastr.success(`Authority ${authority.authorityname} assigned successfully.`,'Success');
          this.closeAssignAuthorityModal()
          this.dropdownPopoverShow = false;
          this.selectedAuthorities = [];
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
    const formArray = this.rejectAuthorityForm.get('rejectedAuthorities') as FormArray;
    // loop for each existing value
    this.authorityCheckboxList.forEach((checkbox) => {
      // add new control to FormArray
      formArray.push(
        // here the new FormControl with item value 
        new FormGroup({
          name: new FormControl(checkbox.name),
          checked: new FormControl(checkbox.checked),
        })
      );
    });
  }

  setCheckboxAuthorityList(list : Authority[]) : void {
    list.forEach((role : Authority) => {
      this.authorityCheckboxList.push({ name : role.authorityname, checked : false});
    });
    this.patchValues();
  }

  get refForm() {
    return this.rejectAuthorityForm.get('rejectedAuthorities') as FormArray;
  }

  openRejectAuthorityModal(rolename : String, list: Authority[]) : void {
    this.rolename = rolename ;
    this.setCheckboxAuthorityList(list);
    this.rejectAuthorityModal = true ; 
  }

  closeRejectAuthorityModal() : void {
    this.rolename = null ;
    this.authorityCheckboxList = [];
    this.rejectAuthorityModal = false ; 
    this.dropdownPopoverShow = false ;
  }

  rejectAuthority() : void {
    this.rejectAuthorityForm.value.rejectedAuthorities.forEach((authority) => {
      if(authority.checked){
        this.roleService.rejectAuthority(this.rolename, authority.name).subscribe({
          next : (res : Role) => {
            console.log("res", res);
            this.toastr.success(`Authority ${authority.name} rejected successfully.`,'Success');
            this.closeRejectAuthorityModal()
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
