// supabase/functions/deno.d.ts
declare const Deno: {
  env: {
    get(key: string): string | undefined;
    [key: string]: string | undefined;
  };
  serve: (handler: (req: Request) => Response | Promise<Response>) => void;
};