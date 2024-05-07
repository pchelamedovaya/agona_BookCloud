import { Injectable } from '@angular/core'
import { HttpClient, HttpParams } from '@angular/common/http'
import { map, Observable } from 'rxjs'
import { IBook } from '../types/book.interface'

@Injectable({
	providedIn: 'root'
})
export class BookService {
	constructor(private readonly http: HttpClient) {}

	getAllBooks(): Observable<IBook[]> {
		return this.http.get<any>(`books`).pipe(map(response => response.data))
	}

	getBooksForRecommendations(): Observable<IBook[]> {
		return this.http
			.get<any>(`books`, {
				params: new HttpParams().append('size', 12).append('page', 0)
			})
			.pipe(map(response => response.data))
	}

	getBook(id: number): Observable<IBook> {
		return this.http
			.get<any>(`books/${id}`)
			.pipe(map(response => response.book))
	}
}
