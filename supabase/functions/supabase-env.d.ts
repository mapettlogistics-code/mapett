// supabase/functions/supabase-env.d.ts
// Map remote Supabase URL imports to the local npm package for type-checking.
// At runtime in Deno/Supabase Edge Functions, the URL imports work as-is.

declare module "https://esm.sh/@supabase/supabase-js@2" {
  export * from "@supabase/supabase-js";
}

declare module "https://esm.sh/@supabase/supabase-js@2.38.1" {
  export * from "@supabase/supabase-js";
}

declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export * from "https://deno.land/std@0.168.0/http/server.ts";
}