import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page implements OnInit{
  router: Router;
  token = '';
  profile = {};
  // eslint-disable-next-line @typescript-eslint/naming-convention
  id_user;
  img;
  family;
  vk;
  birthday;
  phonenumber;
  user;
  skype;
  login;

  constructor( router: Router,
               private loadingController: LoadingController,
               private authService: AuthenticationService)
   {
     this.router = router;
   }

  async ngOnInit() {
    this.token = this.router.getCurrentNavigation().extras.state.token;
    localStorage.setItem('token', this.token);
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.getUser({token: this.token}).subscribe(
      async (res) => {
        this.id_user = res[0];
        this.img = res[1].replace('https', 'http');
        this.family = res[2];
        this.vk = res[3];
        this.birthday = res[4];
        this.phonenumber = res[5];
        this.user = res[6];
        this.skype = res[7];
        this.login = res[8];
        this.profile = [this.token, this.id_user, this.img, this.family, this.vk,
          this.birthday, this.phonenumber, this.user, this.skype, this.login];
        localStorage.setItem('id', this.id_user);
        localStorage.setItem('login', this.login);
        await loading.dismiss();
      }
    );
  }

  async editProfile() {
    console.log(this.profile);
    await this.router.navigateByUrl('/edit', {replaceUrl: true, state: {profile: this.profile}});
  }

  async logout() {
    await this.router.navigateByUrl('/login', {replaceUrl: true});
  }
}
