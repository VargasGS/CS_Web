import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { UsuariosData } from 'src/app/models/autenticacion/usuarios';
import { LugarRetiro, LugarRetiroData } from 'src/app/models/catalogos/lugar-retiro';
import { DigitacionRecetaData, RecetaDigitada } from 'src/app/models/digitacion-receta/digitacion-receta';
import { Paquetes, PaquetesData, PaquetesReceta } from 'src/app/models/paquetes/paquetes';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {

  public nombre : string = "";
  public ebais : string = "";
  public idPaquete : number = 0;
  searchTerm: string = '';

  public selectedReceta!: RecetaDigitada[];
  public objLugarRetiro!: LugarRetiro[] ;
  public objPaqueteRecetas!: PaquetesReceta[] ;

  public IdLugarRetiro:FormControl;



  public objRecetasDigitadas!: RecetaDigitada[];
  public EbaisForm : FormGroup;

  @ViewChild('content', {static:false}) el?: ElementRef;

  data = ['Número receta','Número paquete','Cédula','Nombre','Ebais','Digitador'];


  constructor(private DigitacionRecetaServicio: DigitacionRecetaData,
    private PaquetesServicio: PaquetesData,
    private usuariosServicio: UsuariosData,
    private lugarRetiroServicio: LugarRetiroData,
    private formBuilder: FormBuilder,) { 

      this.IdLugarRetiro = new FormControl(-1);

      this.EbaisForm = this.formBuilder.group({
  
        IdLugarRetiro:this.IdLugarRetiro
       })
    }

  ngOnInit(): void {
    //this.CargarRecetasDigitadas()
    this.CargarLugarRetiro()
    this.nombre = this.usuariosServicio.getNombreFromToken();
  }




  prueba(){
   


  //  this.searchTerm=getSelectTema[0].nombreLugar

  }

  CargarRecetasDigitadas() {

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

  this.DigitacionRecetaServicio.listRecetaDigitadaByEbais(this.ebais).subscribe({
    next: (data) => {
      this.objRecetasDigitadas = data;
    },
    error: (e) => {
      console.error('CargarRecetasDigitadas', e);
    },
  });
}
    
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

  GenerarPaquete(){

    if(this.IdLugarRetiro.value==-1){
      Swal.fire({
        title: '',
        text: 'Debe seleccionar un Ebais',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }else{
      var infoPaquete = {
        ebais:this.ebais,
        digitador:this.nombre,
   
       } as Paquetes;
   
       this.PaquetesServicio.registrarPaquete(infoPaquete).subscribe(
         {
           next: (res) => {
             this.idPaquete=Number(res.idPaquete)
            this.GuardarPaqueteRecetas();
   
           },
           error: (e) =>{
             console.error(e)
             Swal.fire({
               title: '',
               text: 'Hubo un error',
               icon: 'error',
               confirmButtonText: 'Aceptar'
             });
         
           } 
     
         }
       )

    }
 
    
  }


  GuardarPaqueteRecetas(){
 
  let infoReceta:PaquetesReceta[]=[];

  this.selectedReceta.forEach(receta => {

  let dato : PaquetesReceta = {
    id:0,
    cedula: receta.cedula,
    nombre: receta.nombre,
    ebais: receta.ebais,
    digitador:receta.digitador
    
    

  } as PaquetesReceta;

  infoReceta.push(dato);

})

    this.PaquetesServicio.registrarPaqueteReceta(infoReceta).subscribe(
      {
        next: (res) => {
          Swal.fire({
            title: '',
            text: 'El paquete se guardó de forma exitosa',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

         this.CargarRecetasDigitadas()

         this.objRecetasDigitadas=[];

         this.CargarPaquete(this.idPaquete);
        
        },
        error: (e) =>{
          console.error(e)
          Swal.fire({
            title: '',
            text: 'Hubo un error al guardar el paquete',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
      
        } 
  
      }
    )
  }

  CargarPaquete(id:number): void {
    this.PaquetesServicio.listPaquete(id).subscribe({
      next: (data) => {
        this.objPaqueteRecetas = data;

        this.generarPDF();
      },
      error: (e) => {
        console.log('CargarPaquete', e);
      },
    });
  }
  

  generarPDF(): void {
 

    const columnas: string[] = ['Número receta', 'Número paquete', 'Cédula', 'Nombre','Id Estado Receta', 'Ebais', 'Digitador'];
    const pdf = new jsPDF();
    const headers: Array<keyof PaquetesReceta> = Object.keys(this.objPaqueteRecetas[0]) as Array<keyof PaquetesReceta>;
    
      // Agregar texto con estilos
      pdf.setFontSize(16);
           
      pdf.setTextColor(196, 18, 26); 
      pdf.text('Paquete ' + this.ebais +'     Cantidad recetas:'+this.objPaqueteRecetas.length, 10, 10);
      /*
      pdf.setFontSize(12);
      
      pdf.setTextColor(0, 0, 0); // Color negro
      pdf.text('Cantidad recetas:'+this.objPaqueteRecetas.length, 15, 20);
      */
      const styles = {
        head: {
          fillColor: [196, 18, 26],  
          textColor: [255, 255, 255], 
        },
        body: {
          fillColor: [255, 255, 255],  
          textColor: [0, 0, 0],  
        },
      };

     
     
    const renamedHeaders = headers.map((header, index) => columnas[index] || header);
    
    (pdf as any).autoTable({
      head: [renamedHeaders],
      body: this.objPaqueteRecetas.map(row => headers.map(header => row[header])),
      startY: 20,
      styles: styles,
    
      theme:'plain'
    });
    
    
 

  pdf.save('datos.pdf');
  }
}
