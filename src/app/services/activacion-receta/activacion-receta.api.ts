import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ActivacionRecetaApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/activacionreceta`;


    constructor(private http: HttpClient) {}

      activarReceta(item: any): Observable<any> {
        return this.http.post(this.apiUrlController, item);    
      }

      listRecetasActivas(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetasActivas`);
      }


      getlistRecetaByCedula(cedula: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRecetaByCedula/${cedula}`);
      }

    
     
}