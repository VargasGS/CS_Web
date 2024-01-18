import { ChangeDetectorRef, Component, ElementRef, HostListener, InjectionToken, OnInit, ViewChild } from '@angular/core';
import { NbDialogService, NbMenuService, NbSidebarService, NbThemeService } from '@nebular/theme';

import { NbMenuItem } from '@nebular/theme';
import { map, takeUntil } from 'rxjs/operators';
import { Subject, filter } from 'rxjs';
import { Router } from '@angular/router';

import { NbContextMenuDirective } from '@nebular/theme';
import { UsuariosData } from '../models/autenticacion/usuarios';
import { MenuItem, MessageService } from 'primeng/api';
import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';





@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers:[MessageService]
})
export class HomeComponent implements OnInit {


  currentYear: number;

  constructor(private usuariosServicio: UsuariosData,
    private sidebarService: NbSidebarService,
    private messageService: MessageService) { 

      this.currentYear = new Date().getFullYear();
    
  }

  ngOnInit() {

   
  }

 
/*
  toggle() {
      this.sidebarService.toggle();
  
  }
*/


}
