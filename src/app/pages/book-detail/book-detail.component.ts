import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesApiService } from '../../core/services/pages-api/pages-api.service';
import { NgIf,NgClass } from '@angular/common';
@Component({
  selector: 'app-book-detail',
  imports: [NgIf,NgClass],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
  bookId!: number;
  pages: any[] = [];
  showModal = false;
  currentPage: any = null;
  
  constructor(
    private route: ActivatedRoute,
    private pagesApiService: PagesApiService
  ) {}
  openModal(index: number) {
    if (index === 0) {
      this.currentPage = this.pages[index];
      this.showModal = true;
    }
  }

  // 📌 Cierra el modal
  closeModal() {
    this.showModal = false;
    this.currentPage = null;
  }
  ngOnInit() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));

    // Llamamos al servicio para obtener las páginas del libro
    this.pagesApiService.getBookPages(this.bookId).subscribe({
      next: (response) => this.pages = response,
      error: (error) => console.error('Error al obtener las páginas:', error)
    });

  }
}
