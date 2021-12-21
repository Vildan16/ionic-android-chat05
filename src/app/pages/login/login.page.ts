import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  token='';

  constructor(
    private fb: FormBuilder,
    private alertController: AlertController,
    private authService: AuthenticationService,
    private router: Router,
    private loadingController: LoadingController,
  ) {}

  ngOnInit() {
    this.credentials = this.fb.group({
      login: [''],
      password: ['']
    });

  }

  function(message) {
    console.log(message);
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        await loading.dismiss();
        this.token = res;
        localStorage.setItem('token', this.token);
        await this.router.navigateByUrl('/tabs', {replaceUrl: true, state: {token: this.token}});
      },
      async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'Login failed',
          buttons: ['OK'],
        });
        await alert.present();
      }
    );
  }

  toRegister() {
    this.router.navigateByUrl('/register').then(r => {});
  }



  // Easy access for form fields
  get name() {
    return this.credentials.get('name');
  }

  get password() {
    return this.credentials.get('password');
  }
}
