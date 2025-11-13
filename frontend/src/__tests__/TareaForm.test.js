import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import TareaForm from '../components/TareaForm';

describe('TareaForm', () => {
  it('renderiza el formulario correctamente', () => {
    render(<TareaForm onSubmit={vi.fn()} />);
    expect(screen.getByTestId('tarea-form')).toBeInTheDocument();
    expect(screen.getByTestId('tarea-input')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('actualiza el input al escribir', () => {
    render(<TareaForm onSubmit={vi.fn()} />);
    const input = screen.getByTestId('tarea-input');
    
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    expect(input.value).toBe('Nueva tarea');
  });

  it('llama a onSubmit con la descripción correcta', () => {
    const mockSubmit = vi.fn();
    render(<TareaForm onSubmit={mockSubmit} />);
    
    const input = screen.getByTestId('tarea-input');
    const button = screen.getByTestId('submit-button');
    
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    fireEvent.click(button);
    
    expect(mockSubmit).toHaveBeenCalledWith('Nueva tarea');
  });

  it('limpia el input después de enviar', () => {
    const mockSubmit = vi.fn();
    render(<TareaForm onSubmit={mockSubmit} />);
    
    const input = screen.getByTestId('tarea-input');
    const button = screen.getByTestId('submit-button');
    
    fireEvent.change(input, { target: { value: 'Nueva tarea' } });
    fireEvent.click(button);
    
    expect(input.value).toBe('');
  });

  it('no envía el formulario si el input está vacío', () => {
    const mockSubmit = vi.fn();
    render(<TareaForm onSubmit={mockSubmit} />);
    
    const button = screen.getByTestId('submit-button');
    fireEvent.click(button);
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  it('no envía el formulario si solo hay espacios', () => {
    const mockSubmit = vi.fn();
    render(<TareaForm onSubmit={mockSubmit} />);
    
    const input = screen.getByTestId('tarea-input');
    const button = screen.getByTestId('submit-button');
    
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);
    
    expect(mockSubmit).not.toHaveBeenCalled();
  });
});
