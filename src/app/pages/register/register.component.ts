import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(10)]]
    })
  }

  reloadComponent() {
    let currentUrl = this.router.url;
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate([currentUrl]);
  }

  public myError = (controlName: string, errorName: string) => {
    return this.registerForm.controls[controlName].hasError(errorName);
  }

  resetForm() {
    this.reloadComponent();
  }

  formSubmit() {
    if (this.registerForm.valid) {
      this.userService.addUser(this.registerForm.value).subscribe(res => {
        console.log(res);
        swal.fire('Success', 'User registered successfully! Now you can login!', 'success');
        this.router.navigate(['login']);
      }, error => {
        this.toastrService.error("Please try with different username!!", "User alredy exists!!", {
          timeOut: 2000,
          positionClass: 'top-right',
          progressBar: true
        });
        console.log(error);
      })

    } else {
      this.toastrService.error("Please enter valid details.", "Invalid Details", {
        timeOut: 2000,
        positionClass: 'top-right',
        progressBar: true
      });
    }
  }
}
