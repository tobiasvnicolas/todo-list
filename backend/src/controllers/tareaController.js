const TareaModel = require('../models/tareaModel');

class TareaController {
  /**
   * Obtiene todas las tareas
   */
  static async getAll(req, res) {
    try {
      const tareas = await TareaModel.getAll();
      res.json(tareas);
    } catch (error) {
      console.error('Error al obtener tareas:', error);
      res.status(500).json({ error: 'Error al obtener tareas' });
    }
  }

  /**
   * Crea una nueva tarea
   */
  static async create(req, res) {
    try {
      const { descripcion } = req.body;

      if (!descripcion || descripcion.trim() === '') {
        return res.status(400).json({ error: 'La descripción es requerida' });
      }

      const tarea = await TareaModel.create(descripcion);
      res.status(201).json(tarea);
    } catch (error) {
      console.error('Error al crear tarea:', error);
      res.status(500).json({ error: 'Error al crear tarea' });
    }
  }

  /**
   * Actualiza el estado de una tarea
   */
  static async updateStatus(req, res) {
    try {
      const { id } = req.params;
      const { completada } = req.body;

      if (typeof completada !== 'boolean') {
        return res
          .status(400)
          .json({ error: 'El campo completada debe ser booleano' });
      }

      const tarea = await TareaModel.updateStatus(id, completada);

      if (!tarea) {
        return res.status(404).json({ error: 'Tarea no encontrada' });
      }

      res.json(tarea);
    } catch (error) {
      console.error('Error al actualizar tarea:', error);
      res.status(500).json({ error: 'Error al actualizar tarea' });
    }
  }

  /**
   * Elimina todas las tareas (solo para testing)
   */
  static async deleteAll(req, res) {
    try {
      await TareaModel.deleteAll();
      res.status(204).send();
    } catch (error) {
      console.error('Error al eliminar tareas:', error);
      res.status(500).json({ error: 'Error al eliminar tareas' });
    }
  }
}

module.exports = TareaController;
