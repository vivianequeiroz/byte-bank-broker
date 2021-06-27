import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpCliete: HttpClient) { }

  getAcoes() {
    return this.httpCliete
      .get<any>('http://localhost:3000/acoes')
      .pipe(
        tap((valor) => console.log(valor)),
        // map((api) => api.payload), pluck operator receive a string with the name o the property we need to extract
        pluck('payload'),
        map((acoes) => 
          acoes.sort((acaoA: Acao, acaoB: Acao) => this.ordenaPorCodigo(acaoA, acaoB))
        )
      );
  }

  private ordenaPorCodigo(acaoA: Acao, acaoB: Acao) {
    if(acaoA.codigo > acaoB.codigo) {
      return 1;
    }

    if(acaoA.codigo < acaoB.codigo) {
      return -1;
    }

    return 0;
  }
}
