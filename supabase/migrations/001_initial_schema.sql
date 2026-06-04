-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────────────────────
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  username text unique,
  avatar_url text,
  current_level integer not null default 1,
  xp integer not null default 0,
  plan text not null default 'free' check (plan in ('free', 'pro', 'lifetime')),
  stripe_customer_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── PROJECTS ────────────────────────────────────────────────────────────────
create table public.projects (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles on delete cascade not null,
  problem text not null,
  target text not null,
  name text,
  url text,
  current_step integer not null default 1,
  completed_steps integer[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create policy "Users can crud own projects"
  on public.projects for all
  using (auth.uid() = user_id);

-- ─── STEP OUTPUTS ────────────────────────────────────────────────────────────
create table public.step_outputs (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects on delete cascade not null,
  step integer not null,
  output jsonb not null default '{}',
  created_at timestamptz not null default now(),
  unique(project_id, step)
);

alter table public.step_outputs enable row level security;

create policy "Users can crud own step outputs"
  on public.step_outputs for all
  using (
    auth.uid() = (
      select user_id from public.projects where id = project_id
    )
  );

-- ─── TASK COMPLETIONS ────────────────────────────────────────────────────────
create table public.task_completions (
  id uuid primary key default uuid_generate_v4(),
  project_id uuid references public.projects on delete cascade not null,
  task_id text not null,
  completed_at timestamptz not null default now(),
  unique(project_id, task_id)
);

alter table public.task_completions enable row level security;

create policy "Users can crud own task completions"
  on public.task_completions for all
  using (
    auth.uid() = (
      select user_id from public.projects where id = project_id
    )
  );

-- ─── UPDATED_AT TRIGGER ──────────────────────────────────────────────────────
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute procedure public.set_updated_at();

create trigger set_projects_updated_at
  before update on public.projects
  for each row execute procedure public.set_updated_at();
