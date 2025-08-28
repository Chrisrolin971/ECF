import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConnexionComponent } from './connexion.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ConnexionComponent', () => {
  let component: ConnexionComponent;
  let fixture: ComponentFixture<ConnexionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConnexionComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}), // si tu utilises route.params
            snapshot: {
              paramMap: {
                get: (key: string) => null // adapte selon ce que ton composant attend
              }
            }
          }
        }]
    }).compileComponents();

    fixture = TestBed.createComponent(ConnexionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
