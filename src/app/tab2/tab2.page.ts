import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})

export class Tab2Page implements OnInit{
  router: Router;
  token;
  login;
  users2;
  users = [];
  constructor(router: Router, private loadingController: LoadingController, private authService: AuthenticationService)
  {
    this.router = router;
  }

  ngOnInit() {
    this.token = localStorage.getItem('token');
    this.login = this.authService.getUser(this.token)[6];
  }

  async loadList() {
    const loading = await this.loadingController.create();
    await loading.present();

    await this.authService.loadList({token: this.token}).subscribe(
      async (res) => {
        this.users = res;
        await loading.dismiss();
      }
    );
  }

  chat(userto_) {
    this.router.navigateByUrl('/chatting', {replaceUrl: true, state: {userto: userto_, login: this.login}}).then();
  }

  search(){
    this.users = [this.users.find((x: any) => x.id == Number(this.users2))];
  }
}
