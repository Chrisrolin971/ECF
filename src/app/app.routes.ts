import { Routes } from '@angular/router';
import { HomeComponent} from './pages/home/home.component';
import { ConnexionComponent} from './pages/connexion/connexion.component';
import { FilmsComponent} from './pages/films/films.component';
import { ReservationComponent} from './pages/reservation/reservation.component';
import { ContactsComponent} from './pages/contacts/contacts.component';
import { AdminComponent} from './pages/admin/admin.component';
import { InscriptionComponent} from './pages/inscription/inscription.component';
import { CompteComponent} from './pages/compte/compte.component';
import { SeancesComponent} from './pages/seances/seances.component';
import {RecapComponent} from './pages/recap/recap.component';
import {PresentationComponent} from './pages/presentation/presentation.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'connexion', component: ConnexionComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'reservation', component: ReservationComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'inscription', component: InscriptionComponent },
  { path: 'compte', component: CompteComponent },
  { path: 'seances/:id/:cinema', component: SeancesComponent },
  { path: 'recap', component: RecapComponent },
  { path: 'presentation/:id', component: PresentationComponent },
];
