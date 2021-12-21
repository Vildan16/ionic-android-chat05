import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';


@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss']
})
export class Tab4Page {
  images;
  fileData;
  constructor(private http: HttpClient, private camera: Camera) {}
  // eslint-disable-next-line @typescript-eslint/member-ordering
  cameraImage: string;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  cameraOptions: CameraOptions = {
    quality: 20,
    destinationType: this.camera.DestinationType.DATA_URL,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  takeSnap() {
    this.camera.getPicture(this.cameraOptions).then((imageData) => {
      const base64Image = 'data:image/jpeg;base64,' + imageData;
      this.cameraImage = base64Image;
    }, (err) => {
      console.log(err);
    });
  }
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  ngOnInit() {
    this.refreshImages();
    this.cameraImage = '';
    this.fileData = '';
  }
  fileProgress(fileInput: any) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this.fileData = <File>fileInput.target.files[0];
  }
  onClickSubmit() {
    const formData = new FormData();
    formData.append('image', this.fileData, this.fileData.name);
    this.http.post('http://studentapi.myknitu.ru/send/', formData)
      .subscribe(() => this.refreshImages());
  }
  onClickSubmitBase64(data) {
    const formData = new FormData();
    formData.append('image', data.cameraImage);
    this.http.post('http://studentapi.myknitu.ru/send2/', formData)
      .subscribe(() => this.refreshImages());
  }
  refreshImages() {
    this.http.get('http://studentapi.myknitu.ru').subscribe(data => {
      // @ts-ignore
      this.images = data.images;
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data.images.forEach((element: { img: { toString: () => string } }) => element.img = element.img.toString().replace('https', 'http'));
    });
  }
}
