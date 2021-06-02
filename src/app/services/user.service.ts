import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SingleUserResponse, UserResponse } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<UserResponse> {
    return this.http.get<UserResponse>(`${environment.apiUrl}/users`);
  }

  getSingleUser(id: number): Observable<SingleUserResponse> {
    return this.http.get<SingleUserResponse>(`${environment.apiUrl}/users/${id}`);
  }
}
