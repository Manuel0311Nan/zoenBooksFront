import { Component, HostListener, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { OffcanvasService } from '../../services/offcanvasService/offcanvas-service.service';
//import { UsersService } from '../../services/users/users.service';
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  currentTheme: any;
  selectedOption: any;
  lastScrollPosition = 0;
  isNavbarVisible = true;
    /**
     * usuario activo
     */
    activeUser: any; //TODO TIPAR
     /**
     * nombre del usuario
     */
    rol: any
     activeUserName: string | undefined;

     constructor(
      private offcanvasService: OffcanvasService,
      //private usersService: UsersService,
      private router: Router,
    ){}
    ngOnInit(): void {  
      this.updateNavbarVisibility();

      // this.usersService.getCurrentUser().subscribe((user) => {
      //   console.log(user);
        
      //   this.activeUser = user;
      //   if (this.activeUser) {
      //     this.activeUserName = this.activeUser.data.user;      
      //     if (this.activeUserName) {
      //       console.log(this.activeUser.data.rol);        
      //       // this.lettersAvatar(this.activeUserName);
      //     }
      //   }
      // });
    }
    @HostListener('window:scroll', [])
  onWindowScroll(): void {
    const currentScrollPosition = window.pageYOffset;

    // Ocultar el navbar al hacer scroll hacia abajo
    if (currentScrollPosition > this.lastScrollPosition && currentScrollPosition > 50) {
      this.isNavbarVisible = false;
    }
    // Mostrar el navbar al hacer scroll hacia arriba
    else if (currentScrollPosition < this.lastScrollPosition) {
      this.isNavbarVisible = true;
    }

    this.lastScrollPosition = currentScrollPosition;

    // Actualiza las clases del navbar
    this.updateNavbarVisibility();
  }

  // Agregar o quitar clases al navbar dinámicamente
  updateNavbarVisibility(): void {
    const navbar = document.getElementById('main-navbar');
    if (navbar) {
      if (this.isNavbarVisible) {
        navbar.classList.remove('invisible');
        navbar.classList.add('visible');
      } else {
        navbar.classList.remove('visible');
        navbar.classList.add('invisible');
      }
    }
  }
    
    ngAfterViewInit(): void {
      const offcanvasElement = document.getElementById('offcanvasNavbar');
      if (offcanvasElement) {
        this.offcanvasService.setOffcanvasElement(offcanvasElement);
      }
    }
    
    // Método que se llamará al hacer clic en un enlace para cerrar el offcanvas
    closeOffcanvas(): void {
      this.offcanvasService.closeOffcanvas();
    }
    
    logout(): void {
      //this.usersService.clearCurrentUser();
      this.router.navigate(['/']);
    }

}
