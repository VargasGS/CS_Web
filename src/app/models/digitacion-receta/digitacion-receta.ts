import { Observable } from "rxjs";

export interface DigitacionReceta {
    id:number;  
    cedula:string;   
    nombre:string;   
    apellido1:string;   
    apellido2:string;   
    fechaAtencion:Date;   
    fechaAbscripcion:Date;   
    idLugarRetiro:number;  
    idEstadoReceta:number;  
    idAtencion:number;  
    digitador:string;   
    observacion:string;   
    fechaDigitacion:Date
}

export interface RecetaDigitada {
    cedula:string;   
    nombre:string;   
    fechaDigitacion:Date;   
    ebais:string;
    digitador:string
}



export abstract class DigitacionRecetaData {
    abstract digitarReceta(item: DigitacionReceta[]): Observable<DigitacionReceta>;
    abstract listRecetasDigitadas(): Observable<RecetaDigitada[]>;
    abstract listRecetaDigitadaByEbais(cedula: string): Observable<RecetaDigitada[]>;
}