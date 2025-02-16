import { Component } from '@angular/core';
import { BooksApiService } from '../../core/services/books-api/books-api.service';
import { timer } from 'rxjs';
import { NgIf } from '@angular/common';
import { Skeleton } from 'primeng/skeleton';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-book-gallery',
  imports: [NgIf, Skeleton, RouterModule],
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.scss'
})
export class BookGalleryComponent {
  books: any[] = [];
  placeholderBooks = [
    { title: 'Libro Misterioso', description: 'Una gran historia...', image: 'assets/placeholder-book.jpg' },
    { title: 'Aventura en Midgard', description: 'Descubre tierras míticas...', image: 'assets/placeholder-book.jpg' },
    { title: 'La Torre de los Sabios', description: 'Una historia mágica...', image: 'assets/placeholder-book.jpg' }
  ];
  isLoading = true;
  timeoutReached = false;

  constructor(private booksApiService: BooksApiService) {
  }
  ngOnInit() {

    const timeout = timer(60000).subscribe(() => {
      if (this.isLoading) {
        this.timeoutReached = true;
        this.isLoading = false; // Detenemos el skeleton
      }
    });

    this.booksApiService.getBooks().subscribe({
      next: (data) => {
        this.books = data;
        this.isLoading = false; // Se detiene el skeleton si llegan los datos
        timeout.unsubscribe(); // Cancela el timeout si la API responde antes del minuto
      },
      error: () => {
        this.isLoading = false;
        this.timeoutReached = true; // Si hay error, se muestran los elementos precargados
        timeout.unsubscribe();
      }
    });
  }
}
