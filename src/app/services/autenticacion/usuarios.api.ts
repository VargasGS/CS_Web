import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable()
export class UsuariosApi {
    private readonly apiUrlController: string =`${environment.apiUrlCatalogos }/api/Usuario`;
    private nombre$ = new BehaviorSubject<string>("");
    private role$ = new BehaviorSubject<string>("");
    private userPayload :any;


    constructor(private http: HttpClient, private router:Router) {
    this.userPayload = this.decodeToken();
    }

    listRoles(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listRol`);
      }

      listUsuarios(): Observable<any[]> {
        return this.http.get<any[]>(`${this.apiUrlController}/listUsuarios`);
      }

    registrarUsuario(item: any): Observable<any> {
        return this.http.post(this.apiUrlController, item);    
    }

    iniciaSesion(item: any): Observable<any> {
        return this.http.post(`${this.apiUrlController}/Login`, item);   

    }
    
    guardarToken(tokenValue : string){
      localStorage.clear();
      localStorage.setItem('token',tokenValue)
    }

    obtenerToken(){
      return localStorage.getItem('token')
    }
    isLoggedIn(): boolean{
      return !!localStorage.getItem('token')
    }

    cerrarSesion(): void{
    localStorage.setItem('token','');
    localStorage.clear();
    this.router.navigate(['login']);
    }

    public getRoleFromStore(){
      return this.role$.asObservable();
    }
  
    public setRoleForStore(role:string){
      this.role$.next(role);
    }
  
    public getFullNameFromStore(){
      return this.nombre$.asObservable();
    }
  
    public setFullNameForStore(nombre:string){
      this.nombre$.next(nombre)
    }

    public decodeToken(){

      const jwt = new JwtHelperService();
      const token = this.obtenerToken()!;
      return jwt.decodeToken(token);
    }


    getNombreFromToken(){
      this.userPayload = this.decodeToken();
      return this.userPayload.unique_name;
     
    }
  
    getRoleFromToken(){
      this.userPayload = this.decodeToken();
      if(this.userPayload)
      return this.userPayload.role;
    }


     
}