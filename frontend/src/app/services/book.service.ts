import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { IBook, IBooksResponse } from '../types/book.interface'

@Injectable({
	providedIn: 'root'
})
export class BookService {
	constructor(private readonly http: HttpClient) {}

	getAllBooks(page: number, size: number): Observable<IBooksResponse> {
		return this.http.get<IBooksResponse>(`books?page=${page}&size=${size}`)
	}

	getBooksForRecommendations(): Observable<IBook[]> {
		return this.http
			.get<any>(`books`, {
				params: new HttpParams().append('size', 4).append('page', 0)
			})
			.pipe(map(response => response.data))
	}

	getBook(id: number): Observable<IBook> {
		return this.http
			.get<any>(`books/${id}`)
			.pipe(map(response => response.book))
	}

	getBooksForGenre(genre: string) {
		return this.http
			.get<any>(`books`, {
				params: new HttpParams().append('genre', genre)
			})
			.pipe(map(response => response.data))
	}

	addToFavorite(id: number) {
		const accessToken = localStorage.getItem('accessToken')
		const headers = new HttpHeaders({
			Authorization: `Bearer ${accessToken}`
		})
		return this.http.post<any>(`books/favorite/${id}`, { headers })
	}

	deleteFromFavorite(id: number) {
		const accessToken = localStorage.getItem('accessToken')
		const headers = new HttpHeaders({
			Authorization: `Bearer ${accessToken}`
		})
		return this.http.delete<any>(`books/favorite/${id}`, { headers })
	}

	getFavorites() {
		const accessToken = localStorage.getItem('accessToken')
		const headers = new HttpHeaders({
			Authorization: `Bearer ${accessToken}`
		})
		return this.http
			.get<any>('books/favorite', { headers })
			.pipe(map(response => response.data))
	}
}
