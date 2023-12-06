import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {  Login, Rol, User, Usuarios, UsuariosData } from "src/app/models/autenticacion/usuarios";
import { UsuariosApi } from "./usuarios.api";


@Injectable()
export class UsuariosService extends UsuariosData {
   
    constructor(private api: UsuariosApi) {
        super();
    }

    listRoles(): Observable<Rol[]> {
        return this.api.listRoles();  
    }

    listUsuarios(): Observable<Usuarios[]> {
      return this.api.listUsuarios();  
  }


    registrarUsuario(item: any): Observable<Usuarios> {
        return this.api.registrarUsuario(item);
      }

      iniciarSesion(item: any): Observable<User> {
        return this.api.iniciaSesion(item);
      }
    
      isLoggedIn(): boolean{
        return !!localStorage.getItem('token')
      }

      guardarToken(token:string):void{
       return this.api.guardarToken(token);
      }
      
      cerrarSesion():void{
      this.api.cerrarSesion();
    }

   public obtenerToken() {
      return this.api.obtenerToken();
    }

    public getRoleFromStore(){
      return this.api.getRoleFromStore();
    }
  
    public setRoleForStore(role:string){
      this.api.setRoleForStore(role);
    }
  
    public getFullNameFromStore(){
      return this.api.getFullNameFromStore();
    }
  
    public setFullNameForStore(nombre:string){
      this.api.setFullNameForStore(nombre)
    }

    public getNombreFromToken(){
     return this.api.getNombreFromToken();
    }
  
    public getRoleFromToken(){
      return this.api.getRoleFromToken();
    }

    public decodeToken(){
      return this.api.decodeToken();
    }
     
}