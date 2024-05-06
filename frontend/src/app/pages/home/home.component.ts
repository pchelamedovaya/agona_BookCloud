import { ChangeDetectionStrategy, Component } from '@angular/core'
import { Router } from '@angular/router'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrl: './home.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
	constructor(private router: Router) {}

	redirectToSearch() {
		this.router.navigate(['/search'])
	}
}
