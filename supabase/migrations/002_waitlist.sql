create table public.waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Only service role can read (for Martin to export)
create policy "Service role only"
  on public.waitlist for all
  using (false);
