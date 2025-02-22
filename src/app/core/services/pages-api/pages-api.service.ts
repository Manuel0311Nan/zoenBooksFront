import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment/environment.development';
@Injectable({
  providedIn: 'root'
})
export class PagesApiService {

  constructor(private httpClient: HttpClient) {}

  // Obtener las páginas de un libro por su ID
  getBookPages(bookId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/api/book/${bookId}/pages`);
  }
  getNextOptions(bookId: number, pageNumber: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/api/book/${bookId}/page/${pageNumber}/options`);
  }
}
