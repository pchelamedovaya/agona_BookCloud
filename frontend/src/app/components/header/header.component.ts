import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core'
import { AuthService } from '../../services/auth.service'
import { Subscription } from 'rxjs'

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrl: './header.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
	isMenuOpen = false
	userRole?: string
	private userRoleSubscription?: Subscription

	constructor(public authService: AuthService) {}

  ngOnInit(): void {
    const storedUserRole = localStorage.getItem('role')
    if (storedUserRole !== null) {
      this.userRole = storedUserRole
    }
    this.userRoleSubscription = this.authService.onUserRoleChanged.subscribe(
      (role: string | undefined) => {
        this.userRole = role
      }
    )
  }

	logoutHandler() {
		this.authService.logout()
		this.isMenuOpen = false
	}

	toggleMenu() {
		this.isMenuOpen = !this.isMenuOpen
	}

	ngOnDestroy(): void {
		if (this.userRoleSubscription) {
			this.userRoleSubscription.unsubscribe()
		}
	}
}
