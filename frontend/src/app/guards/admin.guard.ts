import { CanActivateFn, Router } from '@angular/router'
import { inject } from '@angular/core'

export function AdminGuard(): CanActivateFn {
  return () => {
    const router: Router = inject(Router)

    if (localStorage.getItem('role') === 'ADMIN') {
      return true
    }

    router?.navigate(['/home'])
    return false
  }
}
