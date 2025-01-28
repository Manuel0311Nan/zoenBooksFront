import { Component } from '@angular/core';
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
