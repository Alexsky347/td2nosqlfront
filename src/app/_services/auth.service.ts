import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {User} from '../_models/user';
import {Router} from '@angular/router';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  public isAuthenticated = new BehaviorSubject<boolean>(false);
  private httpOptions = new HttpHeaders({
    'Access-Control-Allow-Origin': '*'
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private toastrService: ToastrService,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('user')));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  async checkAuthenticated(): Promise<BehaviorSubject<boolean>> {
    return this.isAuthenticated;
  }
  public register = (username, password) => {
    return this.http.post(`${environment.apiUrl}/users`, { username, password });
  }

  public login = (username, password) => {
    return this.http.post<User>(`${environment.apiUrl}/login`,
      { username, password },
      {headers: this.httpOptions})
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
        this.isAuthenticated.next(true);
        return true;
      })
      );
  }

  public logout = () => {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    this.userSubject.next(null);
    this.isAuthenticated.next(false);
    this.toastrService.warning('Vous êtes déconnecté', 'Bye');
    this.router.navigate(['/']);
  }


}
