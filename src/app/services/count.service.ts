import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CountService {
  private httpParams = { headers: null };
  apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  getCount() {
    return this.http.get<number>(`${this.apiURL}/count`, this.getHttpParams());
  }

  getIncrement() {
    return this.http.put<number>(
      `${this.apiURL}/increment`,
      {},
      this.getHttpParams()
    );
  }

  getStartCount() {
    return this.http.get<number>(
      `${this.apiURL}/startCount`,
      this.getHttpParams()
    );
  }

  setValueToLocalStorage(key: string, value: string) {
    localStorage.setItem(key, value);
  }

  getValueFromLocalStorage(key: string): string {
    return localStorage.getItem(key);
  }

  public setHttpParams() {
    this.httpParams = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.getValueFromLocalStorage('token'),
      }),
    };
  }

  public getHttpParams() {
    if (!this.httpParams.headers) {
      this.setHttpParams();
    }

    return this.httpParams;
  }
}
