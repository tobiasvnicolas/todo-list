const request = require('supertest');
const app = require('../src/app');
const TareaModel = require('../src/models/tareaModel');

// Mock del modelo
jest.mock('../src/models/tareaModel');

describe('Tarea API', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /api/tareas', () => {
    it('debería retornar todas las tareas', async () => {
      const mockTareas = [
        {
          id: 1,
          descripcion: 'Tarea 1',
          completada: 0,
          fecha_creacion: '2025-11-13T04:07:21.088Z',
        },
        {
          id: 2,
          descripcion: 'Tarea 2',
          completada: 1,
          fecha_creacion: '2025-11-13T04:07:21.088Z',
        },
      ];

      TareaModel.getAll.mockResolvedValue(mockTareas);

      const response = await request(app).get('/api/tareas');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockTareas);
      expect(TareaModel.getAll).toHaveBeenCalledTimes(1);
    });

    it('debería manejar errores al obtener tareas', async () => {
      TareaModel.getAll.mockRejectedValue(new Error('Database error'));

      const response = await request(app).get('/api/tareas');

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /api/tareas', () => {
    it('debería crear una nueva tarea', async () => {
      const nuevaTarea = {
        id: 1,
        descripcion: 'Nueva tarea',
        completada: 0,
        fecha_creacion: '2025-11-13T04:07:21.442Z',
      };

      TareaModel.create.mockResolvedValue(nuevaTarea);

      const response = await request(app)
        .post('/api/tareas')
        .send({ descripcion: 'Nueva tarea' });

      expect(response.status).toBe(201);
      expect(response.body).toEqual(nuevaTarea);
      expect(TareaModel.create).toHaveBeenCalledWith('Nueva tarea');
    });

    it('debería retornar error si la descripción está vacía', async () => {
      const response = await request(app)
        .post('/api/tareas')
        .send({ descripcion: '' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('debería retornar error si falta la descripción', async () => {
      const response = await request(app).post('/api/tareas').send({});

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('debería manejar errores al crear tarea', async () => {
      TareaModel.create.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .post('/api/tareas')
        .send({ descripcion: 'Nueva tarea' });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/tareas/:id', () => {
    it('debería actualizar el estado de una tarea', async () => {
      const tareaActualizada = {
        id: 1,
        descripcion: 'Tarea 1',
        completada: 1,
        fecha_creacion: '2025-11-13T04:07:21.578Z',
      };

      TareaModel.updateStatus.mockResolvedValue(tareaActualizada);

      const response = await request(app)
        .put('/api/tareas/1')
        .send({ completada: true });

      expect(response.status).toBe(200);
      expect(response.body).toEqual(tareaActualizada);
      expect(TareaModel.updateStatus).toHaveBeenCalledWith('1', true);
    });

    it('debería retornar error si completada no es booleano', async () => {
      const response = await request(app)
        .put('/api/tareas/1')
        .send({ completada: 'true' });

      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });

    it('debería retornar 404 si la tarea no existe', async () => {
      TareaModel.updateStatus.mockResolvedValue(null);

      const response = await request(app)
        .put('/api/tareas/999')
        .send({ completada: true });

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty('error');
    });

    it('debería manejar errores al actualizar tarea', async () => {
      TareaModel.updateStatus.mockRejectedValue(new Error('Database error'));

      const response = await request(app)
        .put('/api/tareas/1')
        .send({ completada: true });

      expect(response.status).toBe(500);
      expect(response.body).toHaveProperty('error');
    });
  });

  describe('GET /health', () => {
    it('debería retornar OK', async () => {
      const response = await request(app).get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: 'OK' });
    });
  });
});
