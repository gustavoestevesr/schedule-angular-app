import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/schedule',
    pathMatch: 'full',
  },
  {
    path: 'schedule',
    loadComponent: () =>
      import('./components/calendar/calendar.component').then(
        (c) => c.CalendarComponent
      ),
  },
];
