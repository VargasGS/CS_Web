import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AdscritosApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/Adscritos`;


    constructor(private http: HttpClient) {}

    getlistAdscritosByCedula(cedula: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listAdscritoByCedula/${cedula}`);
      }

    
     
}