import { Component, OnInit } from '@angular/core';
import { EntregaReceta, PaquetesData, PaquetesReceta } from 'src/app/models/paquetes/paquetes';
import Swal from 'sweetalert2';
import { inflate } from 'zlib';

@Component({
  selector: 'app-entrega-receta',
  templateUrl: './entrega-receta.component.html',
  styleUrls: ['./entrega-receta.component.scss']
})
export class EntregaRecetaComponent implements OnInit {

  public objRecetasPaquete!:PaquetesReceta[] ;
    
  public selectedReceta!: PaquetesReceta[];

  constructor( private paquetesServicio:PaquetesData) { }

  ngOnInit(): void {
    this.CargarRecetasRevisadas();
  }

  CargarRecetasRevisadas(): void {
    this.paquetesServicio.listRecetasRevisadas().subscribe({
      next: (data) => {
        this.objRecetasPaquete = data;
      },
      error: (e) => {
        console.log('cargarLugarRetiro', e);
      },
    });
  }


  MarcarEntregada(): void {


    let infoReceta:EntregaReceta[]=[];

    this.selectedReceta.forEach(receta => {

      if(receta.observacion==null){
        Swal.fire({
          title: '',
          text: 'La observacion no puede estar vacía',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        });
      }else{
        let dato : EntregaReceta = {
          cedula:receta.cedula,
          nombre:receta.nombre,
          ebais:receta.ebais,
          fechaRevision:receta.fechaRevision,
          observacion:receta.observacion,
          idEstadoReceta:6
      
          } as EntregaReceta;
      
          infoReceta.push(dato);
          this.paquetesServicio.entregarReceta(infoReceta).subscribe({
            next: (data) => {
              Swal.fire({
                title: '',
                text: 'Proceso realizado con éxito',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
      
              this.CargarRecetasRevisadas();
            },
            error: (e) => {
              console.log('MarcarEntregada', e);
            },
          });
      }

  

  })

  
  }

}
