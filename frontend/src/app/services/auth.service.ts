import { Injectable, signal } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { IAuthData, IAuthUser } from '../types/user.interface'
import { API_URL } from '../constants/constants'
import { catchError, Observable, Subject, tap, throwError } from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	isAuthSignal = signal<boolean>(false)
	onUserRoleChanged: Subject<string | undefined> = new Subject<
		string | undefined
	>()

	constructor(
		private readonly http: HttpClient,
		private readonly router: Router
	) {
		const accessToken = localStorage.getItem('accessToken')
		this.isAuthSignal.set(!!accessToken)
	}

	signUp(userData: IAuthUser) {
		return this.http
			.post(`${API_URL}/auth/signup`, userData)
			.pipe(
				tap(() => {
					this.logIn(userData).subscribe(() => {
						this.router?.navigate(['/home'])
					})
				}),
				catchError(err => {
					throw new Error(err.message)
				})
			)
			.subscribe()
	}

	logIn(userData: IAuthUser) {
		return this.http.post<IAuthData>(`${API_URL}/auth/login`, userData).pipe(
			tap((response: IAuthData) => {
				localStorage.setItem('accessToken', response.accessToken)
				localStorage.setItem('refreshToken', response.refreshToken)
				localStorage.setItem('role', response.role)
				this.onUserRoleChanged.next(response.role)
				this.isAuthSignal.set(true)
			}),
			catchError(err => {
				if (err.status === 401) {
					return new Observable(observer => {
						observer.error('Incorrect email or password')
            console.log('Incorrect email or password')
					})
				} else if (err.status === 403) {
					return new Observable(observer => {
						observer.error('You are banned. Access denied')
            console.log('You are banned. Access denied')
					})
				}
				throw new Error(err.message)
			})
		)
	}

	public refresh(): Observable<IAuthData> {
		const refreshToken = localStorage.getItem('refreshToken')
		const accessToken = localStorage.getItem('accessToken')

		if (!refreshToken) {
			return throwError('Refresh token not found')
		}
		return this.http.post<IAuthData>(
			`${API_URL}/auth/refresh`,
			{ refreshToken },
			{
				headers: {
					Authorization: `Bearer ${accessToken}`
				}
			}
		)
	}

	logout() {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		localStorage.removeItem('role')
		this.onUserRoleChanged.next(undefined)
		this.isAuthSignal.set(false)
		this.router?.navigate(['/login'])
	}
}
