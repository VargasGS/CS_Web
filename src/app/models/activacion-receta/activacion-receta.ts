import { Observable } from "rxjs";

export interface ActivacionReceta {
    id:number;  
    cedula:string;   
    nombre:string;   
    apellido1:string;   
    apellido2:string;   
    correo:string;   
    fechaAtencion:string;   
    fechaRegistroComprobante:string;   
    idLugarRetiro:number;  
    idEstadoReceta:number;  
    idAtencion:number;  
}

export interface RecetaActiva{
    id:number;  
    cedula:string;   
    nombre:string;   
    apellido1:string;   
    apellido2:string;   
    correo:string;   
    fechaAtencion:Date;   
    fechaRegistroComprobante:Date;   
    idLugarRetiro:number;  
    idEstadoReceta:number;  
    idAtencion:number; 
    LugarRetiro:string;  
    EstadoReceta:string;  
    Atencion:string;   
}

export interface EstadoReceta{
 
    cedula:string;   
    nombre:string;   
    apellido1:string;   
    apellido2:string;   
    fechaAtencion:Date;   
    fechaRegistroComprobante:Date;   
    idLugarRetiro:number;  
    idEstadoReceta:number;  
    idAtencion:number; 
    LugarRetiro:string;  
    EstadoReceta:string;  
    Atencion:string;   
}

export abstract class ActivacionRecetaData {
    abstract activarReceta(item: ActivacionReceta): Observable<ActivacionReceta>;
    abstract listRecetasActivas(): Observable<RecetaActiva[]>;
    abstract listRecetaByCedula(cedula: number): Observable<EstadoReceta[]>;
}