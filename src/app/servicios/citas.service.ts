import { Injectable } from '@angular/core';
import { Cita } from '../modelo/cita';
import { ConfiguracionService } from './configuracion.service';
import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from '@capacitor-community/sqlite';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  sqlite:SQLiteConnection = new SQLiteConnection(CapacitorSQLite)
  db!: SQLiteDBConnection
  plataforma:string = "";

  DB_NAME: string        = "lista_citas";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string        = "no-encryption";
  DB_VERSION: number     = 1;
  DB_READ_ONLY: boolean  = false;
  
  TABLE_NAME: string     = "lista_citas";
  COL_FRASE: string      = "frase";
  COL_AUTOR: string      = "autor";
  DB_SQL_TABLAS: string  = `
  CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
    id INTEGER PRIMARY KEY,
    ${this.COL_FRASE} TEXT NOT NULL,
    ${this.COL_AUTOR} TEXT NOT NULL
  )
`;

  constructor(
    private configuracionService: ConfiguracionService
  ) { }

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite')
    const jeepSqliteEl = document.querySelector("jeep-sqlite")
    if( jeepSqliteEl != null ) {      
      await this.sqlite.initWebStore()            
    }
}

  async iniciarPlugin() {    
    this.plataforma = Capacitor.getPlatform()
    if(this.plataforma == "web") {
      await this._iniciarPluginWeb()
    }
    await this.abrirConexion();

    await this.db.execute(this.DB_SQL_TABLAS) 

    await this.agregarCita({frase: "El éxito consiste en obtener lo que se desea. La felicidad en disfrutar lo que se obtiene", autor: "Ralph Waldo Emerson"})
    await this.agregarCita({frase: "Las personas no son recordadas por el número de veces que fracasan, sino por el número de veces que tienen éxito", autor: "Thomas Edison"})
    await this.agregarCita({frase: "Ningún viento es bueno para el barco que no sabe adonde va", autor: "Séneca"})
  }

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency() 
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result
    if(ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY)      
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      )
    }
  await this.db.open()
}

  async obtenerCitaAleatoria(): Promise<Cita | null> {
    if (await this.getBorrarCitasEnInicio()) {
      return null;
    }
    const citas = await this.obtenerTodasLasCitas();
    const indiceAleatorio = Math.floor(Math.random() * citas.length);
    return citas[indiceAleatorio];
  }

  async obtenerTodasLasCitas(): Promise<Cita[]> {
    const sql = `SELECT * FROM ${this.TABLE_NAME}`;
    const resultado = await this.db.query(sql);
    return resultado?.values ?? [];
}

  async agregarCita(cita:Cita) {
    const sql = `INSERT INTO ${this.TABLE_NAME}(${this.COL_FRASE}, ${this.COL_AUTOR})  VALUES (?, ?)`;
    await this.db.run(sql, [cita.frase, cita.autor])
  }

  async eliminarCita(id:number) {
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    await this.db.run(sql, [id]);
  }

  async getBorrarCitasEnInicio(): Promise<boolean> {
    const configuracion = await this.configuracionService.borrarCitasInicio();
    return configuracion;
  }
}