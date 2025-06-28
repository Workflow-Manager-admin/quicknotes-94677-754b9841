//
// Initializes and exports the Supabase client using environment variables.
//
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase credentials are missing. Please set SUPABASE_URL and SUPABASE_KEY in your .env file.');
}

/**
 * PUBLIC_INTERFACE
 * Exports the initialized Supabase client instance.
 */
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

module.exports = supabase;
