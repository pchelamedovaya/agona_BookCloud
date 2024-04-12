import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IUser } from '../../types/user.interface'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent {
  users: IUser[] = [
    {
      id: 1,
      firstname: 'F',
      lastname: 'L',
      about: 'Very interesting information about F L',
      email: 'firstname@mail.ru',
      role: 'USER',
      isActive: false
    },
    {
      id: 2,
      firstname: 'Pchela',
      lastname: 'Medovayaa',
      about: 'Very interesting information about a special bee',
      email: 'phela_medovayaa@mail.ru',
      role: 'USER',
      isActive: true
    },
    {
      id: 3,
      firstname: 'Test',
      lastname: 'Test',
      about: 'Very interesting information about Test Test',
      email: 'test@mail.ru',
      role: 'USER',
      isActive: true
    }
  ]
}
