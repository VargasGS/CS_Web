import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';


@Injectable()
export class PacientesApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/Paciente`;


    constructor(private http: HttpClient) {}

    getlistPacientesByCedula(cedula: number): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listPacienteByCedula/${cedula}`);
      }

    
     
}