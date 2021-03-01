import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from '@angular/router';
import {Train} from '../_models';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TrainService {
  private httpOptions = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  private uri = '/train';

  constructor(
    private router: Router,
    private http: HttpClient
  ) { }
  public getAll = () => {
    return this.http.get(`${environment.apiUrl + this.uri}/all`);
  }

  public getOne = (id: any) => {
    return this.http.get(`${environment.apiUrl + this.uri}/one/${id}`);
  }

  public deleteTrain = (id: any) => {
    return this.http.delete(`${environment.apiUrl + this.uri}/delete/${id}`, {
      headers: this.httpOptions
    });
  }


  public editTrain(train: Train, id: string): Observable<Train>{
    return this.http.put<Train>(`${environment.apiUrl + this.uri}/edit/${id}`, train, {
      headers: this.httpOptions
    });
  }

  getTrain(id: string): Observable<Train> {
    return this.http.get<Train>(`${environment.apiUrl + this.uri}/one/${id}`);
  }

  public addTrain(train: Train): Observable<Train>{
    return this.http.post<Train>(`${environment.apiUrl + this.uri}/add`, train, {
      headers: this.httpOptions
    });
  }
}
