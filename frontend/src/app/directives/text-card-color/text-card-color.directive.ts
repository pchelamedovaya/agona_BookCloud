import { Directive, Input } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router'
import { filter } from 'rxjs'

@Directive({
	selector: 'appTextCardColor, [appTextCardColor]',
	host: {
		class: 'textCardColorDir',
		'[class.textCardColorDir--light]': 'theme === "light"',
		'[class.textCardColorDir--dark]': 'theme === "dark"'
	}
})
export class TextCardColorDirective {
	@Input() theme!: 'light' | 'dark'

	lightRoutes: string[] = ['/collection', '/allbooks']

	isLightRoutes?: boolean

	constructor(private router: Router) {
		this.isLightRoutes = this.lightRoutes.includes(this.router.url)
		this.router.events
			.pipe(filter(event => event instanceof NavigationEnd))
			.subscribe(() => {
				this.isLightRoutes = this.lightRoutes.includes(this.router.url)
			})
		if (this.isLightRoutes) {
			this.theme = 'light'
		} else {
			this.theme = 'dark'
		}
	}
}
