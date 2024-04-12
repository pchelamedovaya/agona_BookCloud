import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { IUser } from '../../types/user.interface'

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
	@Input() user!: IUser
}
