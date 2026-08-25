const carelaSupabaseUrl = "https://qsvounzuieuidqsysoma.supabase.co";

// This is the browser-safe public anon key. The management access token is
// intentionally never stored in the application or repository.
const carelaSupabasePublicKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzdm91bnp1aWV1aWRxc3lzb21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2MDk4NTcsImV4cCI6MjEwMzE4NTg1N30.OiMIFPdsPojLWThX-cdTT6Cber5Djb1SnePaaTFTkS4";

export const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? carelaSupabaseUrl;

export const supabasePublishableKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
  carelaSupabasePublicKey;

export const carelaOwnerId = "d288f91f-365f-450a-89bc-a182c7c42afc";
export const carelaOwnerEmail = "leidaniaurena23@gmail.com";
