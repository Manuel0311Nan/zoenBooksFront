import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { BookGalleryComponent } from './pages/book-gallery/book-gallery.component';
import { BookDetailComponent } from './pages/book-detail/book-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { YggdrasilComponent } from './pages/yggdrasil/yggdrasil.component';
// Define las rutas principales de tu aplicación
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '', component: HomeComponent },
  { path: 'book/:id', component: BookDetailComponent },
  { path: 'gallery', component: BookGalleryComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'yggdrasil', component: YggdrasilComponent },
  { path: '**', redirectTo: '' } 
];
