import { ClientFormComponent } from './../client-form/client-form.component';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  // @ViewChild(ClientFormComponent) client: ClientFormComponent;

  // ngAfterViewInit() {
  //   console.log(this.client.whoAmI()); // I am a pup component!
  // }
}
