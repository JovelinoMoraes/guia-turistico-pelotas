alter table public.locations
add column if not exists partner boolean not null default false;
