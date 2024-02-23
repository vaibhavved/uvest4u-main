import { CanActivateFn } from '@angular/router';

export const keepStorageGuardGuard: CanActivateFn = (route, state) => {
  if(route.routeConfig?.path!='investor-type' && route.routeConfig?.path!='analysis'){
    localStorage.removeItem('repliedAnswers')
  }
  return true;
};
