// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('createTarea', (descripcion) => {
  cy.get('[data-testid="tarea-input"]').type(descripcion);
  cy.get('[data-testid="submit-button"]').click();
});

Cypress.Commands.add('toggleTarea', (tareaId) => {
  cy.get(`[data-testid="checkbox-${tareaId}"]`).click();
});

Cypress.Commands.add('getTarea', (tareaId) => {
  return cy.get(`[data-testid="tarea-${tareaId}"]`);
});

Cypress.Commands.add('cleanDatabase', () => {
  cy.request('DELETE', 'http://localhost:3001/api/tareas');
});
