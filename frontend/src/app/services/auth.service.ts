import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IAuthUser, IToken } from '../types/user.interface'
import { API_URL } from '../constants/constants'
import { catchError, tap } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isAuthSignal = signal<boolean>(false)

	constructor(
		private readonly http: HttpClient,
		private readonly router: Router
	) {
		const token = localStorage.getItem('token')
		this.isAuthSignal.set(!!token)
	}

	signUp(userData: IAuthUser) {
		return this.http
			.post(`${API_URL}/signup`, userData)
			.pipe(
				tap(() => {
					this.logIn(userData)
				}),
				catchError(err => {
					throw new Error(err.message)
				})
			)
			.subscribe()
	}

	logIn(userData: IAuthUser) {
		return this.http
			.post<IToken>(`${API_URL}/login`, userData)
			.pipe(
				tap((response: IToken) => {
					localStorage.setItem('token', response.token)
					this.isAuthSignal.set(true)
				}),
				catchError(err => {
					throw new Error(err.message)
				})
			)
			.subscribe(() => {
        this.router?.navigate(['/home'])
      })
	}

  logout() {
    localStorage.removeItem("token")
    this.isAuthSignal.set(false)
    this.router?.navigate(['/login'])
  }
}
