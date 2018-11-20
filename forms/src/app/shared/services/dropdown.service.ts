import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  url = 'assets/dados/estadobr.json';
  constructor(private http: HttpClient) {}
  getEstadoBr() {
    return this.http.get(this.url);
  }

  getCargos(){
  return [
    {nome:'Dev', nivel:'Junior', desc:'Dev Jr' },
    {nome:'Dev', nivel:'Pleno', desc:'Dev Pl' },
    {nome:'Dev', nivel:'Senior', desc:'Dev Sr' }
  ]

  }



}