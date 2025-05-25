import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private authService: AuthService) {}

  getCurrentUser(): Observable<User | null> {
    return this.authService.currentUser$;
  }

  isAdmin(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user ? user.roles.includes('ROLE_ADMIN') : false)
    );
  }

  isUser(): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user ? user.roles.includes('ROLE_USER') : false)
    );
  }

  hasRole(role: string): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => user ? user.roles.includes(role) : false)
    );
  }

  hasAnyRole(roles: string[]): Observable<boolean> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) return false;
        return roles.some(role => user.roles.includes(role));
      })
    );
  }

  getUserRole(): Observable<'admin' | 'user' | null> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (!user) return null;
        if (user.roles.includes('ROLE_ADMIN')) return 'admin';
        if (user.roles.includes('ROLE_USER')) return 'user';
        return null;
      })
    );
  }
}
