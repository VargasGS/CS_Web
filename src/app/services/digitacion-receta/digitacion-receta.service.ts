import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { DigitacionReceta, DigitacionRecetaData, RecetaDigitada } from "src/app/models/digitacion-receta/digitacion-receta";
import { DigitacionRecetaApi } from "./digitacion-receta.api";





@Injectable()
export class DigitacionRecetaService extends DigitacionRecetaData {
   
    constructor(private api: DigitacionRecetaApi) {
        super();
    }

    digitarReceta(item: any): Observable<DigitacionReceta> {
        return this.api.digitarReceta(item);
      }
    
      listRecetasDigitadas(): Observable<RecetaDigitada[]> {
        return this.api.listRecetasDigitadas();  
    }

    listRecetaDigitadaByEbais(ebais: string): Observable<any[]> {
        return this.api.listRecetaDigitadaByEbais(ebais);
      }
     
   

    
     
}