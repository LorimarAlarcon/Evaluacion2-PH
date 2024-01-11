import { Component, OnInit, Input } from '@angular/core';
import { CitasService } from 'src/app/servicios/citas.service';
import { Cita } from 'src/app/modelo/cita';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { IonText, IonContent, IonCard, IonCardContent, IonLabel } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-citas',
  templateUrl: './app-citas.component.html',
  styleUrls: ['./app-citas.component.scss'],
  standalone: true,
  imports: [CommonModule, IonText, IonContent, IonCard, IonCardContent, IonLabel]
})
export class AppCitasComponent  implements OnInit {

  @Input() citaAleatoria: Cita | null = null;
  @Input() borrarCitasEnInicio: boolean = false;

  constructor( 
    private citaService: CitasService,
    private configuracionService: ConfiguracionService
  ) { }

  async ngOnInit() {
    this.borrarCitasEnInicio = await this.configuracionService.borrarCitasInicio();
    this.obtenerCitaAleatoria();
  }

  async obtenerCitaAleatoria(): Promise<void> {
    if (this.borrarCitasEnInicio) {
      this.citaAleatoria = null;
    } else {
      this.citaAleatoria = await this.citaService.obtenerCitaAleatoria();
    }
  }
}

