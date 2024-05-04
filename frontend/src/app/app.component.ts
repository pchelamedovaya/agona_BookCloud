import { ChangeDetectionStrategy, Component } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
	title = 'frontend'

	hiddenRoutes: string[] = ['/signup', '/login', '/profile', '/dashboard']

	isHiddenRoute?: boolean

	constructor(private router: Router) {
		this.isHiddenRoute = this.hiddenRoutes.includes(this.router.url)
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => {
				this.isHiddenRoute = this.hiddenRoutes.includes(this.router.url)
			})
	}
}
