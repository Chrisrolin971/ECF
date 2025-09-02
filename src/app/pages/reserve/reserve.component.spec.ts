import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReserveComponent } from './reserve.component';
import {ActivatedRoute} from '@angular/router';

describe('ReserveComponent', () => {
  let component: ReserveComponent;
  let fixture: ComponentFixture<ReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReserveComponent],
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

    fixture = TestBed.createComponent(ReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
