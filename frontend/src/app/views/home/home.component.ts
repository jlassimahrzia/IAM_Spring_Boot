import { Component, OnInit } from '@angular/core';
import { Authority } from 'src/app/models/authority.model';
import { Employee } from 'src/app/models/employee.model';
import { Role } from 'src/app/models/role.model';
import { AuthorityService } from 'src/app/services/authority.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { RoleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  constructor(private employeeService : EmployeeService,
    private roleService : RoleService,
    private authorityService : AuthorityService) { }

  employeesNumber : Number ;
  rolesNumber : Number ;
  authoritiesNumber : Number ;

  roles : Role[] ;
  employees : Employee[] ;

  finalResult : any[] = [];

  ngOnInit(): void {
    this.getEmployeesNumber()
    this.getRolesNumber()
    this.getAuthorityNumber()
   
  }

  getEmployeesNumber() : void {
    this.employeeService.getEmployees().subscribe({
      next : (res: Employee[]) => {
        this.employeesNumber = res.length;
        this.employees = res ;
      },
      error: err => {
        console.log("err", err);
      }
    });
  }

  getRolesNumber() : void {
    this.roleService.getRoles().subscribe({
      next : (res: Role[]) => {
        this.rolesNumber = res.length;
        this.roles = res;
        this.setNumberOfEmployeesOfEachRole()
      },
      error: err => {
        console.log("err", err);
      }
    });
    
  }

  getAuthorityNumber() : void {
    this.authorityService.getAuthorities().subscribe({
      next : (res: Authority[]) => {
        this.authoritiesNumber = res.length;
      },
      error: err => {
        console.log("err", err);
      }
    });  
  }

  setNumberOfEmployeesOfEachRole() : void {
    let num : number;
    this.roles.forEach( (role : any) => {
      num = 0 ;
      this.employees.forEach(employee => {
          if(employee.roles.filter(roleEmp => roleEmp.id == role.id).length > 0){
            num = num + 1;
          }
      });
      this.finalResult.push({...role , num : num})
    });    
  }

}
