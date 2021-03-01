import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {BookTrain} from '../_models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookTrainService {
  private httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  private uri = '/booktrain';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }

  public addBookTrain(bookTrain: BookTrain): Observable<BookTrain>{
    return this.http.post<BookTrain>(`${environment.apiUrl + this.uri}/add`, bookTrain, {
      headers: this.httpOptions
    });
  }
  public getAll = () => {
    return this.http.get(`${environment.apiUrl + this.uri}/all`);
  }
  public deleteBookTrain = (id: any) => {
    return this.http.delete(`${environment.apiUrl + this.uri}/delete/${id}`, {
      headers: this.httpOptions
    });
  }
}
