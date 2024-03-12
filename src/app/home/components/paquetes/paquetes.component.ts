import { ConnectedOverlayPositionChange } from '@angular/cdk/overlay';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

import { UsuariosData } from 'src/app/models/autenticacion/usuarios';
import { LugarRetiro, LugarRetiroData } from 'src/app/models/catalogos/lugar-retiro';
import { DigitacionRecetaData, RecetaDigitada } from 'src/app/models/digitacion-receta/digitacion-receta';
import { Paquetes, PaquetesData, PaquetesReceta, PaquetesRecetaDoc } from 'src/app/models/paquetes/paquetes';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-paquetes',
  templateUrl: './paquetes.component.html',
  styleUrls: ['./paquetes.component.scss']
})
export class PaquetesComponent implements OnInit {

  public nombre : string = "";
  public ebais : string = "";
  public identificador : string = "";
  public idPaquete : number = 0;
  searchTerm: string = '';

  public selectedReceta!: RecetaDigitada[];
  public objLugarRetiro!: LugarRetiro[] ;
  public objPaqueteRecetas!: PaquetesReceta[] ;
  public objPaquetes!:Paquetes[] ;

  public IdLugarRetiro:FormControl;



  public objRecetasDigitadas!: RecetaDigitada[];
  public EbaisForm : FormGroup;

  @ViewChild('content', {static:false}) el?: ElementRef;

  constructor(private DigitacionRecetaServicio: DigitacionRecetaData,
    private PaquetesServicio: PaquetesData,
    private usuariosServicio: UsuariosData,
    private lugarRetiroServicio: LugarRetiroData,
    private formBuilder: FormBuilder,
    private router:Router) { 

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
    }else if(this.selectedReceta==undefined){
      Swal.fire({
        title: '',
        text: 'Debe seleccionar las recetas para generar el paquete',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
    }
    
    
    else{
      var infoPaquete = {
        ebais:this.ebais,
        digitador:this.nombre,
        recetas:this.selectedReceta.length
   
       } as Paquetes;
   
       this.PaquetesServicio.registrarPaquete(infoPaquete).subscribe(
         {
           next: (res) => {
             this.idPaquete=Number(res.idPaquete)
            this.GuardarPaqueteRecetas();
             this.listarPaqueteIndetificador();
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

  listarPaqueteIndetificador(): void {
    this.PaquetesServicio.listPaqueteIdentificador(this.idPaquete).subscribe({
      next: (data) => {
        this.objPaquetes = data;
        this.identificador= this.objPaquetes[0].identificador
      
      },
      error: (e) => {
        console.log('listarPaqueteIndetificador', e);
      },
    });
  }

  verMenuPrincipal(){

    this.router.navigate(['pages/dashboard']);
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

    let paquete:PaquetesRecetaDoc[]=[];

    this.selectedReceta.forEach(receta => {
     
      let dato : PaquetesRecetaDoc = {
        
        cedula: receta.cedula,
        nombre: receta.nombre,
        ebais:receta.ebais

     
      } as PaquetesRecetaDoc;
  
      paquete.push(dato);
  
    })


const columnas: string[] = ['Cédula', 'Nombre', 'Ebais'];
const pdf = new jsPDF();
const headers: Array<keyof PaquetesRecetaDoc> = Object.keys(paquete[0]) as Array<keyof PaquetesRecetaDoc>;

// Agregar imagen como logo
const logoImg = '/assets/logo-fondo-blanco.png'; // Reemplaza con la ruta de tu imagen
pdf.addImage(logoImg, 'PNG', 10, 5, 30, 30); // Ajusta las coordenadas y dimensiones según tus necesidades

// Agregar texto con estilos
pdf.setFontSize(16);
pdf.setTextColor(196, 18, 26);
pdf.text('Paquete: ' + this.identificador + ' Cantidad recetas:' + paquete.length, 50, 20);

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
  startY: 50, // Ajusta la posición de inicio según el tamaño de tu logo
  styles: styles,
  theme: 'plain',
});

pdf.save(this.identificador+'.pdf');
  }
}
