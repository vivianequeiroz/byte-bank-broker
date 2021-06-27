import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, pluck, tap } from 'rxjs/operators';
import { Acao, AcoesAPI } from './modelo/acoes';

@Injectable({
  providedIn: 'root'
})
export class AcoesService {

  constructor(private httpClient: HttpClient) { }

  getAcoes() {
    return this.httpClient
      .get<AcoesAPI>('http://localhost:3000/acoes')
      .pipe(
        tap((valor) => console.log(valor)), // doesn't interfere in the code, used to analyze values   
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
