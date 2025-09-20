import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecapComponent } from './recap.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {ActivatedRoute, Router} from '@angular/router';
import {of} from 'rxjs';

describe('RecapComponent', () => {
  let component: RecapComponent;
  let fixture: ComponentFixture<RecapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecapComponent, HttpClientTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {},
            params: of({}),
            queryParams: of({})
          }
        },
        {
          provide: Router,
          useValue: {
            getCurrentNavigation: () => ({
              extras: {
                state: {
                  film: { id: 1, titre: 'Elio', image: 'assets/films/elio.jpg' },
                  seance: { idSeance: 50, salle_id: 7, prix: 8, duree: 114, heure: '18:00:00',
                    date: '2025-09-30',
                    langue: 'VF',
                    qualite: 'Standard',
                    salle: 'Salle 1',
                    cinema: 'Paris' },
                  nbPlaces: 2,
                  nbPMR: 0,
                  sieges: [],
                  selectedCinema: 'Paris'
                }
              }
            })
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
