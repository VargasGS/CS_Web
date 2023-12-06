import { NgIfContext } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Rol, Usuarios, UsuariosData } from 'src/app/models/autenticacion/usuarios';
import Swal from 'sweetalert2';




@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
  providers: [MessageService, ConfirmationService,DialogService]
})
export class RegistroComponent implements OnInit {
  
  ref: DynamicDialogRef | undefined;
  productDialog: boolean = false;

  public registroForm : FormGroup;
  public Usuario:FormControl;
  public Contrasena:FormControl;
  public Nombre:FormControl;
  public Apellido1:FormControl;
  public Apellido2:FormControl;
  public Correo:FormControl;
  public Rol:FormControl;

  public objRoles: Rol[] | undefined;
  public objUsuarios!: Usuarios[];

  public searchTable: string

  usuario!: Usuarios;

  public labelModal: string = "Registrar nuevo usuario";
  public labelBoton: string = "Registrar";

  public idU: number | undefined;


  
  constructor(public dialogService: DialogService, 
    public messageService: MessageService,
    private formBuilder: FormBuilder,
    private usuariosServicio: UsuariosData) { 

    this.Usuario = new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]);
    this.Contrasena = new FormControl('', Validators.required);
    this.Nombre = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    this.Apellido1 = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    this.Apellido2 = new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]);
    this.Correo = new FormControl('', [Validators.required, Validators.email]);
    this.Rol = new FormControl(-1, [Validators.required]);

    this.searchTable="";
    this.registroForm = this.formBuilder.group({
      Usuario:this.Usuario,
      Nombre:this.Nombre,
      Apellido1:this.Apellido1,
      Apellido2:this.Apellido2,
      Correo:this.Correo,
      Contrasena:this.Contrasena,
      Rol:this.Rol
     })

  }

  ngOnInit(): void {
    this.CargarRoles();
    this.CargarUsuarios();

  
  }

  CargarRoles(): void {
    this.usuariosServicio.listRoles().subscribe({
      next: (data) => {
        this.objRoles = data;
      },
      error: (e) => {
        console.log('cargarLugarRetiro', e);
      },
    });
  }

  CargarUsuarios(): void {
    this.usuariosServicio.listUsuarios().subscribe({
      next: (data) => {
        this.objUsuarios = data;
      },
      error: (e) => {
        console.log('cargarUsuarios', e);
      },
    });
  }

  limpiarCampos(){
    this.Nombre.setValue("");
    this.Apellido1.setValue("");
    this.Apellido2.setValue("");
    this.Usuario.setValue("");
    this.Correo.setValue("");
    this.Rol.setValue("");
    this.Contrasena.setValue("");
    this.idU=0;
  }

  modalRegistroUsuario() {
   // this.product = {};
   // this.submitted = false;

   this.labelModal="Registrar nuevo usuario";
   this.labelBoton="Registrar";
    this.productDialog = true;
    this.idU=0;
}

  ngOnDestroy() {
      if (this.ref) {
          this.ref.close();
      }
  }

  editarUsuario(usuario: Usuarios) {
    this.usuario = { ...usuario };

    this.Nombre.setValue(usuario.nombre);
    this.Apellido1.setValue(usuario.apellido1);
    this.Apellido2.setValue(usuario.apellido2);
    this.Usuario.setValue(usuario.usuario);
    this.Correo.setValue(usuario.correo);
    this.Rol.setValue(usuario.idRol);
    this.Contrasena.setValue(usuario.password)
    this.productDialog = true;

    this.labelModal="Modificar usuario";
    this.labelBoton="Modificar";

    this.idU=usuario.idUsuario;
}


  registraUsuario(){
    var infoUsuario = {
      idUsuario: this.idU,
      usuario:this.Usuario.value,
      nombre: this.Nombre.value,
      apellido1:this.Apellido1.value,
      apellido2:this.Apellido2.value,
      correo:this.Correo.value,
      idRol:this.Rol.value,
      password:this.Contrasena.value

  
     } as Usuarios;


     if(infoUsuario.idRol!=-1){
      this.usuariosServicio.registrarUsuario(infoUsuario).subscribe(
        {
          next: (res) => {
            
            if(this.idU==0){
              Swal.fire({
                title: '',
                text: 'El usuario se registró correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });

              this.limpiarCampos();
            }else{
              Swal.fire({
                title: '',
                text: 'El usuario se modificó correctamente',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });

              this.limpiarCampos();
            }
            
          
          
            this.productDialog = false;
            this.CargarUsuarios();
         
        
          
          },
          error: (e) =>{
            console.error(e)
            Swal.fire({
              title: '',
              text: 'Hubo un error al registrar el usuario',
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

  hideDialog() {
    this.productDialog = false;
   
}

}
