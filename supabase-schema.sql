-- CareerMitra Supabase setup
-- Run this once in Supabase Dashboard > SQL Editor.
-- It uses Supabase Free features: Auth, Postgres Database, Row Level Security, and Storage.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student', 'mentor')),
  email text,
  password_hint text,
  full_name text not null,
  village text,
  class_stream text,
  career_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles drop constraint if exists profiles_id_fkey;
alter table public.profiles alter column id set default gen_random_uuid();
alter table public.profiles add column if not exists email text;
alter table public.profiles add column if not exists password_hint text;

create table if not exists public.mentor_profiles (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique references auth.users(id) on delete set null,
  full_name text not null,
  area text not null,
  qualification text not null,
  experience text not null,
  languages text[] not null default array['English'],
  created_at timestamptz not null default now()
);

create table if not exists public.app_users (
  id uuid primary key default gen_random_uuid(),
  role text not null check (role in ('student', 'mentor')),
  email text not null,
  password_hint text,
  full_name text not null,
  village text,
  class_stream text,
  career_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.student_files (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.app_users(id) on delete cascade,
  file_name text not null,
  file_type text,
  file_size bigint,
  file_data text not null,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.app_ratings (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references public.app_users(id) on delete cascade,
  to_user_id uuid references public.app_users(id) on delete cascade,
  to_mentor_id uuid references public.mentor_profiles(id) on delete cascade,
  rated_student_name text,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  check (to_user_id is not null or to_mentor_id is not null or rated_student_name is not null)
);

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  file_name text not null,
  file_path text,
  file_type text,
  file_size bigint,
  file_data text,
  uploaded_at timestamptz not null default now()
);

alter table public.exam_results drop constraint if exists exam_results_student_id_fkey;
alter table public.exam_results
  add constraint exam_results_student_id_fkey
  foreign key (student_id) references public.profiles(id) on delete cascade;
alter table public.exam_results alter column file_path drop not null;
alter table public.exam_results add column if not exists file_data text;

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references public.profiles(id) on delete cascade,
  to_user_id uuid references public.profiles(id) on delete cascade,
  to_mentor_id uuid references public.mentor_profiles(id) on delete cascade,
  rated_student_name text,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  check (to_user_id is not null or to_mentor_id is not null or rated_student_name is not null)
);

alter table public.ratings drop constraint if exists ratings_from_user_id_fkey;
alter table public.ratings drop constraint if exists ratings_to_user_id_fkey;
alter table public.ratings
  add constraint ratings_from_user_id_fkey
  foreign key (from_user_id) references public.profiles(id) on delete cascade;
alter table public.ratings
  add constraint ratings_to_user_id_fkey
  foreign key (to_user_id) references public.profiles(id) on delete cascade;

insert into public.mentor_profiles (full_name, area, qualification, experience, languages)
values
  (
    'Dr. Meera Kulkarni',
    'Health care and nursing',
    'MBBS, public health volunteer trainer',
    '9 years guiding rural students for nursing, ANM, GNM, and health worker pathways.',
    array['English', 'Hindi', 'Marathi']
  ),
  (
    'Rahul Deshmukh',
    'Technology and diploma careers',
    'B.Tech Computer Engineering, polytechnic mentor',
    '6 years helping students choose diploma, ITI, coding, and lateral-entry engineering routes.',
    array['English', 'Hindi', 'Marathi']
  ),
  (
    'Nisha Sharma',
    'Commerce, banking, and scholarships',
    'M.Com, banking exam counsellor',
    '7 years supporting scholarship forms, commerce courses, accounts, and bank exam preparation.',
    array['English', 'Hindi']
  )
on conflict do nothing;

insert into storage.buckets (id, name, public)
values ('exam-results', 'exam-results', false)
on conflict (id) do nothing;

alter table public.profiles enable row level security;
alter table public.mentor_profiles enable row level security;
alter table public.app_users enable row level security;
alter table public.student_files enable row level security;
alter table public.app_ratings enable row level security;
alter table public.exam_results enable row level security;
alter table public.ratings enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_demo_select" on public.profiles;
create policy "profiles_demo_select"
on public.profiles for select
to anon, authenticated
using (true);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_demo_insert" on public.profiles;
create policy "profiles_demo_insert"
on public.profiles for insert
to anon, authenticated
with check (true);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "profiles_demo_update" on public.profiles;
create policy "profiles_demo_update"
on public.profiles for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "mentor_profiles_are_readable" on public.mentor_profiles;
create policy "mentor_profiles_are_readable"
on public.mentor_profiles for select
to anon, authenticated
using (true);

drop policy if exists "mentors_update_own_profile" on public.mentor_profiles;
create policy "mentors_update_own_profile"
on public.mentor_profiles for update
to authenticated
using (auth.uid() = auth_user_id)
with check (auth.uid() = auth_user_id);

drop policy if exists "app_users_demo_read" on public.app_users;
create policy "app_users_demo_read"
on public.app_users for select
to anon, authenticated
using (true);

drop policy if exists "app_users_demo_insert" on public.app_users;
create policy "app_users_demo_insert"
on public.app_users for insert
to anon, authenticated
with check (true);

drop policy if exists "app_users_demo_update" on public.app_users;
create policy "app_users_demo_update"
on public.app_users for update
to anon, authenticated
using (true)
with check (true);

drop policy if exists "student_files_demo_read" on public.student_files;
create policy "student_files_demo_read"
on public.student_files for select
to anon, authenticated
using (true);

drop policy if exists "student_files_demo_insert" on public.student_files;
create policy "student_files_demo_insert"
on public.student_files for insert
to anon, authenticated
with check (true);

drop policy if exists "app_ratings_demo_read" on public.app_ratings;
create policy "app_ratings_demo_read"
on public.app_ratings for select
to anon, authenticated
using (true);

drop policy if exists "app_ratings_demo_insert" on public.app_ratings;
create policy "app_ratings_demo_insert"
on public.app_ratings for insert
to anon, authenticated
with check (true);

drop policy if exists "students_insert_own_exam_results" on public.exam_results;
create policy "students_insert_own_exam_results"
on public.exam_results for insert
to authenticated
with check (auth.uid() = student_id);

drop policy if exists "exam_results_demo_insert" on public.exam_results;
create policy "exam_results_demo_insert"
on public.exam_results for insert
to anon, authenticated
with check (true);

drop policy if exists "students_read_own_exam_results" on public.exam_results;
create policy "students_read_own_exam_results"
on public.exam_results for select
to authenticated
using (auth.uid() = student_id);

drop policy if exists "exam_results_demo_select" on public.exam_results;
create policy "exam_results_demo_select"
on public.exam_results for select
to anon, authenticated
using (true);

drop policy if exists "users_create_own_ratings" on public.ratings;
create policy "users_create_own_ratings"
on public.ratings for insert
to authenticated
with check (auth.uid() = from_user_id);

drop policy if exists "users_read_related_ratings" on public.ratings;
create policy "users_read_related_ratings"
on public.ratings for select
to authenticated
using (auth.uid() = from_user_id or auth.uid() = to_user_id);

drop policy if exists "students_upload_own_exam_files" on storage.objects;
create policy "students_upload_own_exam_files"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'exam-results'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "students_read_own_exam_files" on storage.objects;
create policy "students_read_own_exam_files"
on storage.objects for select
to authenticated
using (
  bucket_id = 'exam-results'
  and (storage.foldername(name))[1] = auth.uid()::text
);
