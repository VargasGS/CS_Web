import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Adscritos, AdscritosData } from "src/app/models/catalogos/adscritos";
import { AdscritosApi } from "./adscritos.api";



@Injectable()
export class AdscritosService extends AdscritosData {
   
    constructor(private api: AdscritosApi) {
        super();
    }

    listAdscritosByCedula(cedula: number): Observable<Adscritos[]> {
        return this.api.getlistAdscritosByCedula(cedula);  
    }
    
    
     
}