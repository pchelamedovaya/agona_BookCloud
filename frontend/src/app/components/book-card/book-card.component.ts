import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IBook } from '../../types/book.interface'

@Component({
	selector: 'app-book-card',
	templateUrl: './book-card.component.html',
	styleUrl: './book-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent {
	@Input() book!: IBook
}
