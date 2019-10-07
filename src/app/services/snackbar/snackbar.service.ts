import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})


export class SnackbarService {

  constructor(private snackBar: MatSnackBar) { }

  notify(msg: any, type: number) {

    let className = '';
    if (type === 1) {
      className = 'snack-success';
    }
    if (type === 2) {
      className = 'snack-error';
    }
    this.snackBar.open(msg, 'X', {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'end',
      panelClass: [className]
    });
  }
}
