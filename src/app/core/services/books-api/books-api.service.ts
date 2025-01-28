import { Injectable } from '@angular/core';
import { environment } from '../../../../environment/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  getBooks(): Observable<any> {
    return this.httpClient.get<any[]>(`${environment.apiUrl}/api/book`);
  }
}
