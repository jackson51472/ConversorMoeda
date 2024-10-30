// src/app/convercao-direta/convercao-direta.component.ts
import { Component, OnInit } from '@angular/core';
import axios from 'axios';

export interface Moeda {
  simbolo: string;
  nome: string;
}

@Component({
  selector: 'app-lista-moedas',
  templateUrl: './lista-moedas.component.html',
  styleUrl: './lista-moedas.component.scss'
})
export class ListaMoedasComponent implements OnInit {
  moedas: Moeda[] = [];

  async ngOnInit() {
    try {
      const response = await axios.get(
        'https://v6.exchangerate-api.com/v6/102defccc55bf1660526335b/codes'
      );
      this.moedas = response.data.supported_codes.map(
        (codigo: [string, string]) => ({
          simbolo: codigo[0],
          nome: codigo[1],
        })
      );
    } catch (error) {
      console.error('Erro ao buscar moedas:', error);
    }
  }
}
