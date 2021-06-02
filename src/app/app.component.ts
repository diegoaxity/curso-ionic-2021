import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  loading = false;

  constructor(private dataService: DataService, private toast: ToastController) {
    this.dataService.isLoading.asObservable().subscribe(loading => {
      this.loading = loading;
    });

    this.dataService.message.asObservable().subscribe(msg => {
      this.presentToast(msg);
    });
  }

  async presentToast(message: string) {
    const toastMsg = await this.toast.create({
      message,
      duration: 3000
    });

    toastMsg.present();
  }
}
