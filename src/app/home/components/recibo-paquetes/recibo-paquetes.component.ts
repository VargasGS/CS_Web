import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LugarRetiro, LugarRetiroData } from 'src/app/models/catalogos/lugar-retiro';
import { Paquetes, PaquetesData } from 'src/app/models/paquetes/paquetes';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-recibo-paquetes',
  templateUrl: './recibo-paquetes.component.html',
  styleUrls: ['./recibo-paquetes.component.scss']
})
export class ReciboPaquetesComponent implements OnInit {

  public objPaquetes!:Paquetes[] ;
  public objLugarRetiro!:LugarRetiro[] ;
  public selectedPaquete!: Paquetes[];

  public IdLugarRetiro:FormControl;

  constructor( 
     private lugarRetiroServicio: LugarRetiroData,
     private paquetesServicio:PaquetesData,
    private formBuilder: FormBuilder,
    private router:Router) {
      this.IdLugarRetiro = new FormControl(-1);

     }

  ngOnInit(): void {
    this.CargarLugarRetiro()
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
  verMenuPrincipal(){

    this.router.navigate(['pages/dashboard']);
  }
  CargarPaquetesEbais(): void {

    if(this.IdLugarRetiro.value==-1){
      Swal.fire({
        title: '',
        text: 'Debe seleccionar un Ebais',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
    }else{
      var getSelectEbais = this.objLugarRetiro.filter((obj) => {
        return obj.idLugarRetiro === Number(this.IdLugarRetiro.value) ;
      });
    
      this.paquetesServicio.listPaqueteEbais(getSelectEbais[0].nombreLugar).subscribe({
        next: (data) => {
          this.objPaquetes = data;
        },
        error: (e) => {
          console.log('CargarPaquetesEbais', e);
        },
      });
}

}

RevisarPaquete(){
 
  let infoPaquete:Paquetes[]=[];

  console.log(this.selectedPaquete)

  if(this.selectedPaquete==undefined){

    Swal.fire({
      title: '',
      text: 'Debe marcar al menos un paquete',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });

  }else{
    this.selectedPaquete.forEach(paquete => {

      let dato : Paquetes = {
      
        ebais: paquete.ebais,
        fechaPaquete:paquete.fechaPaquete,
        identificador:paquete.identificador,
        digitador:paquete.digitador,
        observacion:paquete.observacion
        
    
      } as Paquetes;
    
      infoPaquete.push(dato);
    
    
    
    })
    
        this.paquetesServicio.revisarPaquete(infoPaquete).subscribe(
          {
            next: (res) => {
              Swal.fire({
                title: '',
                text: 'El paquete se marcó como revisado',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
    
              this.CargarPaquetesEbais();
    
            },
            error: (e) =>{
              console.error(e)
              Swal.fire({
                title: '',
                text: 'Hubo un error al revisar el/los paquete(s)',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
          
            } 
      
          }
        ) 

  }

  


  }
   

}
