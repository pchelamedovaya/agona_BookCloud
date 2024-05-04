import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookDetailComponent {
  buttonPressed = false;

  toggleButton() {
    this.buttonPressed = !this.buttonPressed
  }
}
