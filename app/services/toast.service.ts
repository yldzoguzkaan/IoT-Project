import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';  

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async success(message:string)
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'success'
    });
    toast.present();
  }

  async error(message:string)
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger'
    });
    toast.present();
  }

  async warning(message:string)
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'warning'
    });
    toast.present();
  }

  async default(message:string, color:string = 'dark')
  {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}
