import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CalculoService } from 'src/app/calculo.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  name: string = '';
  lastname: string = '';
  birthday: string = '';
  message: string;
  


  constructor(
    private calculoService: CalculoService,
    private toastController: ToastController,
    private router: Router,
  ) {
    this.message = 'Bienvenido!'
  }

  

  ngOnInit() {
  }

  goToStore() {
    this.calculoService.setUserData({
      name: this.name,
      lastname: this.lastname,
      birthday: this.birthday
    });
  }

  validateForm(){
    console.log("ejecutando validacion")

    if (this.name == '' || this.lastname == '' || this.birthday == '') {
      this.generateMessage('Rellene el Formulario correctamente', 'danger');
      
    } else {
      this.generateMessage('Formulario Correcto', 'success');
      let extras: NavigationExtras = {
        state: { name: this.name,
          lastname: this.lastname,
          birthday: this.birthday }
      }
      this.router.navigate(['/store'], extras);
      this.goToStore();
    }
  }

  async generateMessage(message: string, color: string){
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }

  clean(){
    this.name = '';
    this.lastname = '';
    this.birthday = '';
  }

  
  
}
