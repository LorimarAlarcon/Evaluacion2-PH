import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToggleChangeEventDetail } from '@ionic/angular';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { IonToggleCustomEvent } from '@ionic/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ConfiguracionesPage implements OnInit {

  borrarCitasEnInicio: boolean = false;

  constructor(private configuracionService: ConfiguracionService) { 
  }

  async ngOnInit() {
    this.borrarCitasEnInicio = await this.configuracionService.borrarCitasInicio()
  }

  onCambioEnConfiguracionDeBorrar($event: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) {
    this.configuracionService.setBorrarCitasInicio(this.borrarCitasEnInicio)
  }
}
