import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.page.html',
  styleUrls: ['./edit.page.scss'],
})
export class EditPage implements OnInit {
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
  fileData;

  constructor( router: Router,
               private loadingController: LoadingController,
               private authService: AuthenticationService,
               private http: HttpClient)
  {
    this.router = router;
  }

  async ngOnInit() {
    this.token = localStorage.getItem('token');
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.getUser({token: this.token}).subscribe(
      async (res) => {
        this.id_user = res[0];
        this.img = res[1].replace('https', 'http');
        this.family = res[2];
        this.vk = res[3];
        this.birthday = '';
        this.phonenumber = res[5];
        this.user = res[6];
        this.skype = res[7];
        this.login = res[8];
        this.profile = [this.token, this.id_user, this.img, this.family, this.vk,
          this.birthday, this.phonenumber, this.user, this.skype, this.login];
        await loading.dismiss();
      }
    );
  }

  async pushEdits() {
    this.authService.pushEdits({token: this.token, nameuser: this.user, family: this.family, birthday:
    this.birthday, phonenumber: this.phonenumber, vk: this.vk, skype: this.skype}).subscribe(
      async (res) => {
        if (res === 'yes') {
          this.back();
        }
        }
    );
  }

  fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0].base64;
  }
  onClickSubmit() {
    const formData = new FormData();
    const base64Image = this.fileData;
    formData.append('token', localStorage.getItem('token'));
    formData.append('img', base64Image);
    console.log(base64Image, formData);
    this.http.post('http://studentapi.myknitu.ru/updateuserimage/', formData)
      .subscribe();
  }

  async back() {
    await this.router.navigateByUrl('/tabs', {replaceUrl: true});
  }
}
