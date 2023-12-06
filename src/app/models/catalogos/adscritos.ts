import { Observable } from "rxjs";

export interface Adscritos {
    cedula:number;  
    nombre: string;
    apellido1:string
    apellido2:string;   
    email:string
}

export abstract class AdscritosData {
  abstract listAdscritosByCedula(cedula: number): Observable<Adscritos[]>;
}