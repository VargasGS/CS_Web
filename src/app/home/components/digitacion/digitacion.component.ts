import { Component, OnInit } from '@angular/core';
import { FileSaverService } from 'ngx-filesaver';
import { ActivacionRecetaData, RecetaActiva } from 'src/app/models/activacion-receta/activacion-receta';
import { Usuarios } from 'src/app/models/autenticacion/usuarios';
import * as XLSX from 'xlsx'; 

@Component({
  selector: 'app-digitacion',
  templateUrl: './digitacion.component.html',
  styleUrls: ['./digitacion.component.scss']
})
export class DigitacionComponent implements OnInit {

  public objReceta!: RecetaActiva[];

  
  selectedReceta!: RecetaActiva;


  constructor(private ActivacionRecetaServicio: ActivacionRecetaData,
    private filerSaver:FileSaverService) { }

  ngOnInit(): void {

    this.CargarRecetas();
  }

  CargarRecetas(): void {
    this.ActivacionRecetaServicio.listRecetasActivas().subscribe({
      next: (data) => {
        this.objReceta = data;
        console.log(this.objReceta)
        
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
    console.log(this.selectedReceta)
  }

}
