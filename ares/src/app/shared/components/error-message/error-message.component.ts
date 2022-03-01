import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {


  @Input('errorMessage') errorMessage: string;

  constructor() { }

  ngOnInit(): void {
    console.error(this.errorMessage);
  }

}