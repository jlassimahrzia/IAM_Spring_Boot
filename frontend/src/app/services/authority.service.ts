import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Authority } from 'src/app/models/authority.model';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthorityService {

  constructor(private httpClient: HttpClient) { }

  getHeader() : HttpHeaders{
    let token = localStorage.getItem('token')
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
    return headers;
  }

  getAuthorities() : Observable<Authority[]>{
    return this.httpClient.get<Authority[]>(`${environment.SERVER_API_URL}/authority/list`, {headers : this.getHeader()})
  }

  createAuthority(authority : Authority) : Observable<Authority> {
    return this.httpClient.post<Authority>(`${environment.SERVER_API_URL}/authority/save`, authority , {headers : this.getHeader()})
  }

  editAuthority(name : String , newValues : Authority) : Observable<Authority> {
    return this.httpClient.put<Authority>(`${environment.SERVER_API_URL}/authority/update`, { name , newValues },  {headers : this.getHeader()})
  }

  deleteAuthority(name : String) : Observable<any> {
    return this.httpClient.request('delete',`${environment.SERVER_API_URL}/authority/delete`, {headers : this.getHeader(), body: {name : name}})
  } 

}
