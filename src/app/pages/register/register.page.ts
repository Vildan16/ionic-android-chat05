import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {AuthenticationService} from '../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
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

  async register() {
    const loading = await this.loadingController.create();
    await loading.present();

    this.authService.register(this.credentials.value).subscribe(
      async () => {
        await loading.dismiss();
        await this.router.navigateByUrl('/login', {replaceUrl: true});
      },
      async () => {
        await loading.dismiss();
        const alert = await this.alertController.create({
          header: 'User already registered',
          buttons: ['OK'],
        });
        await alert.present();
        await this.router.navigateByUrl('/register', {replaceUrl: true});
      }
    );
  }

  // Easy access for form fields
  get name() {
    return this.credentials.get('name');
  }

  get password() {
    return this.credentials.get('password');
  }

  back() {
    this.router.navigateByUrl('/login').then();
  }
}
