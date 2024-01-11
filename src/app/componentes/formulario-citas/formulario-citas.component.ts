import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CitasService } from 'src/app/servicios/citas.service';
import { Cita } from 'src/app/modelo/cita';
import { addIcons } from 'ionicons';
import { addOutline } from 'ionicons/icons';
import { IonList, IonText, IonCard, IonCardContent, IonCardSubtitle, IonItem, IonInput, IonButton, IonLabel, IonIcon }  from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-citas',
  templateUrl: './formulario-citas.component.html',
  styleUrls: ['./formulario-citas.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, IonList, IonText, IonCard, IonCardContent, IonCardSubtitle, IonItem, IonInput, IonButton, IonLabel, IonIcon],
})

export class FormularioCitasComponent  implements OnInit {

  @Output() onCitaAgregada = new EventEmitter<Cita>();

  nuevaCita: Cita = { frase: '', autor: '' };

  constructor(private citaService: CitasService) { 
    addIcons({
      addOutline
    })
  }

  ngOnInit() {
  }

  async onClick() {
    await this.citaService.agregarCita(this.nuevaCita);
    this.onCitaAgregada.emit(this.nuevaCita);  
    this.nuevaCita = { frase: '', autor: '' };
  }
}
