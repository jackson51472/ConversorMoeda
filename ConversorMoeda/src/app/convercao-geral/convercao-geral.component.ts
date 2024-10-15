import { Component, OnInit } from '@angular/core';
import { ConvercaogeralService } from './convercao-geral.service';

@Component({
  selector: 'app-convercao-geral',
  templateUrl: './convercao-geral.component.html',
  styleUrls: ['./convercao-geral.component.scss']
})
export class ConvercaoGeralComponent implements OnInit {
  moedas: any[] = []; // Definido como array
  displayedColumns: string[] = ['moeda', 'valor']; // Colunas da tabela

  constructor(private moedaService: ConvercaogeralService) {}

  ngOnInit(): void {
    this.moedaService.listarConversao().subscribe({
      next: (res) => {
        // Assumindo que `conversion_rates` é um objeto e convertendo para um array
        this.moedas = Object.entries(res.conversion_rates).map(([nome, valor]) => ({ nome, valor }));
      },
      error: () => {
        console.error('Erro ao carregar as moedas.');
      }
    });
  }
}
