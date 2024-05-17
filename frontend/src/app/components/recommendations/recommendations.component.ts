import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { filter, Observable } from 'rxjs'
import { IBook } from '../../types/book.interface'
import { BookService } from '../../services/book.service'
import { NavigationEnd, Router } from '@angular/router'

@Component({
	selector: 'app-recommendations',
	templateUrl: './recommendations.component.html',
	styleUrl: './recommendations.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecommendationsComponent implements OnInit {
	books?: Observable<IBook[]>
	recommendationRoutes: string[] = ['/home']
	isRecommendationRoutes?: boolean

	constructor(
		private bookService: BookService,
		private router: Router
	) {
		this.isRecommendationRoutes = this.recommendationRoutes.includes(
			this.router.url
		)
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => {
				this.isRecommendationRoutes = this.recommendationRoutes.includes(
					this.router.url
				)
			})
	}

	ngOnInit(): void {
		this.getBooks()
	}

	getBooks(): void {
		this.books = this.bookService.getBooksForRecommendations()
	}

  navigateToAllBooks() {
    this.router.navigate(['allbooks'])
  }
}
