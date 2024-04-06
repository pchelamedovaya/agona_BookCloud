import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import {
	AbstractControl,
	FormControl,
	FormGroup,
	ValidatorFn,
	Validators
} from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrl: './auth-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
	@Input() isRegistrationForm = false

	hidePassword = true
	hidePasswordRepeat = true

	togglePasswordVisibility(): void {
		this.hidePassword = !this.hidePassword
	}

	togglePasswordRepeatVisibility(): void {
		this.hidePasswordRepeat = !this.hidePasswordRepeat
	}

	userData: FormGroup

	constructor(private readonly authService: AuthService) {
		this.userData = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.pattern(/.+@.+\.[A-Za-z]+$/)
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.minLength(6)
			]),
			passwordRepeat: new FormControl(
				'',
				this.isRegistrationForm
					? [Validators.required, passwordMatchValidator('password')]
					: [passwordMatchValidator('password')]
			)
		})
	}

	onSubmit() {
		const formData = {
			email: this.userData.get('email')?.value,
			password: this.userData.get('password')?.value
		}
		if (this.userData.valid) {
			if (this.isRegistrationForm) {
				this.authService.signUp(formData)
			} else if (!this.isRegistrationForm) {
				this.authService.logIn(formData)
			} else {
				console.log('error')
			}
		}
	}
}

export function passwordMatchValidator(controlName: string): ValidatorFn {
	return (control: AbstractControl): { [key: string]: any } | null => {
		const password = control.root.get(controlName)?.value
		const passwordRep = control.value
		return passwordRep === password ? null : { passwordMatch: true }
	}
}
