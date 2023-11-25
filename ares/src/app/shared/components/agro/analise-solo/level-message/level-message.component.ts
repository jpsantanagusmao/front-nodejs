import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'level-message',
  templateUrl: './level-message.component.html',
  styleUrls: ['./level-message.component.css']
})
export class LevelMessageComponent implements OnInit {

  @Input('levelMessage') levelMessage: string;

  constructor() { }

  ngOnInit(): void {
  }

}
