import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { IBook } from '../../types/book.interface'
import { BookService } from '../../services/book.service'
import { BehaviorSubject, tap } from 'rxjs'
import { PageEvent } from '@angular/material/paginator'
import { animate, state, style, transition, trigger } from '@angular/animations'

@Component({
	selector: 'app-all-books-list',
	templateUrl: './all-books-list.component.html',
	styleUrl: './all-books-list.component.scss',
	animations: [
		trigger('fadeInOut', [
			state(
				'void',
				style({
					opacity: 0
				})
			),
			transition('void <=> *', [animate(100)])
		])
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AllBooksListComponent implements OnInit {
	books$ = new BehaviorSubject<IBook[]>([])
	totalBooks$ = new BehaviorSubject<number>(0)
	isLoading$ = new BehaviorSubject<boolean>(true)
	currentPage = 0
	pageSize = 10

	constructor(private bookService: BookService) {}

	ngOnInit(): void {
		this.getBooks()
	}

	getBooks(): void {
		this.isLoading$.next(true)
		this.bookService
			.getAllBooks(this.currentPage, this.pageSize)
			.pipe(
				tap(response => {
					this.books$.next(response.data)
					this.totalBooks$.next(response.totalElements)
					this.isLoading$.next(false)
				})
			)
			.subscribe()
	}

	onPageChange(event: PageEvent): void {
		this.currentPage = event.pageIndex
		this.pageSize = event.pageSize
		this.books$.next([])
		this.getBooks()
	}
}
