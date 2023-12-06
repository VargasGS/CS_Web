import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ActivacionReceta, ActivacionRecetaData, EstadoReceta, RecetaActiva } from "src/app/models/activacion-receta/activacion-receta";
import { ActivacionRecetaApi } from "./activacion-receta.api";




@Injectable()
export class ActivacionRecetaService extends ActivacionRecetaData {
   
    constructor(private api: ActivacionRecetaApi) {
        super();
    }

    activarReceta(item: any): Observable<ActivacionReceta> {
        return this.api.activarReceta(item);
      }
    
    listRecetasActivas(): Observable<RecetaActiva[]> {
        return this.api.listRecetasActivas();  
    }

    listRecetaByCedula(cedula: number): Observable<EstadoReceta[]> {
        return this.api.getlistRecetaByCedula(cedula);  
    }

    
     
}