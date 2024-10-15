import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvercaogeralService {

  constructor(private http: HttpClient) { }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer' + environment.api_url + "pair/"
      })
    };
  }

  listarConversao(): Observable<any> {
  const url = environment.api_url + "latest/USD";
  return this.http.get<any>(url, this.getHeaders());
}

}
