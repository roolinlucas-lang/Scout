-- Rolín Scout Mobile 0.2
-- Ejecutar completo en Supabase > SQL Editor > New query.
-- Esta tabla almacena una copia JSON del estado de carrera por usuario autenticado.
create table if not exists public.career_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.career_data enable row level security;

drop policy if exists "Users can read their own career data" on public.career_data;
create policy "Users can read their own career data"
  on public.career_data for select
  to authenticated
  using (auth.uid() = user_id);

drop policy if exists "Users can insert their own career data" on public.career_data;
create policy "Users can insert their own career data"
  on public.career_data for insert
  to authenticated
  with check (auth.uid() = user_id);

drop policy if exists "Users can update their own career data" on public.career_data;
create policy "Users can update their own career data"
  on public.career_data for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

 grant select, insert, update on public.career_data to authenticated;
