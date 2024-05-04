import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'
import { passwordMatchValidator } from '../../validators'
import { Router } from '@angular/router'
import { Observer } from 'rxjs'

@Component({
	selector: 'app-auth-form',
	templateUrl: './auth-form.component.html',
	styleUrl: './auth-form.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthFormComponent {
	errorMessage: string = ''
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

	constructor(
		private readonly authService: AuthService,
		private readonly router: Router,
    private readonly cdr: ChangeDetectorRef,
	) {
		this.userData = new FormGroup({
			email: new FormControl(
				'',
				this.isRegistrationForm
					? [Validators.required, Validators.pattern(/.+@.+\.[A-Za-z]+$/)]
					: [Validators.pattern(/.+@.+\.[A-Za-z]+$/)]
			),
			login: new FormControl('', [
				Validators.required,
				Validators.pattern(/^[a-zA-Z0-9]+_?[a-zA-Z0-9]*$/)
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
			login: this.userData.get('login')?.value,
			password: this.userData.get('password')?.value
		}

		if (this.userData.valid) {
			const observer: Observer<any> = {
				next: () => {
					this.router?.navigate(['/home'])
				},
				error: err => {
					this.errorMessage = err;
          this.cdr.markForCheck();

				},
				complete: () => {}
			}

			if (this.isRegistrationForm) {
				this.authService.signUp(formData)
			} else if (!this.isRegistrationForm) {
				this.authService.logIn(formData).subscribe(observer)
			} else {
				console.log('error')
			}
		}
	}

	removeErrorMessage() {
		this.errorMessage = ''
	}
}
