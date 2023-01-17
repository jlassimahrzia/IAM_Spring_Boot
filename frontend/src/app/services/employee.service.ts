import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Employee } from 'src/app/models/employee.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {


  constructor(private httpClient: HttpClient) { 
    
  }

  /** The Headers class can't be injected. You need to instantiate it by your own */
  getHeader() : HttpHeaders{
    let token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  getEmployees() : Observable<Employee[]>{
    return this.httpClient.get<Employee[]>(`${environment.SERVER_API_URL}/employee/list`, {headers : this.getHeader()})
  }

  deleteEmployee(id : Number) {
    return this.httpClient.delete(`${environment.SERVER_API_URL}/employee/delete/${id}`, { headers : this.getHeader() });
  }

  assignRole(username: String, roleName: String) : Observable<Employee> {
    return this.httpClient.put<Employee>(`${environment.SERVER_API_URL}/employee/assignRole`, { username, roleName }, { headers : this.getHeader() });
  }

  loadUserData(username: String) : Observable<Employee> {
    return this.httpClient.get<Employee>(`${environment.SERVER_API_URL}/employee/loadUser/${username}`, { headers : this.getHeader() })
  }

  updateProfile(username : String , employee : Employee) : Observable<Employee> {
    let data = {
      oldUsername : username,
      username : employee.username,
      firstName : employee.firstName,
      lastName : employee.lastName
    }
    return this.httpClient.put<Employee>(`${environment.SERVER_API_URL}/employee/updateProfile`, data , { headers : this.getHeader() })
  }

  rejectRole(username: String, roleName: String) : Observable<Employee> {
    return this.httpClient.put<Employee>(`${environment.SERVER_API_URL}/employee/rejectRole`, { username, roleName }, { headers : this.getHeader() });
  }

}
