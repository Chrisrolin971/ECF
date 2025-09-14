import { TestBed } from '@angular/core/testing';
import { FilmsComponent } from './films.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FilmsService } from './films.service';

describe('FilmsComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FilmsComponent,
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [FilmsService]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(FilmsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
