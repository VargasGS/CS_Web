import { Observable } from "rxjs";

export interface LugarRetiro {
    idLugarRetiro:number;  
    nombreLugar:string;   
}

export abstract class LugarRetiroData {
  abstract listLugarRetiro(): Observable<LugarRetiro[]>;
}