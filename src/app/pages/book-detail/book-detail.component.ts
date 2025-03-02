import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PagesApiService } from '../../core/services/pages-api/pages-api.service';
import { NgIf,NgClass } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-book-detail',
  imports: [NgIf,NgClass],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss'
})
export class BookDetailComponent {
[x: string]: any;
  bookId!: number;
  pages: any[] = [];
  showModal = false;
  showNextOptionsModal = false;
  currentPage: any = null;
  currentPageIndex = 0;
  paginatedContent: string[] = [];
  nextOptions: any[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private pagesApiService: PagesApiService,
    private cdr: ChangeDetectorRef
  ) {}
  openModal(index: number) {
    if (index === 0) {
      this.currentPage = this.pages[index];
  
      console.log("Texto original:", this.currentPage.content); // Verifica en consola
  
      this.paginatedContent = this.splitTextIntoPages(this.currentPage.content, 1500);
      this.currentPageIndex = 0;
  
      console.log("Contenido paginado:", this.paginatedContent); // Verifica en consola
  
      this.showModal = true;
    }
  }
  

  // 📌 Cierra el modal
  closeModal() {
    this.showModal = false;
    this.currentPage = null;
    this.paginatedContent = [];
  }
  splitTextIntoPages(text: string, charLimit: number): string[] {
    if (!text) return [];
  
    let sentences = text.match(/[^.!?]+[.!?]+/g) || [text];
    let pages: string[] = [];
    let currentPage = "";
  
    for (let sentence of sentences) {
      if ((currentPage + sentence).length <= charLimit) {
        currentPage += sentence + " ";
      } else {
        pages.push(currentPage.trim());
        currentPage = sentence + " ";
      }
    }
  
    if (currentPage) pages.push(currentPage.trim());
  
    return pages;
  }
  
  loadNextOptions() {
    this.pagesApiService.getNextOptions(this.bookId, this.currentPage.pageNumber).subscribe({
      next: (response) => {
        this.nextOptions = response.map((option: string) => {
          //TODO: Lee bien el next options, pero no muestra los botones con las opciones
          console.log("Texto de opción original:", option);
          let match = option.match(/^Página (\d+)(?:, (.+))?$/);
          console.log("Resultado del match:", match);
          return match ? { pageNumber: parseInt(match[1]), description: match[2] } : null;
        }).filter(option => option !== null);
  
        console.log("Opciones de continuación:", this.nextOptions);
      },
      error: (error) => console.error("Error al obtener opciones:", error)
    });
  }
  nextPage() {
    if (this.currentPageIndex < this.paginatedContent.length - 1) {
      this.currentPageIndex++;
    }
  }

  prevPage() {
    if (this.currentPageIndex > 0) {
      this.currentPageIndex--;
    }
  }
  openNextOptionsModal() {
    this.showModal = false; 
    this.showNextOptionsModal = true; 
    this.loadNextOptions(); 
  }

  goToNextPage(pageNumber: number) {
    this.showNextOptionsModal = false;
  
    let nextPageIndex = this.pages.findIndex(p => p.pageNumber === pageNumber);

    if (nextPageIndex !== -1) {
      this.pages[nextPageIndex].unlocked = true;

      // Guarda el estado en localStorage
      localStorage.setItem("unlockedPages", JSON.stringify(this.pages.map(p => p.unlocked)));
  
      // 🚀 **Forzamos la detección de cambios**
      this.cdr.detectChanges();
  

      this.openModal(nextPageIndex);
    } else {
      console.error("No se encontró la página:", pageNumber);
    }
  }

  closeNextOptionsModal() {
    this.showNextOptionsModal = false;
  }

  ngOnInit() {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
  
    this.pagesApiService.getBookPages(this.bookId).subscribe({
      next: (response) => {
        const unlockedPages = JSON.parse(localStorage.getItem("unlockedPages") || "[]");

        this.pages = response.map((page, index) => ({
          ...page,
          unlocked: unlockedPages[index] || index === 0,
        }));
  
        console.log("Páginas cargadas:", this.pages);
      },
      error: (error) => console.error("Error al obtener las páginas:", error)
    });
  }
}
