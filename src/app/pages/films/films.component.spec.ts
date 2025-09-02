import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilmsComponent } from './films.component';
import {ActivatedRoute} from '@angular/router';

describe('FilmsComponent', () => {
  let component: FilmsComponent;
  let fixture: ComponentFixture<FilmsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilmsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
              }
            }
          }
        }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
