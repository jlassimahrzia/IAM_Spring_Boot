import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AuthService } from "src/app/services/auth.service";
import { Credentials } from 'src/app/models/credentials.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

  loginForm : FormGroup = this.fb.group({
    username: [ null , [Validators.required]],
    password: [ null , [Validators.required]]
  })

  constructor(private fb: FormBuilder,
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit(): void {
  }

  login = () => {
    
    const credentials : Credentials= {
      username : this.loginForm.value.username,
      password : this.loginForm.value.password
    }

    this.authService.login(credentials)
        .subscribe({
          next: (res:any) => {    
            console.log(res);
            let jwt = res.headers.get('Authorization')
            localStorage.setItem('token',jwt.substr(7))
            this.toastr.success('Logged in successfully.','Success')
            this.loginForm.reset()
            this.router.navigate(['/admin/home'])
          }, 
          error: err => {
            console.log("err", err)
            this.toastr.error('The credentials are incorrect!','Error')
          }
        })

  }

}
