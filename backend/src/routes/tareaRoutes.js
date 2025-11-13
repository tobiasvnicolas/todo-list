const express = require('express');
const TareaController = require('../controllers/tareaController');

const router = express.Router();

// GET /api/tareas - Obtener todas las tareas
router.get('/tareas', TareaController.getAll);

// POST /api/tareas - Crear una nueva tarea
router.post('/tareas', TareaController.create);

// PUT /api/tareas/:id - Actualizar el estado de una tarea
router.put('/tareas/:id', TareaController.updateStatus);

// DELETE /api/tareas - Eliminar todas las tareas (solo para testing)
router.delete('/tareas', TareaController.deleteAll);

module.exports = router;
