import { Directive, Input } from '@angular/core'

@Directive({
  selector: 'appButton, [appButton]',
  host: {
    'class': 'buttonDir',
    '[class.buttonDir--primary]': 'theme === "primary"',
    '[class.buttonDir--disabled]': 'theme === "disabled"'
  }
})
export class ButtonDirective {

  @Input() theme: 'primary' | 'disabled' = 'primary';

  constructor() { }

}
