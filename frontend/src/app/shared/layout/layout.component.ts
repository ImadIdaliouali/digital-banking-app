import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RoleService } from '../../core/services/role.service';
import { User } from '../../core/models/auth.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
})
export class LayoutComponent implements OnInit {
  sidebarCollapsed = false;
  currentUser$: Observable<User | null>;
  isAdmin$: Observable<boolean>;
  userRole$: Observable<'admin' | 'user' | null>;

  constructor(
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {
    this.currentUser$ = this.authService.currentUser$;
    this.isAdmin$ = this.roleService.isAdmin();
    this.userRole$ = this.roleService.getUserRole();
  }

  ngOnInit(): void {}

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  isActiveRoute(route: string): boolean {
    return this.router.url.startsWith(route);
  }

  getRoleDisplayName(roles: string[]): string {
    if (roles.includes('ROLE_ADMIN')) return 'Administrator';
    if (roles.includes('ROLE_USER')) return 'User';
    return 'User';
  }
}
