import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { LoginService } from './login.service';
import constants from '../../assets/constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 
  role!: string;
  loginTitle!: string;
  loginImg!: string;
  loginForm!: FormGroup;
  placeholder!: string;
  errorMessage!: string;

  constructor(
    private formBuilder:FormBuilder,
    private route : ActivatedRoute,
    private router : Router,
    private loginService : LoginService
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role') ?? '';
      this.initializeComponent();
    })

    this.loginForm = this.formBuilder.group({
      'id' : ['',Validators.required],
      'password' : ['', [Validators.required,Validators.minLength(5), Validators.maxLength(10)]]
    })
  }

  initializeComponent() {
    if(this.role === 'coaches') {
      this.loginTitle = 'Login as a Coach'
      this.loginImg = '/assets/Images/LifeCoachLogIn.jpg';
      this.placeholder = 'Coach Id';
    } else if (this.role === 'users') {
      this.loginTitle = 'Login as a User'
      this.loginImg = '/assets/Images/UserLogIn.jpg'
      this.placeholder = 'User Id';
    } else {
      this.errorMessage = 'Invalid Role Specified'
    }
  }

  login() {
    if(this.loginForm.invalid)
      return;
    const {id, password} = this.loginForm.value;
    this.loginService.login(this.role, id, password).subscribe({
      next: (response) => {
        if(this.role === 'coaches')
          this.router.navigate(['/coach']);
        else if (this.role == 'users')
          this.router.navigate(['/user']);
      }
    })


  }
}
