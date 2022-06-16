import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'client-angular';
  existUrl = false;

  constructor(private router: Router, location: Location) {
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (
          event.url === '/not-found' ||
          location.path().endsWith('not-found')
        ) {
          this.existUrl = false;
        } else {
          this.existUrl = true;
        }
      }
    });
  }
}
