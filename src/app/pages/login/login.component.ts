import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  token!: string | null;

  constructor(private formBuilder: FormBuilder, private toastrService: ToastrService, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  formSubmit() {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      this.userService.generateToken(this.loginForm.value).subscribe((res: any) => {
        console.log(res);
        console.log("success");
        this.userService.loginUser(res.token);
        this.userService.getCurrentUser().subscribe((user: any) => {
          this.userService.setUser(user);
          console.log(user);

          swal.fire('Success', 'User registered successfully! Now you can login!', 'success');

          if (this.userService.getUserRole() === 'ADMIN') {
            this.router.navigate(['/admin']);
            this.userService.loginStatusSubject.next(true);
          } else if (this.userService.getUserRole() === 'NORMAL') {
            this.router.navigate(['/user-dashboard/quizzes'], { queryParams: { category: 'all' } });
            this.userService.loginStatusSubject.next(true);
          } else {
            this.userService.logoutUser();
          }


        }, error => {
          console.log(error);
          this.toastrService.error("Please try again...", "Something went wrong!!", {
            timeOut: 2000,
            positionClass: 'top-right',
            progressBar: true
          });
        })

      }, error => {
        console.log(error);
        this.toastrService.error("Please try again with valid credentials.", "Invalid Creadentials", {
          timeOut: 2000,
          positionClass: 'top-right',
          progressBar: true
        });
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
