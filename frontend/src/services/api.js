const API_BASE_URL =
  import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

export const getTareas = async () => {
  const response = await fetch(`${API_BASE_URL}/tareas`);
  if (!response.ok) {
    throw new Error('Error al obtener tareas');
  }
  return response.json();
};

export const createTarea = async (descripcion) => {
  const response = await fetch(`${API_BASE_URL}/tareas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ descripcion }),
  });
  if (!response.ok) {
    throw new Error('Error al crear tarea');
  }
  return response.json();
};

export const updateTareaStatus = async (id, completada) => {
  const response = await fetch(`${API_BASE_URL}/tareas/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completada }),
  });
  if (!response.ok) {
    throw new Error('Error al actualizar tarea');
  }
  return response.json();
};
