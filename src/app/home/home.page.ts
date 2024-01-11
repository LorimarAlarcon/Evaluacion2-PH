import { Component } from '@angular/core';
import { IonLabel, IonFabButton, IonFab, IonCardContent, IonCard, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { settingsOutline, addCircle} from 'ionicons/icons';
import { CitasService } from '../servicios/citas.service';
import { Cita } from '../modelo/cita';
import { RouterModule } from '@angular/router';
import { ConfiguracionService } from '../servicios/configuracion.service';
import { CommonModule } from '@angular/common';
import { AppCitasComponent } from '../componentes/app-citas/app-citas.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [ AppCitasComponent, CommonModule, IonLabel, RouterModule, IonFabButton, IonFab, IonCardContent, IonCard, IonIcon, IonButton, IonButtons, IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {

  citaAleatoria: Cita | null = null;
  borrarCitasEnInicio: boolean = false;

  constructor(
    private citaService: CitasService,
    private configuracionService: ConfiguracionService) 
    {
    addIcons({
      settingsOutline,
      addCircle
    })
  }

  async ngOnInit() {
    this.borrarCitasEnInicio = await this.configuracionService.borrarCitasInicio();
    if (!this.borrarCitasEnInicio) {
      await this.obtenerCitaAleatoria();
    }
  }

  async obtenerCitaAleatoria(): Promise<void> {
    if (this.borrarCitasEnInicio) {
      this.citaAleatoria = null;
    } else {
      this.citaAleatoria = await this.citaService.obtenerCitaAleatoria();
    }
  }
}
