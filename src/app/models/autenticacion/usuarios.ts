import { Observable } from "rxjs";

export interface Rol {
    idRol:number;  
    descripcion: string;
}

export interface Usuarios {
  idUsuario:number;  
  usuario: string;
  password: string;
  nombre: string;
  apellido1: string;
  apellido2: string;
  idRol: number;
  correo: string;
}

export interface Login {
  usuario:number;  
  password: string;
}

export interface User {
  token:string;  
  nombre: string;
}


export abstract class UsuariosData {
  abstract listRoles(): Observable<Rol[]>;
  abstract listUsuarios(): Observable<Usuarios[]>;
  abstract registrarUsuario(item: Usuarios): Observable<Usuarios>;
  abstract iniciarSesion(item: Login): Observable<User>;
  abstract isLoggedIn():boolean;
  abstract guardarToken(token:string): void;
  abstract cerrarSesion():void;
  abstract obtenerToken() : any;


  abstract getRoleFromStore() : any;
  abstract setRoleForStore(role:string) : any;
  abstract getFullNameFromStore() : any;
  abstract setFullNameForStore(nombre:string) : any;

  abstract getNombreFromToken() : string;
  abstract getRoleFromToken():string;

  abstract decodeToken():any;


 
}