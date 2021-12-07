import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessagesComponent } from '../messages/messages.component';


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public message: string;

  constructor(private snackBar: MatSnackBar) { }

  addMessage(message: string): void {
    this.message = message;
    this.snackBar.openFromComponent(MessagesComponent, {
      duration: 5000,
    });
  }
  clear(): void {
    // this.messages ;
  }
}
