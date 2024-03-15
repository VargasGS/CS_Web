import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LugarRetiro, LugarRetiroData } from 'src/app/models/catalogos/lugar-retiro';
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

  public objLugarRetiro!: LugarRetiro[] ;
  public IdLugarRetiro:FormControl;
  public EbaisForm : FormGroup;
  public ebais : string = "";

  constructor( private paquetesServicio:PaquetesData,
    private formBuilder: FormBuilder,
    private lugarRetiroServicio: LugarRetiroData,
    private router:Router) { 
    this.IdLugarRetiro = new FormControl(-1);

    
    this.EbaisForm = this.formBuilder.group({
  
      IdLugarRetiro:this.IdLugarRetiro
     })

  }

  ngOnInit(): void {
    //this.CargarRecetasRevisadas();
    this.CargarLugarRetiro();
  }

  CargarLugarRetiro(): void {
    this.lugarRetiroServicio.listLugarRetiro().subscribe({
      next: (data) => {
        this.objLugarRetiro = data;
      },
      error: (e) => {
        console.log('cargarLugarRetiro', e);
      },
    });
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

  verMenuPrincipal(){

    this.router.navigate(['pages/dashboard']);
  }

  CargarRecetasRevisadasEbais() {

    if(this.IdLugarRetiro.value==-1){
    
      Swal.fire({
        title: '',
        text: 'Debe seleccionar un Ebais',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    
    }else{
      var getSelectEbais = this.objLugarRetiro.filter((obj) => {
        return obj.idLugarRetiro === Number(this.IdLugarRetiro.value) ;
      });
    
      this.ebais=getSelectEbais[0].nombreLugar
    
      this.paquetesServicio.listRecetasRevisadasEbais(this.ebais).subscribe({
        next: (data) => {
          this.objRecetasPaquete = data;
    
          
        },
        error: (e) => {
          console.error('CargarRecetasRevisadasEbais', e);
        },
      });
    }
  }


  MarcarEntregada(): void {


    let infoReceta:EntregaReceta[]=[];

    if(this.selectedReceta==undefined){
      Swal.fire({
        title: '',
        text: 'Debe marcar al menos una receta',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      this.selectedReceta.forEach(receta => {

        if(receta.observacion==null || receta.observacion==""){
          Swal.fire({
            title: '',
            text: 'Debe ingresar quien recibió los medicamentos',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
  
          this.selectedReceta = [];
  
        }else{
  
          let dato : EntregaReceta = {
            cedula:receta.cedula,
            nombre:receta.nombre,
            ebais:receta.ebais,
            fechaRevision:receta.fechaRevision,
            idEstadoReceta:6,
            observacion:receta.observacion
        
            } as EntregaReceta;
        
            infoReceta.push(dato);
            this.paquetesServicio.entregarReceta(infoReceta).subscribe({
              next: (data) => {
                Swal.fire({
                  title: '',
                  text: 'Proceso realizado con éxito',
                  icon: 'success',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#8CD4F5',
                });
                this.selectedReceta = [];
                this.objRecetasPaquete = [];
                //this.CargarRecetasRevisadas();
              },
              error: (e) => {
                console.log('MarcarEntregada', e);
              },
            });
  
        }
  
        
    })
  
    }

 
  
  }

}
