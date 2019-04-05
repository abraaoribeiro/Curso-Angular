import { Cidade } from './../models/cidade';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root"
})
export class DropdownService {
  urlEstado = "assets/dados/estadobr.json";
  constructor(private http: HttpClient) { }
  getEstadoBr() {
    return this.http.get(this.urlEstado);
  }
  getCidades(idEstado: number) {
    return this.http.get<Cidade[]>('assets/dados/cidades.json').pipe(
      map((cidades:Cidade[])=> cidades.filter(c => c.estado == idEstado))
    );
  }
  getCargos() {
    return [
      { nome: "Dev", nivel: "Junior", desc: "Dev Jr" },
      { nome: "Dev", nivel: "Pleno", desc: "Dev Pl" },
      { nome: "Dev", nivel: "Senior", desc: "Dev Sr" }
    ];
  }

  getTecnologia() {
    return [
      { nome: "java", desc: "Java" },
      { nome: "javascript", desc: "JavaScript" },
      { nome: "ruby", desc: "Ruby" }
    ];
  }
  getNewsletter() {
    return [{ valor: "s", desc: "Sim" },
    { valor: "n", desc: "Não" }];
  }


}
