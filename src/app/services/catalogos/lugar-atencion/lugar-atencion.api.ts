import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class LugarAtencionApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/LugarAtencion`;


    constructor(private http: HttpClient) {}

    getListLugarAtencion(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listlugaratencion`);
      }

    
     
}