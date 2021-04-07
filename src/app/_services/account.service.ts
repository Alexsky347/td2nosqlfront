import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../_models/user';
import {environment} from '../../environments/environment';
import {AuthService} from './auth.service';


@Injectable({ providedIn: 'root' })
export class AccountService {

    constructor(
        private router: Router,
        private http: HttpClient,
        private authService: AuthService
    ) {
    }

    public getAll = () => {
        return this.http.get<User[]>(`${environment.apiUrl}/users`);
    }

    public getUser = () => {
        return this.http.get<User>(`${environment.apiUrl}/user`);
    }

    public update = (id, params) => {
        return this.http.put(`${environment.apiUrl}/users/${id}`, params)
            .pipe(map(x => {
                // update stored user if the logged in user updated their own record
                if (id == this.authService.userValue.id) {
                    // update local storage
                    const user = { ...this.authService.userValue, ...params };
                    localStorage.setItem('user', JSON.stringify(user));

                    // publish updated user to subscribers
                    this.authService.userSubject.next(user);
                }
                return x;
            }));
    }

    public delete = (id: string) => {
        return this.http.delete(`${environment.apiUrl}/users/${id}`)
            .pipe(map(x => {
                // auto logout if the logged in user deleted their own record
                if (id == this.authService.userValue.id) {
                    this.authService.logout();
                }
                return x;
            }));
    }
}
