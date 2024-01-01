import { Component, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { ActivacionRecetaData, RecetaActiva } from 'src/app/models/activacion-receta/activacion-receta';
import { Usuarios, UsuariosData } from 'src/app/models/autenticacion/usuarios';
import { DigitacionReceta, DigitacionRecetaData } from 'src/app/models/digitacion-receta/digitacion-receta';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-digitacion',
  templateUrl: './digitacion.component.html',
  styleUrls: ['./digitacion.component.scss']
})
export class DigitacionComponent implements OnInit {

  public objReceta!: RecetaActiva[];
  selectedRecetas: any[] = []; 
  public nombre : string = "";

  
  public selectedReceta!: RecetaActiva[];


  constructor(private ActivacionRecetaServicio: ActivacionRecetaData,
    private DigitacionRecetaServicio: DigitacionRecetaData,
    private filerSaver:FileSaverService,
    private usuariosServicio: UsuariosData) { }

  ngOnInit(): void {

    this.CargarRecetas();
    this.nombre = this.usuariosServicio.getNombreFromToken();
  }

  CargarRecetas(): void {
    this.ActivacionRecetaServicio.listRecetasActivas().subscribe({
      next: (data) => {
        this.objReceta = data;
        
      },
      error: (e) => {
        console.log('CargarRecetas', e);
      },
    });
  }

  fileName="RecetasActivas.xlsx";


  exportExcel(){


    const workBook = XLSX.utils.book_new(); 
    const workSheet = XLSX.utils.json_to_sheet(this.objReceta);

    XLSX.utils.book_append_sheet(workBook, workSheet, 'data'); 
    XLSX.writeFile(workBook, 'temp.xlsx'); 

/**

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const EXCEL_EXTENSION ='.xlsx'

    const ws: XLSX.WorkSheet =  XLSX.utils.sheet_to_json(this.objReceta);
    const wb: XLSX.WorkBook = {Sheets:{'data':ws},SheetNames:['data']};
    const excelBuffer: any = XLSX.write(wb,{bookType:'xlsx', type:'array'})

    const blobData = new Blob([excelBuffer],{type:EXCEL_TYPE});
    this.filerSaver.save(blobData,"RecetasActivas")
    

 * 
 *     const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,this.fileName)
 * 
 * 
 */

  }


  marcarDigitada(){
  
  let infoReceta:DigitacionReceta[]=[];

    this.selectedReceta.forEach(receta => {

    let dato : DigitacionReceta = {
      id:0,
      cedula: receta.cedula,
      nombre: receta.nombre,
      apellido1: receta.apellido1,
      apellido2: receta.apellido2,
      fechaAtencion:receta.fechaAtencion,
      fechaAbscripcion: receta.fechaAbscripcion,
      idLugarRetiro: receta.idLugarRetiro,
      idEstadoReceta: 2,
      idAtencion: receta.idAtencion,
      observacion: receta.observacion,
      digitador: this.nombre,
      fechaDigitacion:new Date()
    } as DigitacionReceta;

    infoReceta.push(dato);

  })
 
    this.DigitacionRecetaServicio.digitarReceta(infoReceta).subscribe(
      {
        next: (res) => {
          Swal.fire({
            title: '',
            text: 'Proceso realizado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.CargarRecetas();
        },
        error: (e) =>{
          console.error(e)
          Swal.fire({
            title: '',
            text: 'Hubo un error al digitar la o las recetas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
      
        } 
  
      }
    )
  }
  marcarRechazada(){
   
  let infoReceta:DigitacionReceta[]=[];

    this.selectedReceta.forEach(receta => {

    let dato : DigitacionReceta = {
      id:0,
      cedula: receta.cedula,
      nombre: receta.nombre,
      apellido1: receta.apellido1,
      apellido2: receta.apellido2,
      fechaAtencion:receta.fechaAtencion,
      fechaAbscripcion: receta.fechaAbscripcion,
      idLugarRetiro: receta.idLugarRetiro,
      idEstadoReceta: 3,
      idAtencion: receta.idAtencion,
      observacion:receta.observacion,
      digitador: this.nombre,
      fechaDigitacion:new Date()
    } as DigitacionReceta;

    infoReceta.push(dato);

  })


    this.DigitacionRecetaServicio.digitarReceta(infoReceta).subscribe(
      {
        next: (res) => {
          Swal.fire({
            title: '',
            text: 'Proceso realizado con éxito',
            icon: 'success',
            confirmButtonText: 'Aceptar'
          });

          this.CargarRecetas();
        },
        error: (e) =>{
          console.error(e)
          Swal.fire({
            title: '',
            text: 'Hubo un error al rechazar la o las recetas',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
      
        } 
  
      }
    )
  }

}
