import { EstadoBr } from './../model/estado-br';
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
}
