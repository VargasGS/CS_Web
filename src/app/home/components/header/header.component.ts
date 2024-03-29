import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';
import { UsuariosData } from 'src/app/models/autenticacion/usuarios';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public nombre : string= "";
  public rol : string= "";
  public mostrar :boolean = false;
  public mostrarFuncionario :boolean = false;
  items: MenuItem[] ;
  itemsAdmin: MenuItem[] ;
  public nombre1:string = "";

  constructor(private usuariosServicio: UsuariosData) {

    this.items = [
      {
          label: 'Cerrar sesión',
          icon: 'pi pi-fw pi-sign-out',
          command: () => {
            this.logout();
        }
      }
  ];

  this.itemsAdmin = [
    {
        label: 'Usuarios',
        icon: 'pi pi-fw pi-users',
        routerLink:'/pages/registro'
    }
];

   }

  ngOnInit(): void {

    this.usuariosServicio.getFullNameFromStore().subscribe(
      {
        next: (res: any) => {
         this.nombre = this.usuariosServicio.getNombreFromToken();
      
         this.rol= this.usuariosServicio.getRoleFromToken();
       console.log(this.rol)
     
        if(this.rol==="Administrador" ){
        
          this.mostrar=true;
          this.mostrarFuncionario=true;
        }else if(this.rol==="Funcionario"){
          this.mostrar=false;
          this.mostrarFuncionario=true;
        }else{
          this.mostrar=false;
          this.mostrarFuncionario=false;
        }
      }
    })
  
  }

  logout(){
    this.nombre="";
    this.rol="";
    this.usuariosServicio.cerrarSesion();
    
  }

}
