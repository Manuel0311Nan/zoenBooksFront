import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  crowList = [
    { title: 'Negro con detalles azules', description: 'Prefieres resolver acertijos', image: 'assets/placeholder-book.jpg', id: 'Azul' },
    { title: 'Negro con detalles verdes', description: 'A veces un combate es la mejor solución.', image: 'assets/placeholder-book.jpg', id: 'Verde'},
    { title: 'Negro con detalles púrpuras', description: 'Los magos hacemos las cosas a nuestra manera', image: 'assets/placeholder-book.jpg', id:'Purpura' }
  ];

}
