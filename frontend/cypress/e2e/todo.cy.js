describe('Gestor de Tareas - E2E Tests', () => {
  beforeEach(() => {
    // Limpiar la base de datos antes de cada test
    cy.cleanDatabase();
    // Visitar la aplicación antes de cada test
    cy.visit('/');
  });

  describe('RF-001: Crear nueva tarea', () => {
    it('debería permitir crear una nueva tarea', () => {
      const nuevaTarea = 'Completar pruebas E2E con Cypress';

      // Crear la tarea
      cy.createTarea(nuevaTarea);

      // Verificar que la tarea se muestra en la lista
      cy.contains(nuevaTarea).should('be.visible');
    });

    it('debería limpiar el input después de crear una tarea', () => {
      cy.createTarea('Tarea de prueba');

      // Verificar que el input está vacío
      cy.get('[data-testid="tarea-input"]').should('have.value', '');
    });

    it('no debería crear tarea con descripción vacía', () => {
      // Intentar enviar sin texto
      cy.get('[data-testid="submit-button"]').click();

      // Verificar que no se creó ninguna tarea nueva
      cy.get('[data-testid="tarea-list"]').should('not.exist');
    });

    it('debería permitir crear múltiples tareas', () => {
      const tareas = ['Primera tarea', 'Segunda tarea', 'Tercera tarea'];

      tareas.forEach((tarea) => {
        cy.createTarea(tarea);
      });

      // Verificar que todas las tareas están visibles
      tareas.forEach((tarea) => {
        cy.contains(tarea).should('be.visible');
      });
    });
  });

  describe('RF-002: Mostrar lista de tareas', () => {
    it('debería mostrar el título de la aplicación', () => {
      cy.contains('📝 Gestor de Tareas').should('be.visible');
    });

    it('debería mostrar mensaje cuando no hay tareas', () => {
      // Si no hay tareas, debería mostrar el mensaje
      cy.get('[data-testid="tarea-list"]').should('not.exist');
    });

    it('debería mostrar las tareas existentes', () => {
      // Crear una tarea
      cy.createTarea('Tarea visible');

      // Verificar que la lista se muestra
      cy.get('[data-testid="tarea-list"]').should('be.visible');
      cy.contains('Tarea visible').should('be.visible');
    });
  });

  describe('RF-003/004: Marcar y desmarcar tarea como completada (Toggle)', () => {
    beforeEach(() => {
      // Crear una tarea de prueba para cada test
      cy.createTarea('Tarea para toggle');
      // Esperar a que la tarea se cree
      cy.contains('Tarea para toggle').should('be.visible');
    });

    it('debería marcar una tarea como completada', () => {
      // Obtener el checkbox y hacer clic
      cy.get('[type="checkbox"]').first().check();

      // Verificar que la tarea tiene la clase completada
      cy.get('.completada').should('exist');
    });

    it('debería desmarcar una tarea completada', () => {
      // Marcar la tarea
      cy.get('[type="checkbox"]').first().check();
      cy.get('.completada').should('exist');

      // Desmarcar la tarea
      cy.get('[type="checkbox"]').first().uncheck();

      // Verificar que la tarea ya no está completada
      cy.get('.completada').should('not.exist');
    });

    it('debería permitir toggle múltiple', () => {
      // Toggle 1: Marcar
      cy.get('[type="checkbox"]').first().check();
      cy.get('.completada').should('exist');

      // Toggle 2: Desmarcar
      cy.get('[type="checkbox"]').first().uncheck();
      cy.get('.completada').should('not.exist');

      // Toggle 3: Marcar de nuevo
      cy.get('[type="checkbox"]').first().check();
      cy.get('.completada').should('exist');
    });
  });

  describe('RF-006: Distinción visual de tareas completadas', () => {
    it('debería mostrar visualmente las tareas completadas', () => {
      // Crear dos tareas
      cy.createTarea('Tarea pendiente');
      cy.createTarea('Tarea a completar');

      // Marcar la primera como completada (las tareas se insertan al inicio)
      cy.get('[type="checkbox"]').first().check();

      // Verificar que una tiene la clase completada y la otra no
      cy.get('.completada').should('have.length', 1);
      cy.contains('Tarea a completar')
        .parent()
        .find('.completada')
        .should('exist');
    });

    it('las tareas completadas deberían tener texto tachado', () => {
      cy.createTarea('Tarea con estilo');
      cy.get('[type="checkbox"]').first().check();

      // Verificar que tiene la clase completada (que aplica text-decoration: line-through)
      cy.get('.completada')
        .should('have.css', 'text-decoration')
        .and('include', 'line-through');
    });
  });

  describe('Flujo completo de usuario', () => {
    it('debería completar un flujo completo de uso', () => {
      // 1. Crear varias tareas
      cy.createTarea('Estudiar para el examen');
      cy.createTarea('Hacer ejercicio');
      cy.createTarea('Leer documentación');

      // 2. Verificar que todas se crearon
      cy.contains('Estudiar para el examen').should('be.visible');
      cy.contains('Hacer ejercicio').should('be.visible');
      cy.contains('Leer documentación').should('be.visible');

      // 3. Marcar algunas como completadas
      cy.get('[type="checkbox"]').eq(0).check();
      cy.get('[type="checkbox"]').eq(2).check();

      // 4. Verificar que hay 2 completadas
      cy.get('.completada').should('have.length', 2);

      // 5. Desmarcar una
      cy.get('[type="checkbox"]').eq(0).uncheck();

      // 6. Verificar que solo queda 1 completada
      cy.get('.completada').should('have.length', 1);
    });
  });
});
