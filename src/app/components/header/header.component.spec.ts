import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import {ActivatedRoute} from '@angular/router';
import {of} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
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

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
