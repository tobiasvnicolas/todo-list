import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TareaList from '../components/TareaList';

describe('TareaList', () => {
  const mockTareas = [
    { id: 1, descripcion: 'Tarea 1', completada: 0 },
    { id: 2, descripcion: 'Tarea 2', completada: 1 },
  ];

  it('renderiza la lista de tareas correctamente', () => {
    render(<TareaList tareas={mockTareas} onToggle={vi.fn()} />);

    expect(screen.getByText('Tarea 1')).toBeInTheDocument();
    expect(screen.getByText('Tarea 2')).toBeInTheDocument();
  });

  it('muestra mensaje cuando no hay tareas', () => {
    render(<TareaList tareas={[]} onToggle={vi.fn()} />);

    expect(
      screen.getByText('No hay tareas. ¡Crea una nueva!')
    ).toBeInTheDocument();
  });

  it('renderiza el número correcto de tareas', () => {
    render(<TareaList tareas={mockTareas} onToggle={vi.fn()} />);

    const tareaItems = screen.getAllByTestId(/tarea-\d+/);
    expect(tareaItems).toHaveLength(2);
  });

  it('pasa la función onToggle a cada TareaItem', () => {
    const mockToggle = vi.fn();
    render(<TareaList tareas={mockTareas} onToggle={mockToggle} />);

    expect(screen.getByTestId('tarea-list')).toBeInTheDocument();
  });
});
