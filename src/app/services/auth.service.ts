import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

interface login {
  accessToken: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<login>(`${this.apiURL}/login`, {
      email,
      password,
    });
  }
}
