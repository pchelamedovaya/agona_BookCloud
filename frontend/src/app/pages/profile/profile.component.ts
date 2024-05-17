import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	OnInit
} from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { UserService } from '../../services/user.service'
import { IUser } from '../../types/user.interface'

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrl: './profile.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
	profileData: FormGroup
	savedData: any = {}
	EnterInfo = false
	ButtonVisibility = false
	userDataLoaded = false

	ngOnInit() {
		this.userService.getCurrentUserInfo().subscribe({
			next: (user: IUser) => {
				// console.log('Current user info:', user)
				if (
					user.firstName &&
					user.lastName &&
					user.about &&
					user.favouriteGenres
				) {
					this.savedData = user
					this.userDataLoaded = true
					this.cdr.markForCheck()
				} else {
					console.log('User data is incomplete:', user)
				}
			},
			error: error => {
				console.error('Error getting current user info:', error)
			}
		})
	}

	constructor(
		private readonly userService: UserService,
		private readonly cdr: ChangeDetectorRef
	) {
		this.profileData = new FormGroup({
			firstName: new FormControl('', [
				Validators.pattern(/^[a-zA-Zа-яА-Я]+(?:-[a-zA-Zа-яА-Я]+)*$/)
			]),
			lastName: new FormControl('', [
				Validators.pattern(/^[a-zA-Zа-яА-Я]+(?:-[a-zA-Zа-яА-Я]+)*$/)
			]),
			about: new FormControl('', [Validators.maxLength(50)]),
			favouriteGenres: new FormControl('', [])
		})
	}

	onSubmit() {
		const formData = {
			firstName: this.profileData.get('firstName')?.value,
			lastName: this.profileData.get('lastName')?.value,
			about: this.profileData.get('about')?.value,
			favouriteGenres: this.profileData.get('favouriteGenres')?.value
		}
		if (this.profileData.valid) {
			this.userService.updateUser(formData).subscribe({
				next: user => {
					// console.log('User updated successfully:', user)
				},
				error: error => {
					console.error('Error updating user:', error)
				}
			})
			this.savedData = { ...this.profileData.value }
		} else {
			console.log('Data is not valid')
		}
	}

	onEnter() {
		this.EnterInfo = !this.EnterInfo
	}

	onInput() {
		this.ButtonVisibility = true
	}

  showFieldsForEdit() {
    this.userDataLoaded = false
  }
}
