import { Component } from '@angular/core';
import { BooksApiService } from '../../core/services/books-api/books-api.service';
@Component({
  selector: 'app-book-gallery',
  imports: [],
  templateUrl: './book-gallery.component.html',
  styleUrl: './book-gallery.component.scss'
})
export class BookGalleryComponent {
  books: any[] = [];

  constructor(private booksApiService: BooksApiService) {
  }
  ngOnInit() {
    this.booksApiService.getBooks().subscribe({
      next: (response) => (this.books = response),
      error: (err) => console.error('Error:', err),
    });
    console.log(this.books);
  }
}
