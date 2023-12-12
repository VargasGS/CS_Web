import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {  Login, Usuarios, UsuariosData } from '../models/autenticacion/usuarios';
import Swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  public loginForm : FormGroup;
  public Usuario:FormControl;
  public Contrasena:FormControl;

  public errorMessage: string = '';
  public error:boolean=false;

  constructor( private formBuilder: FormBuilder,
    private usuariosServicio: UsuariosData,
    private router:Router) { 

    this.Usuario = new FormControl('', Validators.required);
    this.Contrasena = new FormControl('', Validators.required);
    this.loginForm = this.formBuilder.group({
      Usuario:this.Usuario,
      Contrasena:this.Contrasena,
     
     })
  }

  ngOnInit(): void {
   // document.body.style.backgroundColor = "#F8F9FA";
  }

  validarIngreso(){
    var param = {
      usuario:this.Usuario.value,
      password:this.Contrasena.value,
  
     } as Login;

     this.usuariosServicio.iniciarSesion(param).subscribe(
      {
        next: (res) => {
          this.usuariosServicio.guardarToken(res.token);
          const tokenPayload = this.usuariosServicio.decodeToken();
          this.usuariosServicio.setFullNameForStore(tokenPayload.unique_name.toString());
          this.usuariosServicio.setRoleForStore(tokenPayload.role.toString());

          this.errorMessage="";
          this.error=false;
        
          this.router.navigate(['pages/dashboard'])

        
        },
        error: (e) =>{
          console.error(e)
          /*
          Swal.fire({
            title: '',
            text: 'Usuario y/o contraseña incorrectos',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
      */
          this.error=true;
         this.errorMessage="Usuario y/o contraseña incorrectos";
        } 
  
      }
    )

    }

}
