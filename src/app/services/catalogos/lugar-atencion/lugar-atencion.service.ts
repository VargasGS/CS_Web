import { Injectable } from "@angular/core";

import { Observable } from "rxjs";
import { LugarAtencion, LugarAtencionData } from "src/app/models/catalogos/lugar-atencion";
import { LugarAtencionApi } from "./lugar-atencion.api";

@Injectable()
export class LugarAtencionService extends LugarAtencionData {
   
    constructor(private api: LugarAtencionApi) {
        super();
    }

    listLugarAtencion(): Observable<LugarAtencion[]> {
        return this.api.getListLugarAtencion();  
    }
    
    
     
}