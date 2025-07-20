import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../common/services/user.service';
import { User } from '../../../common/model/user.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  private router = inject(Router);
  private userService = inject(UserService);

  users: User[] = [];
  tableHeaders: string[] = [];

  currentPage = 1;
  readonly pageSize = 12;
  totalPages = 0;
  pagedUsers: User[] = [];

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      this.users = data;
      if (data.length) {
        this.tableHeaders = this.orderHeaders(Object.keys(data[0]));
      }
      this.totalPages = Math.ceil(this.users.length / this.pageSize);
      this.updatePagedUsers();
    });
  }

  private orderHeaders(headers: string[]): string[] {
    const filtered = headers.filter(h => h !== 'id' && h !== 'name');
    return ['id', 'name', ...filtered];
  }

  updatePagedUsers() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.pagedUsers = this.users.slice(startIndex, startIndex + this.pageSize);
  }

  goToPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updatePagedUsers();
  }

  goToDetails(id: string) {
    this.router.navigate(['user-management/details', id]);
  }

}
