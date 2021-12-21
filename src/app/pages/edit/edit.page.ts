import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
  router: Router;
  token;
  users = [];
  constructor(router: Router, private loadingController: LoadingController, private authService: AuthenticationService)
  {
    this.router = router;
  }

  ngOnInit() {
    this.token = this.router.getCurrentNavigation().extras.state.profile[0];
  }

  async loadList() {
    console.log(this.token);
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.loadList({token: this.token}).subscribe(
      async (res) => {
        this.users = res;
        await loading.dismiss();
      }
    );
  }

}
