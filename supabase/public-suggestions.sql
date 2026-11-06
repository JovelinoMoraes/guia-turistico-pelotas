alter table public.locations enable row level security;

create policy "Permitir envio público de sugestões"
on public.locations
for insert
to anon
with check (
  published = false
  and partner = false
);
