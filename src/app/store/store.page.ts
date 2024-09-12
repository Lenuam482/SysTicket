import { Component, ElementRef, OnInit, ViewChild, AfterViewInit, ViewChildren} from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CalculoService } from 'src/app/calculo.service';
import { AnimationController, IonCard } from '@ionic/angular';
import type { Animation } from '@ionic/angular';
import type { QueryList } from '@angular/core';


@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
})
export class StorePage implements OnInit, AfterViewInit {
  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  private animation!: Animation;

  name: string = '';
  lastname: string = '';
  eventoTipo: string = '';
  birthday: string = '';

  
  alertButtons: string[] = ['Ok']

  eventoTipos: Map<string, string> = new Map<string, string>();

  constructor(
    private animationCtrl: AnimationController,
    private calculoService: CalculoService,
    private alertController: AlertController,) { 
      this.eventoTipos.set("Cine","Ticket de Cine: $5.600");
      this.eventoTipos.set("Deporte","Ticket de Deporte: $3.900");
      this.eventoTipos.set("Evento","Ticket de Evento Informativo: $4.500 ");
      this.eventoTipos.set("Concierto","Ticket de Concierto: $80.000");
  }

  ngOnInit() {
    const userData = this.calculoService.getUserData();
    this.name = userData.name;
    this.lastname = userData.lastname;
    this.birthday = userData.birthday;
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0.2');
    this.animation.play();
  }

  precioEventos(){
    let precio: number = 0;
    let total: number = 0;
    const currentYear = new Date().getFullYear(); 
    let descuento: string = "Ninguno"; 
  
    if(this.birthday) {
      const birthYear = parseInt(this.birthday.split('-')[0]);
      const age = currentYear - birthYear;
  
      if(this.eventoTipo === "Cine") {
        precio = 5600;
      } else if(this.eventoTipo === "Deporte") {
        precio = 3900;
      } else if(this.eventoTipo === "Evento") {
        precio = 4500;
      } else if(this.eventoTipo === "Concierto") {
        precio = 80000;
      } else {
        this.generateMessage('Por favor, seleccione un evento válido');
        return;
      }
  
      if (age <= 18) {
        descuento = "10%";
        total = precio * 0.9;
      }else if(age >= 60){
        descuento = "20%";
        total =  precio * 0.8;
      }else{
        total = precio;
      }
      console.log('Total calculado:', total);
      
      const message = `
        Nombre y apellido: ${this.name} ${this.lastname} 
        Tipo ticket: ${this.eventoTipo} 
        Precio: $${precio.toFixed(2)} 
        Descuento: ${descuento} 
        Total: $${total.toFixed(2)}
      `;
  
      this.generateMessage(message,);
    } else {
      this.generateMessage('Por favor, ingrese su fecha de nacimiento.');
    }
  }
  

  async generateMessage(message: string){
    const fullMessage = `${message}`;
    const alert = await this.alertController.create({ 
      message: fullMessage,
      buttons: this.alertButtons,
    });
    await alert.present();
  }


}
