import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    map(user => {
      if (user && user.roles.includes('ROLE_ADMIN')) {
        return true;
      }
      
      // Redirect non-admin users to their dashboard
      router.navigate(['/user-dashboard']);
      return false;
    })
  );
};
