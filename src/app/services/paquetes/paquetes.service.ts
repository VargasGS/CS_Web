import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Paquetes, PaquetesData, PaquetesReceta } from "src/app/models/paquetes/paquetes";
import { PaquetesApi } from "./paquetes.api";



@Injectable()
export class PaquetesService extends PaquetesData {
   
    constructor(private api: PaquetesApi) {
        super();
    }

    registrarPaquete(item: any): Observable<Paquetes> {
        return this.api.registrarPaquete(item);
      }
    
      registrarPaqueteReceta(item: any): Observable<PaquetesReceta> {
        return this.api.registrarPaqueteReceta(item);
      }
    
      
    listPaquete(id: number): Observable<PaquetesReceta[]> {
      return this.api.listPaquete(id);  
  }
    
 
}