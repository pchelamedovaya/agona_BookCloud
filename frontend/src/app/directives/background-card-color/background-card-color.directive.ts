import { Directive, Input } from '@angular/core'

@Directive({
  selector: 'appBackgroundCardColor, [appBackgroundCardColor]',
  host: {
    'class': 'bgCardColorDir',
    '[class.bgCardColorDir--light]': 'theme === "light"',
    '[class.bgCardColorDir--dark]': 'theme === "dark"'
  }
})
export class BackgroundCardColorDirective {

  @Input() theme!: 'light' | 'dark'

  constructor() { }

}
