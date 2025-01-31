import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { OffcanvasService } from '../../core/services/offcanvasService/offcanvas-service.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, ButtonModule, NgClass],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  activeUser: any; 

       constructor(
        private offcanvasService: OffcanvasService,
      ){}

  crowList = [
    { title: 'Negro con detalles azules', description: 'Prefieres resolver acertijos', image: 'assets/placeholder-book.jpg', id: 'Azul' },
    { title: 'Negro con detalles verdes', description: 'A veces un combate es la mejor solución.', image: 'assets/placeholder-book.jpg', id: 'Verde'},
    { title: 'Negro con detalles púrpuras', description: 'Los magos hacemos las cosas a nuestra manera', image: 'assets/placeholder-book.jpg', id:'Purpura' }
  ];

  ngAfterViewInit(): void {
    const offcanvasElement = document.getElementById('offcanvasNavbar');
    if (offcanvasElement) {
      this.offcanvasService.setOffcanvasElement(offcanvasElement);
    }
  }

  closeOffcanvas(): void {
    this.offcanvasService.closeOffcanvas();
  }

}
