import { createClient as createSupabaseClient } from "@supabase/supabase-js"
import type { Database } from "@/types/database"

// Service-role client for trusted server-to-server contexts (e.g. webhooks).
// Bypasses RLS — never expose to the client or use with user-supplied input.
export function createAdminClient() {
  return createSupabaseClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}
