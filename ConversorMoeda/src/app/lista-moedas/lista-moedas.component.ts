import { Component, OnInit, ViewChild } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

export interface Moeda {
  simbolo: string;
  nome: string;
  pais: string;
  bandeira: string;
}

@Component({
  selector: 'app-lista-moedas',
  templateUrl: './lista-moedas.component.html',
  styleUrl: './lista-moedas.component.scss'
})
export class ListaMoedasComponent implements OnInit {
  displayedColumns: string[] = ['bandeira', 'pais', 'simbolo', 'nome'];
  dataSource = new MatTableDataSource<Moeda>([]);

  @ViewChild(MatSort) sort!: MatSort;

  async ngOnInit() {
    try {
      const response: AxiosResponse<any> = await axios.get(
        'https://v6.exchangerate-api.com/v6/102defccc55bf1660526335b/codes'
      );
      const moedasAPI = response.data.supported_codes;

      const paisesResponse: AxiosResponse<any> = await axios.get(
        'https://restcountries.com/v3.1/all'
      );
      const paises = paisesResponse.data;

      const moedas = moedasAPI.map((codigo: [string, string]) => {
        const pais = paises.find((p: any) =>
          p.currencies && p.currencies[codigo[0]]
        );
        return {
          simbolo: codigo[0],
          nome: codigo[1],
          pais: pais ? pais.name.common : 'Desconhecido',
          bandeira: pais ? pais.flags.png : '',
        };
      });

      this.dataSource.data = moedas;
      this.dataSource.sort = this.sort;
    } catch (error) {
      console.error('Erro ao buscar moedas ou bandeiras:', error);
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
