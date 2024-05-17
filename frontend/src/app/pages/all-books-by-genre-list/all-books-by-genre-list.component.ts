import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'
import { Observable } from 'rxjs'
import { IBook } from '../../types/book.interface'
import { BookService } from '../../services/book.service'
import { ActivatedRoute } from '@angular/router'

@Component({
	selector: 'app-all-books-by-genre-list',
	templateUrl: './all-books-by-genre-list.component.html',
	styleUrl: './all-books-by-genre-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllBooksByGenreListComponent implements OnInit {
	books?: Observable<IBook[]>
  genreTitle: string = ''

	constructor(
		private bookService: BookService,
		private route: ActivatedRoute
	) {}

	ngOnInit(): void {
		this.route.params.subscribe(params => {
			const genre = params['genre']
			if (genre) {
        this.genreTitle = genre
				this.getBooks(genre)
			}
		})
	}

	getBooks(genre: string): void {
		this.books = this.bookService.getBooksForGenre(genre)
	}
}
