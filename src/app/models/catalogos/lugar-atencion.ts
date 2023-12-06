import { Observable } from "rxjs";

export interface LugarAtencion {
    idAtencion:number;  
    nombreLugar:string;   
}

export abstract class LugarAtencionData {
  abstract listLugarAtencion(): Observable<LugarAtencion[]>;
}