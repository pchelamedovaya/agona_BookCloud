import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { IBook } from '../../types/book.interface'
import { ActivatedRoute } from '@angular/router'
import { BookService } from '../../services/book.service'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrl: './book-detail.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent implements OnInit {
	buttonPressed = false
	book?: Observable<IBook>
	id?: number

	constructor(
		private route: ActivatedRoute,
		public bookService: BookService
	) {}

	ngOnInit(): void {
		this.id = +this.route.snapshot.params['id']
		this.book = this.bookService.getBook(this.id)
	}

	toggleButton() {
		this.buttonPressed = !this.buttonPressed
	}
}
