import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastService } from '../services/toast.service'
import { Observable } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public sicaklik: number = 0;
  public sicaklikDegeri: number;
  

  constructor(private http: HttpClient, private toastService: ToastService) {
    setInterval(function(){ this.http.get('https://api.thingspeak.com/channels/900937/fields/1.json?api_key=S4UIBKE3X1YRJN79&results=1').subscribe(data => {
      console.log(data.feeds[0].field1)
      this.sicaklik = data.feeds[0].field1
    }) }.bind(this), 3000);
  }

  sicaklikAyarla() {
    let kontrolDeger;
    if (this.sicaklikDegeri > 0) 
    {
      kontrolDeger = setInterval(function(){ this.http.get('https://api.thingspeak.com/update?api_key=4IWBY0HE7STLP00M&field2=' + this.sicaklikDegeri).subscribe(data => {
        console.log(data)  
        if(data > 0)
        {
          clearInterval(kontrolDeger)
        }
      }) }.bind(this), 500);
    }
    else {
      this.toastService.error('Lütfen bir sıcaklık değeri giriniz.')
    }

  }

  setSicaklik()
  {
    return this.http.get('https://api.thingspeak.com/update?api_key=4IWBY0HE7STLP00M&field2=' + this.sicaklikDegeri).pipe();
  }
  // this.http.get<any>('https://api.thingspeak.com/channels/900937/fields/1.json?api_key=S4UIBKE3X1YRJN79&results=1').subscribe(
  //     (data) => {
  //       this.sicaklik = data.feeds[0].field1
  //     }
  //   )
}
