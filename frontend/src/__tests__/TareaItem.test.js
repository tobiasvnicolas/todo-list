import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TareaItem from '../components/TareaItem';

describe('TareaItem', () => {
  const mockTarea = {
    id: 1,
    descripcion: 'Tarea de prueba',
    completada: 0,
  };

  it('renderiza la tarea correctamente', () => {
    render(<TareaItem tarea={mockTarea} onToggle={vi.fn()} />);

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-1')).toBeInTheDocument();
  });

  it('muestra la tarea sin tachar si no está completada', () => {
    render(<TareaItem tarea={mockTarea} onToggle={vi.fn()} />);

    const span = screen.getByText('Tarea de prueba');
    expect(span).not.toHaveClass('completada');
  });

  it('muestra la tarea tachada si está completada', () => {
    const tareaCompletada = { ...mockTarea, completada: 1 };
    render(<TareaItem tarea={tareaCompletada} onToggle={vi.fn()} />);

    const span = screen.getByText('Tarea de prueba');
    expect(span).toHaveClass('completada');
  });

  it('el checkbox está marcado si la tarea está completada', () => {
    const tareaCompletada = { ...mockTarea, completada: 1 };
    render(<TareaItem tarea={tareaCompletada} onToggle={vi.fn()} />);

    const checkbox = screen.getByTestId('checkbox-1');
    expect(checkbox).toBeChecked();
  });

  it('el checkbox no está marcado si la tarea no está completada', () => {
    render(<TareaItem tarea={mockTarea} onToggle={vi.fn()} />);

    const checkbox = screen.getByTestId('checkbox-1');
    expect(checkbox).not.toBeChecked();
  });

  it('llama a onToggle con los parámetros correctos al hacer clic', () => {
    const mockToggle = vi.fn();
    render(<TareaItem tarea={mockTarea} onToggle={mockToggle} />);

    const checkbox = screen.getByTestId('checkbox-1');
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(1, true);
  });

  it('llama a onToggle para desmarcar una tarea completada', () => {
    const mockToggle = vi.fn();
    const tareaCompletada = { ...mockTarea, completada: 1 };
    render(<TareaItem tarea={tareaCompletada} onToggle={mockToggle} />);

    const checkbox = screen.getByTestId('checkbox-1');
    fireEvent.click(checkbox);

    expect(mockToggle).toHaveBeenCalledWith(1, false);
  });
});
