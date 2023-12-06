import { Injectable } from "@angular/core";
import { LugarRetiroApi } from "./lugar-retiro.api";
import { LugarRetiro, LugarRetiroData } from "src/app/models/catalogos/lugar-retiro";
import { Observable } from "rxjs";

@Injectable()
export class LugarRetiroService extends LugarRetiroData {
   
    constructor(private api: LugarRetiroApi) {
        super();
    }

    listLugarRetiro(): Observable<LugarRetiro[]> {
        return this.api.getListLugarRetiro();  
    }
    
    
     
}