import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeancesComponent } from './seances.component';
import {ActivatedRoute} from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('SeancesComponent', () => {
  let component: SeancesComponent;
  let fixture: ComponentFixture<SeancesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SeancesComponent, HttpClientTestingModule],
      providers: [
      {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: (key: string) => {
                if (key === 'titre') return 'Les 4 Fantastiques';
                return null;
              }
            }
          }
        }
      }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeancesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
