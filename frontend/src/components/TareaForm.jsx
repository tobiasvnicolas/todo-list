import React, { useState } from 'react';
import './TareaForm.css';

const TareaForm = ({ onSubmit }) => {
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (descripcion.trim()) {
      onSubmit(descripcion);
      setDescripcion('');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="tarea-form"
      data-testid="tarea-form"
    >
      <input
        type="text"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        placeholder="Nueva tarea..."
        data-testid="tarea-input"
        className="tarea-input"
      />
      <button
        type="submit"
        data-testid="submit-button"
        className="submit-button"
      >
        Agregar
      </button>
    </form>
  );
};

export default TareaForm;
