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
}
