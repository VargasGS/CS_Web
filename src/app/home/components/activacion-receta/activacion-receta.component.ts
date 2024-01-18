import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { ConfirmationService, MessageService, PrimeNGConfig } from 'primeng/api';
import { Subject } from 'rxjs';
import { ActivacionReceta, ActivacionRecetaData } from 'src/app/models/activacion-receta/activacion-receta';
import { Adscritos, AdscritosData } from 'src/app/models/catalogos/adscritos';
import { LugarAtencion, LugarAtencionData } from 'src/app/models/catalogos/lugar-atencion';
import { LugarRetiro, LugarRetiroData } from 'src/app/models/catalogos/lugar-retiro';
import { Pacientes, PacientesData } from 'src/app/models/catalogos/pacientes';
import 'sweetalert2/src/sweetalert2.scss';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';



@Component({
  selector: 'app-activacion-receta',
  templateUrl: './activacion-receta.component.html',
  styleUrls: ['./activacion-receta.component.scss'],
  providers: [ConfirmationService, NbToastrService, MessageService],

})
export class ActivacionRecetaComponent implements OnInit {

  public activacionRecetaForm : FormGroup;
  public Cedula:FormControl;
  public Nombre:FormControl;
  public Apellido1:FormControl;
  public Apellido2:FormControl;
  public Correo:FormControl;
  public FechaAtencion:FormControl;
  public FechaRetiro:FormControl;
  public IdLugarRetiro:FormControl;
  public IdCreacionReceta:FormControl;

  public objLugarRetiro: LugarRetiro[] | undefined;
  public objLugarAtencion: LugarAtencion[] | undefined;
  public objPaciente: Pacientes[] | undefined;
  public objAdscrito: Adscritos[] | undefined;

  public fechaFormateada: string | undefined;

  public loading= false;

  lang: string = "es";
  subscription: Subscription;

  protected readonly unsubcribe$ = new Subject<void>();


  constructor(
    private formBuilder: FormBuilder,
    private lugarRetiroServicio: LugarRetiroData,
    private lugarAtencionServicio: LugarAtencionData,
    private pacienteServicio: PacientesData,
    private adscritoServicio: AdscritosData,
    private activacionRecetaServicio: ActivacionRecetaData,
    private config: PrimeNGConfig,
    private translateService: TranslateService,
    private router:Router) {

      translateService.setDefaultLang('es');
      this.Cedula = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
      this.Nombre = new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑ ]*')]);
      this.Apellido1 = new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑ ]*')]);
      this.Apellido2 = new FormControl('', [Validators.required, Validators.pattern('[a-zA-ZñÑ ]*')]);
      this.Correo = new FormControl('', [Validators.required, Validators.email]);
      this.FechaAtencion = new FormControl('', Validators.required);
      this.FechaRetiro = new FormControl('', Validators.required);
      this.IdLugarRetiro = new FormControl(-1, [Validators.required]);
      this.IdCreacionReceta = new FormControl(-1, [Validators.required]);
    
   this.activacionRecetaForm = this.formBuilder.group({
    Cedula:this.Cedula,
    Nombre:this.Nombre,
    Apellido1:this.Apellido1,
    Apellido2:this.Apellido2,
    Correo:this.Correo,
    FechaAtencion:this.FechaAtencion,
    FechaRetiro:this.FechaRetiro,
    IdCreacionReceta:this.IdCreacionReceta,
    IdLugarRetiro:this.IdLugarRetiro,
   })

   this.subscription = this.translateService.stream('primeng').subscribe(data => {
    this.config.setTranslation(data);
});
   }

   

  ngOnInit(): void {
    this.translateService.setDefaultLang('es');
    this.CargarLugarRetiro();
    this.CargarLugarAtencion();
   
  }

  
  toggleLoadingAnimation() {
    this.loading = true;
    setTimeout(() => this.loading = false, 3000);
  }


  translate(lang: string) {
    this.translateService.use(lang);
    this.translateService.get('primeng').subscribe(res => this.config.setTranslation(res));
}

  ngOnDestroy(): void {
    this.unsubcribe$.next();
    this.unsubcribe$.complete();
    if (this.subscription) {
      this.subscription.unsubscribe();
  }
  }


  get fm(){
    return this.activacionRecetaForm.controls
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

  CargarLugarAtencion(): void {
    this.lugarAtencionServicio.listLugarAtencion().subscribe({
      next: (data) => {
        this.objLugarAtencion = data;
      },
      error: (e) => {
        console.log('cargarLugarAtencion', e);
      },
    });
  }

  CargarPaciente(): void {

    
    
    this.pacienteServicio.listPacienteByCedula(this.Cedula.value).subscribe({
      next: (data) => {
        this.objPaciente = data;

        this.Nombre.setValue(this.objPaciente[0].nombre);
        this.Apellido1.setValue(this.objPaciente[0].apellido1)
        this.Apellido2.setValue(this.objPaciente[0].apellido2)
        this.Correo.setValue(this.objPaciente[0].correo)

      

      },
      error: (e) => {
        console.log('cargarCargarPaciente', e);
      },
    });
  }

  CargarAdscritos(): void {

    this.loading = true;


    if(this.Cedula.value !=""){

    this.adscritoServicio.listAdscritosByCedula(this.Cedula.value).subscribe({
      next: (data) => {

     
        this.objAdscrito = data;
     
        if(Object.keys(this.objAdscrito).length === 0 ){
          this.loading = false;
          Swal.fire({
            title: '',
            text: 'No se encontraron coincidencias con la identificación ingresada',
            icon: 'info',
            confirmButtonText: 'Aceptar'
          });
          this.limpiarCampos();
  
        }else{
          this.loading = false;
          this.Nombre.setValue(this.objAdscrito[0].nombre);
          this.Apellido1.setValue(this.objAdscrito[0].apellido1)
          this.Apellido2.setValue(this.objAdscrito[0].apellido2)
          this.Correo.setValue(this.objAdscrito[0].email)
        }

       
      },
      error: (e) => {
        this.loading = false;
        console.log('cargarCargarPaciente', e);
      },
    });
  }else{

    this.loading = false;
    Swal.fire({
      title: '',
      text: 'Debe ingresar el número de cédula para realizar la consulta',
      icon: 'info',
      confirmButtonText: 'Aceptar'
    });
  }
  }

  limpiarCampos(){{
    
    this.Cedula.setValue('');
    this.Nombre.setValue('');
    this.Apellido1.setValue('');
    this.Apellido2.setValue('');
    this.Correo.setValue('');
    this.FechaAtencion.setValue('');
    this.FechaRetiro.setValue('');
    this.IdLugarRetiro= new FormControl(-1)
    this.IdCreacionReceta =new FormControl(-1)
  }}


  GuardarActivacionReceta(){

    var fechaA = new Date(this.FechaAtencion.value);
    var fechaR = new Date(this.FechaRetiro.value);
    var date = new Date();
    const time = date.getTime();
    var fechaAtencion = new Date(fechaA.setTime(time));
    var fechaRetiro = new Date(fechaR.setTime(time));
   
    const datePipe = new DatePipe('en-US');
    const fechaFormateadaA = datePipe.transform(fechaAtencion, 'yyyy-MM-ddTHH:mm:ss');
    const fechaFormateadaR = datePipe.transform(fechaRetiro, 'yyyy-MM-ddTHH:mm:ss');
  

    var infoActivacion = {
      cedula: this.Cedula.value,
      nombre: (this.Nombre.value).toUpperCase(),
      apellido1: (this.Apellido1.value).toUpperCase(),
      apellido2: (this.Apellido2.value).toUpperCase(),
      correo: this.Correo.value,
      fechaAtencion: fechaFormateadaA,
      fechaAbscripcion: fechaFormateadaR,
      idLugarRetiro: this.IdLugarRetiro.value,
      idEstadoReceta: 1,
      idAtencion: this.IdCreacionReceta.value,
     motivoRechazo:""
    } as ActivacionReceta;


     if(infoActivacion.idAtencion!=-1 && infoActivacion.idLugarRetiro!=-1 && infoActivacion.cedula!=""
     && infoActivacion.nombre!="" && infoActivacion.apellido1!="" && infoActivacion.apellido2!=""
     && infoActivacion.correo!=""){
     
      this.activacionRecetaServicio.activarReceta(infoActivacion).subscribe(
        {
          next: (res) => {
            Swal.fire({
              title: '',
              text: 'La receta se activó correctamente',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });

            this.limpiarCampos();
        
          
          },
          error: (e) =>{
            console.error(e)
            Swal.fire({
              title: '',
              text: 'Hubo un error al activar la receta',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
        
          } 
    
        }
      )
      
     }else{
      Swal.fire({
        title: '',
        text: 'Debe llenar la información correctamente',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
     }


  }

  verEstadoReceta(){

    this.router.navigate(['pages/estadoReceta']);
  }
  }
