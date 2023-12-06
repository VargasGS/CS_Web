import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { UsuariosData } from '../models/autenticacion/usuarios';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private usuariosServicio: UsuariosData, private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   const token = this.usuariosServicio.obtenerToken();

   if(token){
    request = request.clone({
      setHeaders: {Authorization:`Bearer ${token}`}
    })
   }
   return next.handle(request).pipe(
    catchError((err:any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 401){
          //return this.handleUnAuthorizedError(request,next);
          Swal.fire({
            title: '',
            text: 'Debe ingresar nuevamente al sistema',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });

          this.router.navigate(['login'])
        }
      }
      return throwError(()=> err)
    })
  );
  }
}

