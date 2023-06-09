import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = 'http://localhost:3000/api'
  private users: User[] = [];
  constructor(private http: HttpClient) { }

  addUser(user: User): Observable<any> {
    return this.http.post(`${this.baseUrl}/persons`, user);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/persons`);
  }
}
