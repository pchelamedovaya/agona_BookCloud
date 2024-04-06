import { ChangeDetectionStrategy, Component, Input, Output } from '@angular/core'
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isMenuOpen = false;

  constructor(public authService: AuthService) {
  }

  logoutHandler() {
    this.authService.logout()
    this.isMenuOpen = false
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
