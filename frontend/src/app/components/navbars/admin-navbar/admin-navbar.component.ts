import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from 'src/app/services/jwt.service';
import { Employee } from "src/app/models/employee.model";
import { EmployeeService } from 'src/app/services/employee.service';
import { Token } from "src/app/models/token.model";

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {

  user : Employee ;

  constructor(private router: Router,
    private jwtService: JwtService,
    private employeeService : EmployeeService) { 
    
  }

  ngOnInit(): void {
    this.getUserInformation()
  }

  getUserInformation() : void {
    let tokendecode : Token = this.jwtService.DecodeToken() ;
    this.employeeService.loadUserData(tokendecode.sub).subscribe({
      next : (res : Employee) => {
        this.user = res ;
      },
      error: err => {
        console.log("err", err);
      }
    })  
  }

  ngOnChanges(): void {
    console.log(this.router.routerState.snapshot.url);
  }


}
