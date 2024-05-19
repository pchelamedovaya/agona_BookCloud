import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core'
import { IBook } from '../../types/book.interface'
import { ActivatedRoute } from '@angular/router'
import { BookService } from '../../services/book.service'
import { Observable } from 'rxjs'
import { IComment } from '../../types/comments.interface'
import { CommentService } from '../../services/comment.service'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { IUser } from '../../types/user.interface'
import { UserService } from '../../services/user.service'

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
	comments: IComment[] = []
	commentForm: FormGroup
	currentUser: IUser | null = null
  commentsToShow: number = 3
  displayedComments: IComment[] = []

  constructor(
		private route: ActivatedRoute,
		public bookService: BookService,
		private commentService: CommentService,
		private cdr: ChangeDetectorRef,
		private userService: UserService
	) {
		this.commentForm = new FormGroup({
			comment: new FormControl('', [Validators.required])
		})
	}

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
			this.fetchCurrentUser()
		}
		this.getComments(this.bookId)
	}

	fetchCurrentUser() {
		this.userService.getCurrentUserInfo().subscribe(user => {
			this.currentUser = user
			this.cdr.detectChanges()
		})
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

  getComments(bookId: number): void {
    this.commentService.getComments(bookId).subscribe((comments) => {
      this.comments = comments
      this.updateDisplayedComments()
      this.cdr.markForCheck()
    })
  }

  updateDisplayedComments(): void {
    this.displayedComments = this.comments.slice(0, this.commentsToShow)
  }

  showMoreComments(): void {
    this.commentsToShow += 3
    this.updateDisplayedComments()
  }

  onSubmit() {
    if (this.commentForm.valid) {
      const comment = this.commentForm.value.comment
      this.commentService.addComment(this.bookId!, comment).subscribe(() => {
        this.getComments(this.bookId!)
        this.commentForm.reset()
        this.cdr.markForCheck()
      })
    }
  }
}
