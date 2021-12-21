import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';
import * as Centrifuge from 'centrifuge';

@Component({
  selector: 'app-chatting',
  templateUrl: './chatting.page.html',
  styleUrls: ['./chatting.page.scss'],
})
export class ChattingPage implements OnInit {
  token;
  id;
  userto;
  router;
  messages;
  login;
  message;

  constructor(router: Router,
              private loadingController: LoadingController,
              private authService: AuthenticationService)
  {
    this.router = router;
  }

  ngOnInit() {
    this.userto = this.router.getCurrentNavigation().extras.state.userto;
    this.login = this.router.getCurrentNavigation().extras.state.login;
    this.id = localStorage.getItem('id');
    this.login = localStorage.getItem('login');
    this.token = localStorage.getItem('token');
    this.authService.loadDialog({token: this.token, userto: this.userto}).subscribe(
      async (res) => {
        this.messages = res;
      }
    );

    const ws = 'wss://iswork.org/connection/websocket';
    let channel = 'b69179ad-42c3-4d30-b2d9-6a96e87b6777';
    const tokenWebsocket = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIifQ.X4MsvJa39igmm8_QNgs9Ix4SCv0IEgLP4aFcqUFadNs';

    const centrifuge = new Centrifuge(ws, {
      debug: true
    });
    channel = 'iswork:'+ channel;
    const subscription = centrifuge.subscribe(channel, message => {
      this.messages.push(message.data.event.message);
      console.log(message.data.event.message);
    });
    centrifuge.setToken(tokenWebsocket);
    subscription.on('subscribe', () => {
    });
    centrifuge.connect();
  }

  send() {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({token:'db1bc644-cb69-462c-a184-4212962b468c',
      channel:'b69179ad-42c3-4d30-b2d9-6a96e87b6777',message:{to_id: this.userto, message: this.message,
        datetime: new Date(), from_id: this.id}});

    const requestOptions: RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch('https://iswork.org/api/v1/send-message-channel/', requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));

  }
}
