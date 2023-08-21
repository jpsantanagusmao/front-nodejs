import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rater',
  templateUrl: './rater.component.html',
  styleUrls: ['./rater.component.css']
})
export class RaterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.view()
  }
  view() {
    const conteudo = document.getElementById('printable').innerHTML,
      tela_impressao = window.open('about:blank');

    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    tela_impressao.window.close();
  }
} 
