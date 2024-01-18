import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EntregaReceta, Paquetes, PaquetesData, PaquetesReceta } from "src/app/models/paquetes/paquetes";
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

    listPaqueteIdentificador(id: number): Observable<Paquetes[]> {
      return this.api.listPaqueteIdentificador(id);  
  }
  listPaqueteEbais(ebais: string): Observable<Paquetes[]> {
      return this.api.listPaqueteEbais(ebais);  
    }

    revisarPaquete(item: any): Observable<Paquetes> {
      return this.api.revisarPaquete(item);
    }

    entregarReceta(item: any): Observable<EntregaReceta> {
      return this.api.entregarReceta(item);
    }

    listRecetasRevisadas(): Observable<PaquetesReceta[]> {
      return this.api.listRecetasRevisadas();  
  }

  listRecetasRevisadasEbais(ebais: string): Observable<PaquetesReceta[]> {
    return this.api.listRecetasRevisadasEbais(ebais);  
  }
 
}