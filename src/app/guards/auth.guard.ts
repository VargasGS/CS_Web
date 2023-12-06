import { Injectable } from '@angular/core';
import {  CanActivate, Router} from '@angular/router';
import { UsuariosData } from '../models/autenticacion/usuarios';
import { UsuariosService } from '../services/autenticacion/usuarios.service';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private usuariosServicio: UsuariosData, 
    private router:Router){

  }
  canActivate(): boolean
  {
    if(this.usuariosServicio.isLoggedIn()){
      return true;

    }else{
      Swal.fire({
        title: 'Acceso denegado',
        text: 'Por favor, ingresar al sistema',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      this.router.navigate(['/login'])
      return false;
    }
 
  }
  
  
}
