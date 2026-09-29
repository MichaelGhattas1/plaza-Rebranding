import { Routes } from '@angular/router';
import { About } from './pages/about/about';
import { Careers } from './pages/careers/careers';
import { Contact } from './pages/contact/contact';
import { Events } from './pages/events/events';
import { Home } from './pages/home/home';
import { Services } from './pages/services/services';
import { Tours } from './pages/tours/tours';

export const routes: Routes = [
  { path: '', component: Home, data: { page: 'home' } },
  { path: 'about', component: About, data: { page: 'about' } },
  { path: 'tours', component: Tours, data: { page: 'tours' } },
  { path: 'services', component: Services, data: { page: 'services' } },
  { path: 'training', component: Events, data: { page: 'events' } },
  { path: 'roles', component: Careers, data: { page: 'careers' } },
  { path: 'contact', component: Contact, data: { page: 'contact' } },
  { path: '**', redirectTo: '' },
];
