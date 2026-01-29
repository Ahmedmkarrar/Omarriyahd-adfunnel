import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://rrcchghvdkrbovhsyeek.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyY2NoZ2h2ZGtyYm92aHN5ZWVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2OTY3MjcsImV4cCI6MjA4NTI3MjcyN30.9OyxLvld3DnbbvxiuWpRj41gFxTVm3J5MEnb83CALQQ"
);
