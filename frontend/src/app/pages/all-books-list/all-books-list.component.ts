import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { IBook } from '../../types/book.interface'
import { BookService } from '../../services/book.service'

@Component({
	selector: 'app-all-books-list',
	templateUrl: './all-books-list.component.html',
	styleUrl: './all-books-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllBooksListComponent implements OnInit {
	books?: Observable<IBook[]>

	constructor(private bookService: BookService) {}

	ngOnInit(): void {
		this.getBooks()
	}

	getBooks(): void {
		this.books = this.bookService.getAllBooks()
	}
}
