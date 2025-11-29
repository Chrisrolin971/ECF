import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PopupAjoutEmployeComponent } from './ajoutEmploye.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Utilisateur } from '../../../services/inscription.service';

describe('PopupAjoutEmployeComponent', () => {
  let component: PopupAjoutEmployeComponent;
  let fixture: ComponentFixture<PopupAjoutEmployeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopupAjoutEmployeComponent, FormsModule, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(PopupAjoutEmployeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit fermer event when annuler is called', () => {
    spyOn(component.fermer, 'emit');
    component.annuler();
    expect(component.fermer.emit).toHaveBeenCalled();
  });

  it('should fail validation if required fields are empty', () => {
    component.nom = '';
    component.prenom = '';
    expect(component.CheckFile()).toBeFalse();
    expect(component.messageErreur).toContain('Tous les champs');
  });

  it('should fail validation if email is invalid', () => {
    component.nom = 'Nom';
    component.prenom = 'Prenom';
    component.pseudo = 'Pseudo';
    component.email = 'invalidEmail';
    component.motDePasse = 'Password123!';
    component.confMotdePasse = 'Password123!';
    expect(component.CheckFile()).toBeFalse();
    expect(component.messageErreur).toContain('format de l’adresse email');
  });

  it('should fail validation if passwords do not match', () => {
    component.nom = 'Nom';
    component.prenom = 'Prenom';
    component.pseudo = 'Pseudo';
    component.email = 'test@test.com';
    component.motDePasse = 'Password123!';
    component.confMotdePasse = 'Different123!';
    expect(component.CheckFile()).toBeFalse();
    expect(component.messageErreur).toContain('Les mots de passe ne correspondent pas');
  });

  it('should fail validation if password format is invalid', () => {
    component.nom = 'Nom';
    component.prenom = 'Prenom';
    component.pseudo = 'Pseudo';
    component.email = 'test@test.com';
    component.motDePasse = 'short';
    component.confMotdePasse = 'short';
    expect(component.CheckFile()).toBeFalse();
    expect(component.messageErreur).toContain('Le mot de passe doit contenir');
  });

  it('should pass validation with correct data', () => {
    component.nom = 'Nom';
    component.prenom = 'Prenom';
    component.pseudo = 'Pseudo';
    component.email = 'test@test.com';
    component.motDePasse = 'Password123!';
    component.confMotdePasse = 'Password123!';
    expect(component.CheckFile()).toBeTrue();
    expect(component.messageErreur).toBe('');
  });

  it('should emit enregistrer event when valider is called with valid data', () => {
    spyOn(component.enregistrer, 'emit');
    component.nom = 'Nom';
    component.prenom = 'Prenom';
    component.pseudo = 'Pseudo';
    component.email = 'test@test.com';
    component.motDePasse = 'Password123!';
    component.confMotdePasse = 'Password123!';
    component.valider();
    expect(component.enregistrer.emit).toHaveBeenCalledWith(jasmine.objectContaining<Utilisateur>({
      nom: 'Nom',
      prenom: 'Prenom',
      pseudo: 'Pseudo',
      email: 'test@test.com',
      motDePasse: 'Password123!',
      role: 'employe'
    }));
  });
});
