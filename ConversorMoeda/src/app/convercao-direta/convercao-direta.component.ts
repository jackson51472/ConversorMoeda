import { Component, OnInit } from '@angular/core';
import { ConvercaoDiretaService } from './convercao-direta.service';

@Component({
  selector: 'app-convercao-direta',
  templateUrl: './convercao-direta.component.html',
  styleUrls: ['./convercao-direta.component.scss']
})
export class ConvercaoDiretaComponent implements OnInit {
  moedasDisponiveis: string[] = [];
  moedasFiltradasOrigem: string[] = [];
  moedasFiltradasDestino: string[] = [];

  moedaOrigem: string = '';
  moedaDestino: string = '';
  valor: number = 0;
  resultado: number | null = null;
  isError: boolean = false;

  constructor(private convercaoService: ConvercaoDiretaService) {}

  ngOnInit(): void {
    this.convercaoService.listarConversao().subscribe({
      next: (res) => {
        this.moedasDisponiveis = Object.keys(res.conversion_rates);
        this.moedasFiltradasOrigem = this.moedasDisponiveis;
        this.moedasFiltradasDestino = this.moedasDisponiveis;
      },
      error: () => {
        this.isError = true;
      }
    });
  }

  filtrarMoedasOrigem(valor: string): void {
    this.moedasFiltradasOrigem = this.moedasDisponiveis.filter((moeda) =>
      moeda.toLowerCase().includes(valor.toLowerCase())
    );
  }

  filtrarMoedasDestino(valor: string): void {
    this.moedasFiltradasDestino = this.moedasDisponiveis.filter((moeda) =>
      moeda.toLowerCase().includes(valor.toLowerCase())
    );
  }

  converterMoeda(): void {
    if (this.moedaOrigem && this.moedaDestino && this.valor > 0) {
      this.convercaoService.converterPar(this.moedaOrigem, this.moedaDestino, this.valor).subscribe({
        next: (res) => {
          this.resultado = res.conversion_result;
          this.isError = false;
  
          // Criação do objeto de conversão
          const novaConversao = {
            moedaOrigem: this.moedaOrigem,
            moedaDestino: this.moedaDestino,
            valor: this.valor,
            resultado: this.resultado,
            data: new Date().toISOString(),
          };
  
          // Adicionando ao histórico no localStorage
          const historicoString = localStorage.getItem('historicoConversoes');
          const historico = historicoString ? JSON.parse(historicoString) : [];
          historico.push(novaConversao);
          localStorage.setItem('historicoConversoes', JSON.stringify(historico));
        },
        error: () => {
          this.isError = true;
        }
      });
    } else {
      this.isError = true;
    }
  }
}
