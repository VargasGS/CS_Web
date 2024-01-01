import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { PaquetesReceta } from "src/app/models/paquetes/paquetes";


@Injectable()
export class PaquetesApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/paquetes`;


    constructor(private http: HttpClient) {}

      registrarPaquete(item: any): Observable<any> {
        return this.http.post(this.apiUrlController, item);    
      }
    
      registrarPaqueteReceta(item: any): Observable<any> {
        return this.http.post(this.apiUrlController+'/registrarPaquetesR', item);    
      }
      
      
      listPaquete(id: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listPaquete/${id}`);
      }
     

    
     
}