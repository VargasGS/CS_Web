import { Observable } from "rxjs";

export interface Paquetes {
    idPaquete:number;  
    ebais:string;   
    digitador:string;   
}

export interface PaquetesReceta {
    id:number;  
    idPaquete:number;  
    nombre:string;
    cedula:string;
    ebais:string;   
    digitador:string;   
}



export abstract class PaquetesData {
    abstract registrarPaquete(item: Paquetes): Observable<Paquetes>;
    abstract registrarPaqueteReceta(item: PaquetesReceta[]): Observable<Paquetes>;
    abstract listPaquete(id: number): Observable<PaquetesReceta[]>;
}