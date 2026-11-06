alter table public.locations
add column if not exists opening_hours jsonb;
