import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivacionRecetaData, EstadoReceta } from 'src/app/models/activacion-receta/activacion-receta';
import { UsuariosData } from 'src/app/models/autenticacion/usuarios';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-receta',
  templateUrl: './estado-receta.component.html',
  styleUrls: ['./estado-receta.component.scss']
})
export class EstadoRecetaComponent implements OnInit {

  public objConsultaReceta!: EstadoReceta[] ; 
  public cedula!:string;

  public nombre : string= "";
  public rol : string= "";
  public mostrar :boolean = false;

  constructor(private activacionRecetaServicio: ActivacionRecetaData,
    private router:Router,
    private usuariosServicio: UsuariosData) { }

  ngOnInit(): void {
    this.comprobarLogin()
  }

  verMenuPrincipal(){

    this.router.navigate(['pages/dashboard']);
  }

  comprobarLogin(){
    this.usuariosServicio.getFullNameFromStore().subscribe(
      {
        next: (res: any) => {
         this.nombre = this.usuariosServicio.getNombreFromToken();
      
         this.rol= this.usuariosServicio.getRoleFromToken();
       
     
        if(this.rol==="Administrador" || this.rol=="funcionario" ){
        
          this.mostrar=true;
        }
      }
    })
  }

  ConsultarReceta(): void {
    this.activacionRecetaServicio.listRecetaByCedula(Number(this.cedula)).subscribe({
      next: (data) => {
        this.objConsultaReceta = data;
        if(Object.keys(this.objConsultaReceta).length === 0){
          Swal.fire({
            title: '',
            text: 'No se encontraron coincidencias con la identificación ingresada',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
        }
      },
      error: (e) => {
      
        console.log('Consultar receta', e);
      },
    });
  }
}
