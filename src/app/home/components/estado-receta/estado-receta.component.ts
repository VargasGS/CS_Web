import { Component, OnInit } from '@angular/core';
import { ActivacionRecetaData, EstadoReceta } from 'src/app/models/activacion-receta/activacion-receta';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-estado-receta',
  templateUrl: './estado-receta.component.html',
  styleUrls: ['./estado-receta.component.scss']
})
export class EstadoRecetaComponent implements OnInit {

  public objConsultaReceta!: EstadoReceta[] ; 
  public cedula!:string;
  constructor(private activacionRecetaServicio: ActivacionRecetaData) { }

  ngOnInit(): void {
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
