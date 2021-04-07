import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Train} from '../_models';
import {environment} from '../../environments/environment';
import {Citation} from '../_models/citation';

@Injectable({
  providedIn: 'root'
})
export class CitationService {
  private httpOptions = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });
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
    return this.http.delete(`${environment.apiUrl + this.uri}`, {
      headers: this.httpOptions
    });
  }

  getCitation(id: string): Observable<Train> {
    return this.http.get<Train>(`${environment.apiUrl + this.uri}/${id}`);
  }

  public addCitation(citation: Citation, authToken): Observable<Citation>{
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization: `Bearer ${authToken}`
    });
    return this.http.post<Citation>(`${environment.apiUrl + this.uri}`, citation, {
      headers: this.httpOptions
    });
  }
}
