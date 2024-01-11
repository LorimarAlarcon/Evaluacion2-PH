import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ListaCitasComponent } from 'src/app/componentes/lista-citas/lista-citas.component';
import { FormularioCitasComponent } from 'src/app/componentes/formulario-citas/formulario-citas.component';
import { CitasService } from 'src/app/servicios/citas.service';
import { Cita } from 'src/app/modelo/cita';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.page.html',
  styleUrls: ['./gestion-citas.page.scss'],
  standalone: true,
  imports: [FormularioCitasComponent, ListaCitasComponent, IonicModule, CommonModule, FormsModule]
})
export class GestionCitasPage implements OnInit {

  listaCitas: Cita[] = [];

  constructor(
    private citasService: CitasService
  ) { }

  async ngOnInit() {
    
    await this._actualizarCitas
  }

  async manejarCitaEliminada(id: number){
    console.log(`Cita Eliminada en la posición ${id}`);
    await this.citasService.eliminarCita(id);
    await this._actualizarCitas();
  }

  async onCrearCita(nuevaCita: Cita) {
    this.citasService.agregarCita(nuevaCita);
    await this._actualizarCitas(); 
  }

  async _actualizarCitas() {
    this.listaCitas = await this.citasService.obtenerTodasLasCitas();
  }
}

