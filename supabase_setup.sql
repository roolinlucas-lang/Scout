-- Rolín Scout Mobile 0.3
-- Ejecutar completo en Supabase > SQL Editor > New query.
-- Una fila privada por usuario autenticado. No usar service_role en la app.

create table if not exists public.career_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  payload jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.career_data enable row level security;

drop policy if exists "Users can read own career data" on public.career_data;
create policy "Users can read own career data"
on public.career_data for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own career data" on public.career_data;
create policy "Users can insert own career data"
on public.career_data for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own career data" on public.career_data;
create policy "Users can update own career data"
on public.career_data for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- No se crea política pública. Los usuarios anónimos no pueden acceder.
