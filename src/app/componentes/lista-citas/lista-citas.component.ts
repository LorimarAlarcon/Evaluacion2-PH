import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { CitasService } from 'src/app/servicios/citas.service';
import { Cita } from 'src/app/modelo/cita';
import { CommonModule } from '@angular/common';
import { IonText, IonCol, IonRow, IonGrid, IonList, IonItem, IonButton, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-lista-citas',
  templateUrl: './lista-citas.component.html',
  styleUrls: ['./lista-citas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonText, IonCol, IonRow, IonGrid, IonList, IonItem, IonButton, IonIcon ]
})
export class ListaCitasComponent  implements OnInit {

  @Input() citas: Cita[] = [];

  @Output() citaEliminada = new EventEmitter<number>();

  constructor(
    private citasService: CitasService
  ) {
    addIcons({
      trashOutline
    })
  }

  async ngOnInit() {
    await this.citasService.iniciarPlugin()
    await this._actualizar()
  }

  async _actualizar() {
    this.citas = await this.citasService.obtenerTodasLasCitas()
  }
    
}
