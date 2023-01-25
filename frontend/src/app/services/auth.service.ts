import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Employee } from "src/app/models/employee.model";
import { environment } from "src/environments/environment";
import { Credentials } from "src/app/models/credentials.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient : HttpClient) { }

  login(credentials: Credentials) : Observable<any> {
    return this.httpClient.post<any>('http://localhost:8080/login', credentials, {observe: 'response'});
  }

  register(employee : Employee) : Observable<Employee> {
    console.log("from service", employee);
    
    return  this.httpClient.post<Employee>(`${environment.SERVER_API_URL}/employee/save`, employee);
  }

  logOut() : void {
    localStorage.clear();
  }

  

}
