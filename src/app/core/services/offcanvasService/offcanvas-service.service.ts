import { Injectable } from '@angular/core';

declare var bootstrap: any; // Declaración global para Bootstrap

@Injectable({
  providedIn: 'root'
})
export class OffcanvasService {
  private offcanvasElement: HTMLElement | null = null;

  constructor() {}

  // Establece la referencia al offcanvas
  setOffcanvasElement(element: HTMLElement): void {
    this.offcanvasElement = element;
  }

  // Cierra el offcanvas
  closeOffcanvas(): void {
    if (this.offcanvasElement) {
      const offcanvasInstance = bootstrap.Offcanvas.getInstance(this.offcanvasElement);
      if (offcanvasInstance) {
        offcanvasInstance.hide();
      }
    }
  }
}