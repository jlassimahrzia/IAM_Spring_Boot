import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Employee } from 'src/app/models/employee.model';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {


  constructor(private httpClient: HttpClient) {

  }

  /** The Headers class can't be injected. You need to instantiate it by your own */
  getHeader(): HttpHeaders {
    let token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${environment.SERVER_API_URL}/employee/list`, { headers: this.getHeader() })
  }

  deleteEmployee(id: Number) {
    return this.httpClient.delete(`${environment.SERVER_API_URL}/employee/delete/${id}`, { headers: this.getHeader() });
  }

  assignRole(username: String, roleName: String): Observable<Employee> {
    return this.httpClient.put<Employee>(`${environment.SERVER_API_URL}/employee/assignRole`, { username, roleName }, { headers: this.getHeader() });
  }

  loadUserData(username: String): Observable<Employee> {
    return this.httpClient.get<Employee>(`${environment.SERVER_API_URL}/employee/loadUser/${username}`, { headers: this.getHeader() })
  }

  updateProfile(username: String, employee: Employee): Observable<Employee> {
    let data = {
      oldUsername: username,
      username: employee.username,
      firstName: employee.firstName,
      lastName: employee.lastName
    }
    return this.httpClient.put<Employee>(`${environment.SERVER_API_URL}/employee/updateProfile`, data, { headers: this.getHeader() })
  }

  rejectRole(username: String, roleName: String): Observable<Employee> {
    return this.httpClient.put<Employee>(`${environment.SERVER_API_URL}/employee/rejectRole`, { username, roleName }, { headers: this.getHeader() });
  }

  uploadImage(file: File): Observable<string> {
    const data: FormData = new FormData();
    data.append('file', file);
    return this.httpClient.post<string>(`${environment.SERVER_API_URL}/employee/saveimage`, data).pipe(
      map((result) => result), catchError(err => throwError(err))
    );
  }

  getImage(imagename : string):Observable<any> { 
    return this.httpClient.get<any>(`${environment.SERVER_API_URL}/employee/image/${imagename}`).pipe( map((response : any)  =>  { return response;}), catchError(err => throwError(err)));
  }

  changeImage(username: string , newImage: string){
    console.log({username, newImage} );
    
    return this.httpClient.put<Employee>(`${environment.SERVER_API_URL}/employee/changeProfileImage`, {username, newImage} , { headers: this.getHeader() })
  }

}
