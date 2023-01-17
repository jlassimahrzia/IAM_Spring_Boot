import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Role } from 'src/app/models/role.model';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})

export class RoleService {

  constructor(private httpClient: HttpClient) { }

  getHeader() : HttpHeaders{
    let token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  getRoles() : Observable<Role[]>{
    return this.httpClient.get<Role[]>(`${environment.SERVER_API_URL}/role/list`, {headers : this.getHeader()})
  }

  createRole(role : Role) : Observable<Role> {
    return this.httpClient.post<Role>(`${environment.SERVER_API_URL}/role/save`, role , {headers : this.getHeader()})
  }

  assignAuthority(roleName : String , authorityName : String) : Observable<Role> {
    return this.httpClient.put<Role>(`${environment.SERVER_API_URL}/role/assignAuthority`, {roleName , authorityName},  {headers : this.getHeader()})
  }

  editRole(name : String , newValues : Role) : Observable<Role> {
    return this.httpClient.put<Role>(`${environment.SERVER_API_URL}/role/update`, { name , newValues },  {headers : this.getHeader()})
  }

  deleteRole(name : String) : Observable<any> {
    return this.httpClient.request('delete',`${environment.SERVER_API_URL}/role/delete`, {headers : this.getHeader(), body: {name : name}})
  } 

  rejectAuthority(roleName: String, authorityName: String) : Observable<Role> {
    return this.httpClient.put<Role>(`${environment.SERVER_API_URL}/role/rejectAuthority`, { roleName, authorityName }, { headers : this.getHeader() });
  }


}
