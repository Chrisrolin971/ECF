import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminComponent } from './admin.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AdminService, Avis, Film, Salle, Utilisateurs} from '../../services/admin.service';
import {of} from 'rxjs';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;
  let adminServiceSpy: jasmine.SpyObj<AdminService>;

  const mockFilm: Film = {
    id: 1,
    titre: 'Film test',
    description: 'Un film de test',
    note: 4,
    categorie: 'Action',
    image: 'film.jpg',
    coeur: false,
    duree: 120,
    date_sortie: '2025-01-01',
    pegi: 12
  };

  const mockSalle: Salle = {
    numero: 1,
    nom: 'Salle 1',
    capacite: 200,
    cinema: 'Cinephoria',
    qualite: 'IMAX'
  };

  const mockUtilisateur: Utilisateurs = {
    id: 1,
    nom: 'Dupont',
    prenom: 'Jean',
    pseudo: 'jdupont',
    email: 'jean.dupont@test.com',
    motDePasse: 'Password123!',
    role: 'employe'
  };

  const mockAvis: Avis = {
    id: 1,
    note: 5,
    commentaire: 'Excellent film !',
    date: new Date('2025-01-01'),
    titre: 'Avis test',
    pseudo: 'jdupont'
  };

  beforeEach(async () => {
    adminServiceSpy = jasmine.createSpyObj('AdminService', [
      'getFilms', 'getSalles', 'getUtilisateurs', 'getAvis',
      'validerAvis', 'supprimerAvis', 'supprimerEmploye',
      'supprimerFilm', 'creerUtilisateur', 'updateMotDePasseEmploye',
      'modifierFilm', 'creerFilm'
    ]);

    adminServiceSpy.getFilms.and.returnValue(of([]));
    adminServiceSpy.getSalles.and.returnValue(of([]));
    adminServiceSpy.getUtilisateurs.and.returnValue(of([]));
    adminServiceSpy.getAvis.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [AdminComponent, HttpClientTestingModule],
      providers: [
        { provide: AdminService, useValue: adminServiceSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load films, salles, utilisateurs and avis on init', () => {
    adminServiceSpy.getFilms.and.returnValue(of([mockFilm]));
    adminServiceSpy.getSalles.and.returnValue(of([mockSalle]));
    adminServiceSpy.getUtilisateurs.and.returnValue(of([mockUtilisateur]));
    adminServiceSpy.getAvis.and.returnValue(of([mockAvis]));

    component.ngOnInit();

    expect(component.films.length).toBe(1);
    expect(component.salles.length).toBe(1);
    expect(component.utilisateurs.length).toBe(1);
    expect(component.employes.length).toBe(1);
    expect(component.avis.length).toBe(1);
  });

  it('should toggle showAllFilms', () => {
    expect(component.showAllFilms).toBeFalse();
    component.toggleFilms();
    expect(component.showAllFilms).toBeTrue();
  });

  it('should set avisAttenteValid and show popup when validerAvis is called', () => {
    component.validerAvis(mockAvis.id);
    expect(component.avisAttenteValid).toBe(mockAvis.id);
    expect(component.showPopup).toBeTrue();
    expect(component.popupTitre).toBe('Confirmation');
  });

  it('should set employeAttenteSuppr and show popup when supprimerEmploye is called', () => {
    const emp = { email: 'test@test.com', nom: 'Nom', prenom: 'Prenom', pseudo: 'Pseudo', role: 'employe', motDePasse: '' };
    component.supprimerEmploye(emp);
    expect(component.employeAttenteSuppr).toEqual(emp);
    expect(component.showPopup).toBeTrue();
  });

  it('should show and close popup correctly', () => {
    component.afficherPopup('Titre', ['Message'], true);
    expect(component.showPopup).toBeTrue();
    expect(component.popupTitre).toBe('Titre');
    expect(component.popupMessages).toEqual(['Message']);
    expect(component.popupReponse).toBeTrue();

    component.fermerPopup();
    expect(component.showPopup).toBeFalse();
  });
});

