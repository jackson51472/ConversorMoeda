import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HistoricoService {
  private historico: any[] = [];

  adicionarConversao(conversao: any) {
    this.historico.push(conversao);
  }

  obterHistorico() {
    return this.historico;
  }

  limparHistorico() {
    this.historico = [];
  }
}
