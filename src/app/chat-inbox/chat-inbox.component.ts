import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {

  socket;
  message: string;
  messageList = ['test message', 'test message 2'];

  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
  }

  setupSocketConnection() {
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on('message-broadcast', (data: string) => {
    if (data) {
    this.messageList.push(data)
      }
   });
 }

 SendMessage() {
   if(this.message !== ''){
  this.socket.emit('message', this.message);
  this.messageList.push(this.message)

  //messsage test
console.log(this.messageList)
  this.message = '';
   }
}
}
