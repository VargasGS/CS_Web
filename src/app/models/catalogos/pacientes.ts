import { Observable } from "rxjs";

export interface Pacientes {
    cedula:number;  
    nombre: string;
    apellido1:string
    apellido2:string;   
    correo:string
}

export abstract class PacientesData {
  abstract listPacienteByCedula(cedula: number): Observable<Pacientes[]>;
}