import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.scss']
})
export class HistoricoComponent implements OnInit {
  historico: any[] = [];

  ngOnInit(): void {
    const historicoString = localStorage.getItem('historicoConversoes');
    this.historico = historicoString ? JSON.parse(historicoString) : [];
  }

  limparHistorico(): void {
    localStorage.removeItem('historicoConversoes');
    this.historico = [];
  }
}
