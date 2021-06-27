import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Acoes } from './modelo/acoes';
import { AcoesService } from './acoes.service';
import { Observable } from 'rxjs';
import { debounceTime, filter, startWith, switchMap, tap } from 'rxjs/operators';

const ESPERA_DIGITACAO = 300;
@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css'],
})
export class AcoesComponent {
  acoesInput = new FormControl();
  todasAcoes$ = this.acoesService.getAcoes().pipe(
    tap(() => { 
      console.log('Fluxo inicial')
    })
  );

  filtroPeloInput$ = this.acoesInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(() => { 
      console.log('Fluxo do filtro')
    }),
    tap(console.log),
    filter(
      (valorDigitado) => valorDigitado.length >= 3 || !valorDigitado.length
    ),
    switchMap((valorDigitado) => this.acoesService.getAcoes(valorDigitado))
  );

  acoes$: Observable<Acoes> = this.acoesInput.valueChanges
    .pipe(
      startWith('')
    )
    .pipe(
      switchMap((valorDigitado: string) =>
        this.acoesService.getAcoes(valorDigitado)
      )
    );

  constructor(private acoesService: AcoesService) {}

}
// $ in a variable's name is a coding conventions for indicating an observable