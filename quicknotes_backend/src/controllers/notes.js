const notesService = require('../services/notes');

class NotesController {
  /**
   * PUBLIC_INTERFACE
   * List all notes.
   */
  async list(req, res) {
    try {
      const notes = await notesService.listNotes();
      return res.json(notes);
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Failed to fetch notes.' });
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Get a single note by ID.
   */
  async get(req, res) {
    try {
      const note = await notesService.getNoteById(req.params.id);
      if (!note) return res.status(404).json({ error: 'Note not found' });
      return res.json(note);
    } catch (error) {
      if (error.code === 'PGRST116' || error.code === 'PGRST106') { // Not found error
        return res.status(404).json({ error: 'Note not found' });
      }
      return res.status(500).json({ error: error.message || 'Failed to fetch note.' });
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Create a new note.
   */
  async create(req, res) {
    try {
      const { title, content } = req.body;
      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required.' });
      }
      const newNote = await notesService.createNote({ title, content });
      return res.status(201).json(newNote);
    } catch (error) {
      return res.status(500).json({ error: error.message || 'Failed to create note.' });
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Update a note by ID.
   */
  async update(req, res) {
    try {
      const { id } = req.params;
      const { title, content } = req.body;
      if (!title && !content) {
        return res.status(400).json({ error: 'At least one of title or content required.' });
      }
      const updatedNote = await notesService.updateNote(id, { title, content });
      if (!updatedNote) return res.status(404).json({ error: 'Note not found' });
      return res.json(updatedNote);
    } catch (error) {
      if (error.code === 'PGRST116' || error.code === 'PGRST106') {
        return res.status(404).json({ error: 'Note not found' });
      }
      return res.status(500).json({ error: error.message || 'Failed to update note.' });
    }
  }

  /**
   * PUBLIC_INTERFACE
   * Delete a note by ID.
   */
  async remove(req, res) {
    try {
      const { id } = req.params;
      await notesService.deleteNote(id);
      return res.status(204).end();
    } catch (error) {
      if (error.code === 'PGRST116' || error.code === 'PGRST106') {
        return res.status(404).json({ error: 'Note not found' });
      }
      return res.status(500).json({ error: error.message || 'Failed to delete note.' });
    }
  }
}

module.exports = new NotesController();
