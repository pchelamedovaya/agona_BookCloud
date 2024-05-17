import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { IBook } from '../../types/book.interface'
import { BookService } from '../../services/book.service'

@Component({
	selector: 'app-collection',
	templateUrl: './collection.component.html',
	styleUrl: './collection.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectionComponent implements OnInit {
	books?: Observable<IBook[]>

	constructor(private bookService: BookService) {}

	ngOnInit(): void {
		this.getBooks()
	}

	getBooks(): void {
		this.books = this.bookService.getFavorites()
	}
}
