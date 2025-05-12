import { NavigateFunction } from 'react-router-dom';

let navigateFunction: NavigateFunction | null = null;

export const setNavigate = (navFn: NavigateFunction): void => {
  navigateFunction = navFn;
};

export const redirectTo = (path: string): void => {
  if (navigateFunction) {
    navigateFunction(path);
  } else {
    console.error('Navigate function not set');
  }
};