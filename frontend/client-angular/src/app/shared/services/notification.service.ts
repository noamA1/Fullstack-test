import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'center',
    verticalPosition: 'top',
  };

  showSnackBar(msg: String, className: String) {
    this.config['panelClass'] = [`${className}`];
    this.snackBar.open(`${msg}`, undefined, this.config);
  }

  constructor(public snackBar: MatSnackBar) {}
}
