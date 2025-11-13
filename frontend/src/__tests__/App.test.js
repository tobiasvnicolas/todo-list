import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import App from '../App';
import * as api from '../services/api';

vi.mock('../services/api');

describe('App', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza el título correctamente', () => {
    api.getTareas.mockResolvedValue([]);
    render(<App />);

    expect(screen.getByText('📝 Gestor de Tareas')).toBeInTheDocument();
  });

  it('muestra el estado de carga inicialmente', () => {
    api.getTareas.mockImplementation(() => new Promise(() => {}));
    render(<App />);

    expect(screen.getByText('Cargando tareas...')).toBeInTheDocument();
  });

  it('carga y muestra las tareas', async () => {
    const mockTareas = [
      { id: 1, descripcion: 'Tarea 1', completada: 0 },
      { id: 2, descripcion: 'Tarea 2', completada: 1 },
    ];

    api.getTareas.mockResolvedValue(mockTareas);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    });
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
  });

  it('muestra mensaje de error si falla la carga', async () => {
    api.getTareas.mockRejectedValue(new Error('Network error'));
    render(<App />);

    await waitFor(() => {
      expect(
        screen.getByText('Error al cargar las tareas')
      ).toBeInTheDocument();
    });
  });

  it('renderiza el formulario de creación', async () => {
    api.getTareas.mockResolvedValue([]);
    render(<App />);

    await waitFor(() => {
      expect(screen.getByTestId('tarea-form')).toBeInTheDocument();
    });
  });
});
