import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { UserModel } from '../models/UserModel';
import { JwtResponse } from '../models/jwt-response.model';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

  @Injectable({
    providedIn: 'root'
  })

export class AuthService {
    readonly rootUrl = environment.apiUrl + 'auth';

    constructor(private http: HttpClient) {}

    register(userModel: UserModel): Observable<UserModel> {
        return this.http.post<UserModel>(this.rootUrl + '/register', JSON.stringify(userModel), httpOptions);
    }

    login(userModel: UserModel): Observable<JwtResponse> {
        return this.http.post<JwtResponse>(this.rootUrl + '/authenticate', JSON.stringify(userModel), httpOptions);
    }

    changePassword(userModel: UserModel): Observable<UserModel> {
      return this.http.post<UserModel>(this.rootUrl + '/changePassword', JSON.stringify(userModel), httpOptions);
  }
}
