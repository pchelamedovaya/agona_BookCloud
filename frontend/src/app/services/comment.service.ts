import { map, Observable } from 'rxjs'
import { IComment, IComments } from '../types/comments.interface'
import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

@Injectable({
	providedIn: 'root'
})
export class CommentService {
	constructor(private readonly http: HttpClient) {}

	getComments(bookId: number): Observable<IComment[]> {
		return this.http
			.get<IComments>(`books/comments/${bookId}`)
			.pipe(map((data: IComments) => data.comments))
	}

	addComment(bookId: number, comment: string): Observable<any> {
		const url = `books/comments/${bookId}`
		const body = { comment }
		return this.http.post(url, body)
	}
}
