import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
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
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
