import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IUser, IUserUpdate } from '../types/user.interface'
import { Observable } from 'rxjs'

@Injectable({
	providedIn: 'root'
})
export class UserService {
	constructor(private readonly http: HttpClient) {}

	getUsers(): Observable<IUser[]> {
		const accessToken = localStorage.getItem('accessToken')
		const headers = new HttpHeaders({
			Authorization: `Bearer ${accessToken}`
		})
		return this.http.get<IUser[]>(`users`, { headers })
	}

	toggleUserState(userId: number): Observable<IUser> {
		return this.http.put<IUser>(`users/${userId}/toggle-state`, {})
	}

	updateUser(data: IUserUpdate): Observable<IUser> {
		const accessToken = localStorage.getItem('accessToken')
		const headers = new HttpHeaders({
			Authorization: `Bearer ${accessToken}`
		})
		return this.http.put<IUser>(`users`, data, { headers })
	}

	getCurrentUserInfo(): Observable<IUser> {
		const accessToken = localStorage.getItem('accessToken')
		const headers = new HttpHeaders({
			Authorization: `Bearer ${accessToken}`
		})
		return this.http.get<IUser>(`users/currentUserInfo`, { headers })
	}

  updateAvatar() {

  }

  getAvatar() {

  }
}
