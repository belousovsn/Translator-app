import {createClient} from '@supabase/supabase-js'
import { loadLocalSettings } from "./helpers.js";

const settings = await loadLocalSettings()

export const supabase = createClient(
    settings.SUPABASE_URL,
    settings.SUPABASE_KEY
)