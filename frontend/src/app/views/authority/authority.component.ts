import { Component, OnInit } from '@angular/core';
import { AuthorityService } from "src/app/services/authority.service";
import { Authority } from "src/app/models/authority.model";

@Component({
  selector: 'app-authority',
  templateUrl: './authority.component.html',
  styleUrls: ['./authority.component.css']
})
export class AuthorityComponent implements OnInit {

  authorities : Authority[];


  constructor(private authorityService: AuthorityService) { }

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

}
