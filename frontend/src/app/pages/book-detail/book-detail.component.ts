import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { IBook } from '../../types/book.interface'
import { ActivatedRoute, Router } from '@angular/router'
import { BookService } from '../../services/book.service'
import { Observable } from 'rxjs'
import { Location } from '@angular/common'

@Component({
	selector: 'app-book-detail',
	templateUrl: './book-detail.component.html',
	styleUrl: './book-detail.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent implements OnInit {
	buttonPressed = false
	book?: Observable<IBook>
	bookId?: number
	favorites: number[] = []

	constructor(
		private route: ActivatedRoute,
		public bookService: BookService,
    private location: Location
	) {}

	ngOnInit(): void {
		this.bookId = +this.route.snapshot.params['id']
		this.book = this.bookService.getBook(this.bookId)

		const userId = localStorage.getItem('userId')
		if (userId) {
			const favoritesString = localStorage.getItem(`favorites_${userId}`)
			if (favoritesString) {
				this.favorites = JSON.parse(favoritesString)
				this.buttonPressed = this.favorites.includes(this.bookId)
			}
		}
	}

	toggleButton() {
		this.buttonPressed = !this.buttonPressed
		if (this.buttonPressed) {
			this.add()
		} else {
			this.delete()
		}
	}

	add() {
		const userId = localStorage.getItem('userId')
		if (userId && this.bookId && !this.favorites.includes(this.bookId)) {
			this.favorites.push(this.bookId)
			localStorage.setItem(
				`favorites_${userId}`,
				JSON.stringify(this.favorites)
			)
    }
	}

	delete() {
		const userId = localStorage.getItem('userId')
		if (userId && this.bookId) {
			const index = this.favorites.indexOf(this.bookId)
			if (index !== -1) {
				this.favorites.splice(index, 1)
				localStorage.setItem(
					`favorites_${userId}`,
					JSON.stringify(this.favorites)
				)
      }
		}
	}

	addToFavorite(id: number) {
		this.bookService.addToFavorite(id).subscribe(() => {
			this.add()
			console.log('addToFavorite, id: ' + id)
		})
	}

	deleteFromFavorite(id: number) {
		this.bookService.deleteFromFavorite(id).subscribe(() => {
			this.delete()
			console.log('deleteFromFavorite, id: ' + id)
		})
	}

  goBack() {
    this.location.back()
  }
}
