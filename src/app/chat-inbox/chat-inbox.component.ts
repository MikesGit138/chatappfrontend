import { Component, OnInit } from '@angular/core';
import io from 'socket.io-client';

const SOCKET_ENDPOINT = 'localhost:3000';

@Component({
  selector: 'app-chat-inbox',
  templateUrl: './chat-inbox.component.html',
  styleUrls: ['./chat-inbox.component.scss']
})
export class ChatInboxComponent implements OnInit {
  myId; 
  socket;
  message: string;
  messageList = [];

  constructor() { }

  ngOnInit() {
    this.setupSocketConnection();
    this.socket = io(SOCKET_ENDPOINT);
    this.socket.on("connect",()=>{
      console.log(this)
      this.myId = this.socket.id
      console.log(this.myId)
    })
    this.socket.on('message-broadcast', (data) => {
    
      console.log(data)
    if (data) {
      // let dataObj = {
      //   id : this.socket.id,
      //   message :data
      // }
      this.messageList.push(data)
      }
   });
  }

  setupSocketConnection() {
    
 }

 sendMessage() {
   if(this.message !== ''){
  this.socket.emit('message', this.message);
  // this.messageList.push(this.message)
  //messsage test
// console.log(this.messageList)
  this.message = '';
   }
}
}
