import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { IUser } from '../../types/user.interface'
import { UserService } from '../../services/user.service'
import { Observable } from 'rxjs'

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.scss',
	changeDetection: ChangeDetectionStrategy.Default
})
export class DashboardComponent implements OnInit {
	users?: Observable<IUser[]>

	constructor(private userService: UserService) {}

	ngOnInit(): void {
		this.getUsers()
	}

	getUsers(): void {
		this.users = this.userService.getUsers()
	}
}
