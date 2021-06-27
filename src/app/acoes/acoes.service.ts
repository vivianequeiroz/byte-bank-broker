import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpCliete: HttpClient) { }

  getAcoes() {
    return this.httpCliete.get<any>('http://localhost:3000/acoes');
  }
}
