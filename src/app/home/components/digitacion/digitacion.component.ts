import { Component, OnInit } from '@angular/core';
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
  constructor(private ActivacionRecetaServicio: ActivacionRecetaData) { }

  ngOnInit(): void {

    this.CargarRecetas();
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
    let data = document.getElementById("dt");
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb,ws,'Sheet1');

    XLSX.writeFile(wb,this.fileName)
  }


}
