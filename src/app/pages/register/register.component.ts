import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

import { User } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user: User = new User();
    confirmPassword: string = '';

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    ngOnInit(): void { }

    onSubmit() {
        this.userService.register(this.user).subscribe((response: Record<string, any>) => {
            if (response['result'] === 'added') {
                Swal.fire({
                    title: 'Registration Successful',
                    text: 'You can now login using your new account',
                    icon: 'success'
                }).then(() => {
                    this.router.navigate(['/login']);
                });
            }
        });
    }
}