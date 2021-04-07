import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../_services/auth.service';
import {first} from 'rxjs/operators';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
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

  async ngOnInit(): Promise<void> {
    this.form = this.fb.group({
      username: '',
      email: ['', Validators.email],
      password: ''
    });
    this.authService.isAuthenticated.subscribe((result) => {
      if (result){
        this.router.navigate([this.returnUrl]);
      }
    });
  }
  get f() { return this.form.controls; }

  async onSubmit(): Promise<void> {
    this.formSubmitAttempt = false;

    // stop here if form is invalid
    if (this.form.invalid) {
      this.formSubmitAttempt = true;
      return;
    }

    this.authService.register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe({
        next: () => {
          this.toastrService.success('Votre compte a été créé', 'Bienveue');
          // get return url from query parameters or default to home pag
          this.router.navigateByUrl('/login');
        },
        error: error => {
          console.log('rr => ', error);
          this.toastrService.error(error, 'Erreur');
        }
      });
  }

}
