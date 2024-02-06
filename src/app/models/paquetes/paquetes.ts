import { Observable } from "rxjs";

export interface Paquetes {
    idPaquete:number;  
    ebais:string;   
    digitador:string;   
    identificador:string;  
    estadoPaquete:string;  
    fechaPaquete:Date;
    recetas:number;
    observacion:string;
}

export interface PaquetesReceta {
    id:number;  
    idPaquete:number;  
    nombre:string;
    cedula:string;
    ebais:string;   
    digitador:string;   
    fechaRevision:Date;
    observacion:string;
}

export interface PaquetesRecetaDoc {
  
    nombre:string;
    cedula:string;
    ebais:string;   

}

export interface EntregaReceta {
    id:number;  
    idEstadoReceta:number;  
    nombre:string;
    cedula:string;
    ebais:string;   
    fechaRevision:Date;   
    observacion:string;
}



export abstract class PaquetesData {
    abstract registrarPaquete(item: Paquetes): Observable<Paquetes>;
    abstract registrarPaqueteReceta(item: PaquetesReceta[]): Observable<PaquetesReceta>;
    abstract listPaquete(id: number): Observable<PaquetesReceta[]>;
    abstract listPaqueteIdentificador(id: number): Observable<Paquetes[]>;
    abstract listPaqueteEbais(id: string): Observable<Paquetes[]>;
    abstract revisarPaquete(item: Paquetes[]): Observable<Paquetes>;
    abstract entregarReceta(item: EntregaReceta[]): Observable<EntregaReceta>;
    abstract listRecetasRevisadas(): Observable<PaquetesReceta[]>;
    abstract listRecetasRevisadasEbais(id: string): Observable<PaquetesReceta[]>;
}