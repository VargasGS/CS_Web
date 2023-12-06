import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { LugarRetiro } from "src/app/models/catalogos/lugar-retiro";

@Injectable()
export class LugarRetiroApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/LugarRetiro`;


    constructor(private http: HttpClient) {}

    getListLugarRetiro(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listlugarretiro`);
      }

    
     
}