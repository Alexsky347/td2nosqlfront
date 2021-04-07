import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import { first } from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  isLogged = false;
  submitted = false;
  public loginInvalid = false;
  private formSubmitAttempt = false;
  private readonly returnUrl: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private toastrService: ToastrService,
  ) {
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';


  }
  // convenience getter for easy access to form fields
  // tslint:disable-next-line:typedef
  get f() { return this.form.controls; }

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.authService.isAuthenticated.subscribe((result) => this.isLogged = result);
  }

  async onSubmit(): Promise<void> {
    this.loginInvalid = false;
    this.formSubmitAttempt = false;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.formSubmitAttempt = true;
      return;
    }

    this.authService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success('Vous êtes connecté', 'Bienvenue');
          // get return url from query parameters or default to home pag
          this.router.navigateByUrl('/');
        },
        error: error => {
          this.toastrService.error(error, 'Erreur');
          this.loginInvalid = true;
        }
      });
  }
}
