import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import { Token } from "src/app/models/token.model";

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  DecodeToken(): Token {
    let token = localStorage.getItem('token');
    return jwt_decode(token) ;
  }

}
