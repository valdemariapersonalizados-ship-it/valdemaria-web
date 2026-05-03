create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text default 'user',
  created_at timestamptz default now()
);

create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price numeric(10,2) not null,
  image_url text,
  created_at timestamptz default now()
);

create table if not exists orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  status text default 'pending',
  total numeric(10,2) not null,
  created_at timestamptz default now()
);

create table if not exists order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id) on delete cascade,
  product_id uuid references products(id),
  quantity int not null,
  unit_price numeric(10,2) not null
);

create table if not exists courses (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  is_published boolean default false,
  created_at timestamptz default now()
);

create table if not exists course_videos (
  id uuid primary key default gen_random_uuid(),
  course_id uuid references courses(id) on delete cascade,
  title text not null,
  storage_path text not null,
  created_at timestamptz default now()
);

create table if not exists mockups (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id),
  product_name text,
  design_url text,
  settings jsonb,
  created_at timestamptz default now()
);

create table if not exists media_assets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id),
  type text,
  storage_path text not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table mockups enable row level security;
alter table courses enable row level security;
alter table course_videos enable row level security;

create policy "users read own orders" on orders for select using (auth.uid() = user_id);
create policy "users read own mockups" on mockups for select using (auth.uid() = user_id);
create policy "users insert own mockups" on mockups for insert with check (auth.uid() = user_id);
create policy "authenticated read courses" on courses for select using (auth.role() = 'authenticated');
create policy "authenticated read videos" on course_videos for select using (auth.role() = 'authenticated');

create policy "admin all profiles" on profiles for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "admin all orders" on orders for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
create policy "admin all mockups" on mockups for all using (
  exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'admin')
);
