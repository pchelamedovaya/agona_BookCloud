import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { IUser } from '../types/user.interface'
import { Observable } from 'rxjs'
import { API_URL } from '../constants/constants'

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
}
