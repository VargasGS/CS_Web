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
}



export abstract class DigitacionRecetaData {
    abstract digitarReceta(item: DigitacionReceta[]): Observable<DigitacionReceta>;

}