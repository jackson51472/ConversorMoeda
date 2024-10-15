import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvercaoDiretaService {
  private apiKey = '102defccc55bf1660526335b'; // Substitua pela sua chave válida.
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}`;

  constructor(private http: HttpClient) {}

  listarConversao(): Observable<any> {
    const url = `${this.apiUrl}/latest/USD`; // Pega todas as moedas em relação ao USD.
    return this.http.get<any>(url);
  }

  converterPar(moedaOrigem: string, moedaDestino: string, valor: number): Observable<any> {
    const url = `${this.apiUrl}/pair/${moedaOrigem}/${moedaDestino}/${valor}`;
    return this.http.get<any>(url);
  }
}
