import { AbstractControl, ValidatorFn } from '@angular/forms'

export function passwordMatchValidator(controlName: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const password = control.root.get(controlName)?.value
    const passwordRep = control.value
    return passwordRep === password ? null : { passwordMatch: true }
  }
}
