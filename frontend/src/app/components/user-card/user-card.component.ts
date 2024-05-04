import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	Input
} from '@angular/core'
import { IUser } from '../../types/user.interface'
import { UserService } from '../../services/user.service'
import { tap } from 'rxjs'

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrl: './user-card.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserCardComponent {
	@Input() user!: IUser

	constructor(
		private userService: UserService,
		private cdr: ChangeDetectorRef
	) {}

	toggleState(userId: number): void {
		this.userService
			.toggleUserState(userId)
			.pipe(
				tap(updatedUser => {
					this.user = updatedUser
					this.cdr.detectChanges()
				})
			)
			.subscribe()
	}
}
