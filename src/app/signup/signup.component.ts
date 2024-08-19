import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupService } from './signup.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  role!: string;
  signUpTitle!: string;
  signUpImg!: string;
  formDisplay = true;
  errorMessage = '';
  userregisterForm!: FormGroup;
  coachregisterForm!: FormGroup;
  userId! : string;
  coachId! : string;
  registrationSuccess!: boolean;

  constructor(
    private formBuilder : FormBuilder, 
    private router:Router,
    private route : ActivatedRoute,
    private signUpService : SignupService
  ) { }

  ngOnInit() : void {
    this.route.paramMap.subscribe(params => {
      this.role = params.get('role') ?? '';
      this.initializeComponent();
    })

    this.userregisterForm = this.formBuilder.group({
      name : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      mobileNumber : ['',[Validators.required, Validators.pattern('/^\d{10}$/')]],
      email : ['',[Validators.required, Validators.email]],
      dateOfBirth : ['',[Validators.required, ageCalculator(20,100)]],
      gender : ['',Validators.required],
      pincode : ['',[Validators.required, Validators.pattern('/^\d{6}$/')]],
      city : ['',[Validators.required, Validators.minLength(6)], Validators.maxLength(20)],
      state : ['',[Validators.required,Validators.minLength(6), Validators.maxLength(20)]],
      country : ['',[Validators.required,Validators.minLength(6), Validators.maxLength(20)]],
    });


    this.coachregisterForm = this.formBuilder.group ({
      name : ['',[Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      password : ['',[Validators.required,Validators.minLength(5),Validators.maxLength(10)]],
      mobileNumber : ['',[Validators.required, Validators.pattern('/^\d{10}$/')]],
      dateOfBirth : ['',[Validators.required, ageCalculator(20,100)]],
      gender : ['',Validators.required],
      speciality : ['',[Validators.required,Validators.minLength(10), Validators.maxLength(50)]],
    });
  }

  initializeComponent() {
    if(this.role === 'coaches') {
      this.signUpTitle = 'Life Coach Profile'
      this.signUpImg = '/assets/Images/LifeCoachLogIn.jpg';
    } else if (this.role === 'users') {
      this.signUpTitle = 'User Profile'
      this.signUpImg = '/assets/Images/UserLogIn.jpg'
    } else {
      this.formDisplay = false;
      this.errorMessage = 'Invalid Role Specified'
    }
  }

  coachRegister():void {
    // if(this.coachregisterForm.invalid){
    //   this.coachregisterForm.markAllAsTouched();
    //   return;
    // }
    const coachData = this.coachregisterForm.value;
    this.signUpService.register('coaches',coachData).subscribe ({
      next: (response) => {
        this.coachId = response.id;
        this.registrationSuccess = true;
      },
      error: (error) => {
        this.errorMessage = 'Registraton Failed. Please try again';
      }
    });
  }

  userRegister() {
    // if(this.userregisterForm.invalid){
    //   this.userregisterForm.markAllAsTouched();
    //   return;
    // }
    const userData = this.userregisterForm.value;
    this.signUpService.register('users',userData).subscribe ({
      next: (response) => {
        this.userId = response.id;
        this.registrationSuccess = true;      },
      error: (error) => {
        this.errorMessage = 'Registraton Failed. Please try again';
      }
    });
  }

  directLogin(): void {
    const path = this.role === 'coaches' ? 'login/coaches' : 'login/users';
    this.router.navigate([path]);
  }

}

function ageCalculator(minAge: number, maxAge: number) {
  return (control: FormControl): { [key: string]: boolean } | null => {
    const birthDate = new Date(control.value);
    if (isNaN(birthDate.getTime())) { 
      return { dateInvalid: true };
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    if (age < minAge || age > maxAge) {
      return { ageInvalid: true };
    }

    return null;
  };
}
