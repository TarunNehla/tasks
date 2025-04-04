const notesRouter = require('express').Router();
const Note = require('../models/note');

notesRouter.get('/', async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;

    const note = {
      title: body.title,
      description: body?.description || '',
      completed: body.completed,
    };

    const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, { new: true });
    if (!updatedNote) {
      return response.status(404).send({ error: 'Note not found' });
    }
    response.json(updatedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body;

    const note = new Note({
      title: body.title,
      description: body.description || '',
      completed: body.completed || false,
    });

    const savedNote = await note.save();
    response.status(201).json(savedNote);
  } catch (error) {
    next(error);
  }
});

notesRouter.get('/:id', async (request, response, next) => {
  try {
    const note = await Note.findById(request.params.id);
    if (note) {
      response.json(note);
    } else {
      response.status(404).end();
    }
  } catch (error) {
    next(error);
  }
});

notesRouter.delete('/:id', async (request, response, next) => {
  try {
    await Note.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } catch (error) {
    next(error);
  }
});

module.exports = notesRouter;