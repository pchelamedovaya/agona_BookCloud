import { Injectable } from '@angular/core'
import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http'
import { Observable } from 'rxjs'
import { API_URL } from '../constants/constants'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
		const accessToken = localStorage.getItem('accessToken')

		if (accessToken) {
			req = req.clone({
				setHeaders: {
					Authorization: `Bearer ${accessToken}`
				},
				url: `${API_URL}/${req.url}`
			})
		}
		return next.handle(req)
	}
}
