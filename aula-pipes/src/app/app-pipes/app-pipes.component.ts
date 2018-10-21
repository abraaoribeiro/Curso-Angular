import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-app-pipes',
  templateUrl: './app-pipes.component.html',
  styleUrls: ['./app-pipes.component.css']
})
export class AppPipesComponent implements OnInit {

    livro: any = {
    titulo: 'Java',
    preco: 123
  }
  constructor() { }

  ngOnInit() {
  }

}
