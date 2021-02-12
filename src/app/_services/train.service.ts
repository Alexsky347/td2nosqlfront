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

  private headers = {
    headers: new HttpHeaders({
      'Access-Control-Allow-Origin': '*',
    })
  };

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
    return this.http.delete(`${environment.apiUrl + this.uri}/delete/${id}`);
  }

  private editTrain = (train: Train, id: any) => {
    return this.http.put(`${environment.apiUrl + this.uri}/edit/${id}`, train);
  }

}
