import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pnae2023-rater',
  templateUrl: './pnae2023-rater.component.html',
  styleUrls: ['./pnae2023-rater.component.css']
})
export class Pnae2023RaterComponent implements OnInit {

  @ViewChild('rater', {static: false}) el!: ElementRef;

  agricultor = 'Onésio Paulo de Sousa';
  cpfaf = '390.930.506.72';
  dap = 'MDSLFKJSFHSDJDHFDJH';
  municipio = 'Tarumirim/MG';
  numvisita = '4';
  data = '18/08/2023';
  extensionista = 'João Paulo Santana Gusmão';
  matricula = '10639-7';

  assunto = 'Manejo integrado de pragas';
  situacao = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum at, eum quidem veritatis maxime dignissimos cumque pariatur ab magni explicabo a deserunt cupiditate dolores provident sint fuga ducimus aperiam nam!';
  orientacao = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum at, eum quidem veritatis maxime dignissimos cumque pariatur ab magni explicabo a deserunt cupiditate dolores provident sint fuga ducimus aperiam nam!';
  recomendacao = 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolorum at, eum quidem veritatis maxime dignissimos cumque pariatur ab magni explicabo a deserunt cupiditate dolores provident sint fuga ducimus aperiam nam!';

  FILE_NAME = 'Relatorio - ' + this.agricultor + ' - Visita ' + this.numvisita;

  constructor() { }

  ngOnInit(): void {

    this._print()
    
  }
  
  _print() {
    const doc = new jsPDF('p', 'pt', 'a4');
    doc.html(this.el.nativeElement, {
      callback: (doc)=>{
        doc.save(`${this.FILE_NAME}.pdf`); // will save the file in the current working directory
      }
    });

  }
}
