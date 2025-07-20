import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/model/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);

  user: User | null = null;
  orderedKeys: string[] = [];

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.userService.getUsers().subscribe((data: User[]) => {
      this.user = data.find((u) => u.id === id) || null;
      if (this.user) {
        this.setOrderedKeys(this.user);
      }
    });
  }

   // Sorting and adding ID and Name on top from other fields
    private setOrderedKeys(user: User) {
    // Extract keys, remove id and name
    const keys = Object.keys(user).filter(k => k !== 'id' && k !== 'name');

    // Put 'id' first, 'name' second, then the rest
    this.orderedKeys = ['id', 'name', ...keys];
  }
}
