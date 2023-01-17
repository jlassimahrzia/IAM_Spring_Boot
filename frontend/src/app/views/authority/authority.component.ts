import { Component, OnInit } from '@angular/core';
import { AuthorityService } from "src/app/services/authority.service";
import { Authority } from "src/app/models/authority.model";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})

export class AuthorityComponent implements OnInit {

  authorities : Authority[];

  createAuthorityModal : Boolean = false ;
  createAuthorityForm : FormGroup = this.fb.group({
    authorityname: [ null , [Validators.required]]
  })

  editAuthorityModal : Boolean = false ;
  editAuthorityForm : FormGroup = this.fb.group({
    authorityname: [ null , [Validators.required]]
  })

  deleteAuthorityModal : Boolean = false ;

  authorityname : String ;

  searchText : string ;

  constructor(private authorityService: AuthorityService,
    private fb: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getAuthorityList()  
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

  /** Create Authority */

  openCreateAuthorityModal() : void {
    this.createAuthorityModal = true;
  }

  closeCreateAuthorityModal() : void {
    this.createAuthorityModal = false;
  }

  createAuthority() : void {
    this.authorityService.createAuthority({ authorityname : this.createAuthorityForm.value.authorityname}).subscribe({
      next : (res : Authority) => {
        console.log("res", res);
        this.toastr.success('Authority added successfully.','Success');
        this.createAuthorityForm.reset();
        this.closeCreateAuthorityModal();
        this.ngOnInit()
      },
      error: err => {
        console.log("err", err)
        this.toastr.error('Something went wrong!','Error')
      }
    })
  }

  /** Delete Authority */

  openDeleteAuthorityModal(authorityname : String) : void {
    this.authorityname = authorityname ;
    this.deleteAuthorityModal = true ;
  }

  closeDeleteAuthorityModal() : void {
    this.deleteAuthorityModal = false ;
  }

  deleteAuthority() : void {
    this.authorityService.deleteAuthority(this.authorityname).subscribe({
      next : (res : any) => {
        console.log("res", res);
        this.toastr.success('Authority deleted successfully.','Success');
        this.closeDeleteAuthorityModal()
        this.ngOnInit()
      },
      error: err => {
        console.log("err", err)
        this.toastr.error('Something went wrong!','Error')
      }
    })
  }

  /** Edit Authority */

  openEditAuthorityModal(authorityname : String) : void {
    this.authorityname = authorityname ;
    this.editAuthorityModal = true ;
  }

  closeEditAuthorityModal() : void {
    this.editAuthorityModal = false ;
  }

  editAuthority() : void {
    this.authorityService.editAuthority(this.authorityname, { authorityname : this.editAuthorityForm.value.authorityname}).subscribe({
      next : (res : Authority) => {
        console.log("res", res);
        this.toastr.success('Authority updated successfully.','Success');
        this.closeEditAuthorityModal()
        this.ngOnInit()
      },
      error: err => {
        console.log("err", err)
        this.toastr.error('Something went wrong!','Error')
      }
    })
  }


}
