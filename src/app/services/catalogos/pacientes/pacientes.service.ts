import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Pacientes, PacientesData } from "src/app/models/catalogos/pacientes";
import { PacientesApi } from "./pacientes.api";


@Injectable()
export class PacientesService extends PacientesData {
   
    constructor(private api: PacientesApi) {
        super();
    }

    listPacienteByCedula(cedula: number): Observable<Pacientes[]> {
        return this.api.getlistPacientesByCedula(cedula);  
    }
    
    
     
}