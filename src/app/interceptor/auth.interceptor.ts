
import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
    constructor(
        public toastr: ToastrService,
        private router: Router
    ) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        let jwt = localStorage.getItem('token');
        let header: any = {
            authorization: `${jwt}`,
        };

        return next
            .handle(
                request.clone({
                    setHeaders: header,
                })
            )
            .pipe(
                tap({
                    next: (event) => {
                        if (event instanceof HttpResponse) {
                            if (event.status == 401) {
                                localStorage.removeItem('token')
                                this.router.navigate(['login']);
                                this.toastr.error(
                                    'You are not authorized please login and try again later'
                                );
                            }
                        }
                        return event;
                    },
                    error: (error) => {
                        if (error.status === 400) {
                            error.error.message ?
                                this.toastr.error(
                                    error.error.message
                                ) : this.toastr.error(
                                    'Bad Request'
                                )
                        } else if (error.status === 401) {
                            localStorage.removeItem('token')
                            this.router.navigate(['login']);
                            this.toastr.error(
                                'You are not authorized please login and try again later'
                            );
                        } else if (error.status === 403) {
                            localStorage.removeItem('token')
                            this.router.navigate(['login']);
                        } else if (error.status === 404) {
                            this.toastr.error('Page Not Found!', 'Error!');
                        } else if (error.status === 500) {
                            this.toastr.error(error.error.message, 'Error!');
                        } else {
                            this.toastr.error(error.error.message, 'Error!');
                        }
                    },
                })
            );
    }
}