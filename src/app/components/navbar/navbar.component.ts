import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SessionService } from '@services/session.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    hasToken: boolean = (localStorage.getItem('token') !== null);
    email: String = localStorage.getItem('email')!;

    constructor(
        private sessionService: SessionService,
        private router: Router
    ) {
        sessionService.hasToken.subscribe(hasToken => {
            this.hasToken = hasToken;
            this.email = this.sessionService.getEmail();
        });
    }

    ngOnInit(): void { }

    logout(): void {
        this.sessionService.clear();
        this.router.navigate(['/login']);
    }
}