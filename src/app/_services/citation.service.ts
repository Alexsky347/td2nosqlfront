import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {Citation} from '../_models/citation';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    withCredentials: true,
  };
  private uri = '/articles';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  public getAll = () => {
    return this.http.get(`${environment.apiUrl + this.uri}`);
  }
  // deleteAll
  public deleteCitations = (id: any) => {
    return this.http.delete(`${environment.apiUrl + this.uri}`, this.httpOptions);
  }

  getCitation(id: string): Observable<Citation> {
    return this.http.get<Citation>(`${environment.apiUrl + this.uri}/${id}`);
  }

  public addCitation(citation: Citation): Observable<Citation>{
    return this.http.post<Citation>(`${environment.apiUrl}/add_article`, citation);
  }
}
