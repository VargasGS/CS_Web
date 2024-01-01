import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class DigitacionRecetaApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/digitacionreceta`;


    constructor(private http: HttpClient) {}

      digitarReceta(item: any): Observable<any> {
        return this.http.post(this.apiUrlController, item);    
      }

      listRecetasDigitadas(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetasDigitadas`);
      }

      listRecetaDigitadaByEbais(ebais: string): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetasDigitadasEbais/${ebais}`);
      }
     

    
     
}