const supabase = require('./supabaseClient');

const NOTES_TABLE = 'notes';

/**
 * PUBLIC_INTERFACE
 * List all notes (id, title, content, created_at).
 */
async function listNotes() {
  const { data, error } = await supabase
    .from(NOTES_TABLE)
    .select('id, title, content, created_at')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Get a single note by ID.
 * @param {string} id - Note ID.
 */
async function getNoteById(id) {
  const { data, error } = await supabase
    .from(NOTES_TABLE)
    .select('id, title, content, created_at')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Create a new note.
 * @param {object} note - {title, content}
 */
async function createNote(note) {
  const { data, error } = await supabase
    .from(NOTES_TABLE)
    .insert([note])
    .select('id, title, content, created_at')
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Update an existing note.
 * @param {string} id - Note ID.
 * @param {object} updates - {title?, content?}
 */
async function updateNote(id, updates) {
  const { data, error } = await supabase
    .from(NOTES_TABLE)
    .update(updates)
    .eq('id', id)
    .select('id, title, content, created_at')
    .single();
  if (error) throw error;
  return data;
}

/**
 * PUBLIC_INTERFACE
 * Delete a note by ID.
 * @param {string} id - Note ID.
 */
async function deleteNote(id) {
  const { error } = await supabase
    .from(NOTES_TABLE)
    .delete()
    .eq('id', id);
  if (error) throw error;
  return true;
}

module.exports = {
  listNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
};
