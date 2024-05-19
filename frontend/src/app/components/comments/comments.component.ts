import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IComment } from '../../types/comments.interface'

@Component({
	selector: 'app-comments',
	templateUrl: './comments.component.html',
	styleUrl: './comments.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CommentsComponent {
	@Input() comment!: IComment
}
