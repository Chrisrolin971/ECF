// Import des polyfills nécessaires pour les tests Angular
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Initialise l'environnement de test Angular
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);

// Optionnel : reset automatique du TestBed entre chaque test
afterEach(() => {
  getTestBed().resetTestingModule();
});

// Optionnel : gestion des erreurs asynchrones pour éviter les tests "fantômes"
jasmine.getEnv().addReporter({
  specDone: result => {
    if (result.status === 'failed') {
      console.error('Test échoué :', result.fullName);
      for (const fe of result.failedExpectations) {
        console.error(fe.message);
      }
    }
  }
});
