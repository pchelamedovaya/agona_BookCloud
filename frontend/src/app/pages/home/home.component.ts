import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { IBook } from '../../types/book.interface'
import { Observable } from 'rxjs'
import { BookService } from '../../services/book.service'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
	books?: Observable<IBook[]>

	constructor(private bookService: BookService) {}

	ngOnInit(): void {
		this.getBooks()
	}

	getBooks(): void {
		this.books = this.bookService.getBooks()
	}
}

// books: IBook[] = [
// 	{
// 		id: 1,
// 		cover: '',
// 		title: 'Master and Margarita',
// 		author: 'Bulgakov M.',
// 		description:
// 			'Сat Behemoth and Woland, have not heard of Pontius Pilate. An incredibly interesting book, reading it, you will certainly immerse yourself in an exciting journey.'
// 	},
//   {
//     id: 2,
//     cover: '',
//     title: 'Arc de Triomphe',
//     author: 'Remarque E. M.',
//     description:
//       'A novel that tells the story of a refugee, a former military doctor, in Paris before World War II. A tale of loss, suffering, and the search for meaning in a world on the brink of catastrophe.'
//   },
// 	{
// 		id: 3,
// 		cover: '',
// 		title: 'The Lower Depths',
// 		author: 'Gorky M.',
// 		description:
// 			'A drama that depicts the life of the inhabitants of a communal apartment at the bottom of society. The work satirizes the loss of dignity and moral degradation.'
// 	},
// 	{
// 		id: 4,
// 		cover: '',
// 		title: 'The Cherry Orchard',
// 		author: 'Chekhov A.',
// 		description:
// 			'A play that portrays the fate of an aristocratic family that has lost its estate and is on the brink of bankruptcy. The symbolic image of the cherry orchard reflects loss and the past.'
// 	},
// 	{
// 		id: 5,
// 		cover: '',
// 		title: 'We',
// 		author: 'Zamyatin Y.',
// 		description:
// 			'A dystopian novel set in a future world dominated by the all-powerful State. Critique of totalitarianism and the loss of human individuality.'
// 	},
//   {
//     id: 6,
//     cover: '',
//     title: 'A calm Western Front',
//     author: 'Remarque E. M.',
//     description:
//       'A novel about the fate of young German soldiers during World War I. Universally acclaimed, the author depicts the inhumanity of war and its devastating impact on the human soul.'
//   }
// ]
