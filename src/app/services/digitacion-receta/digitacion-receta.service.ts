import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DigitacionReceta, DigitacionRecetaData } from "src/app/models/digitacion-receta/digitacion-receta";
import { DigitacionRecetaApi } from "./digitacion-receta.api";





@Injectable()
export class DigitacionRecetaService extends DigitacionRecetaData {
   
    constructor(private api: DigitacionRecetaApi) {
        super();
    }

    digitarReceta(item: any): Observable<DigitacionReceta> {
        return this.api.digitarReceta(item);
      }
    
   

    
     
}