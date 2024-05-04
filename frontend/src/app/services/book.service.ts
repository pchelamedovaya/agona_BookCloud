import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { IBook } from '../types/book.interface'

@Injectable({
	providedIn: 'root'
})
export class BookService {
	constructor(private readonly http: HttpClient) {}

	getBooks(): Observable<IBook[]> {
		return this.http.get<IBook[]>(`books`)
	}
}
