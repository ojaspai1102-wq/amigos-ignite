-- CareerMitra Supabase setup
-- Run this once in Supabase Dashboard > SQL Editor.
-- It uses Supabase Free features: Auth, Postgres Database, Row Level Security, and Storage.

create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null check (role in ('student', 'mentor')),
  full_name text not null,
  village text,
  class_stream text,
  career_goal text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

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

create table if not exists public.exam_results (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references auth.users(id) on delete cascade,
  file_name text not null,
  file_path text not null,
  file_type text,
  file_size bigint,
  uploaded_at timestamptz not null default now()
);

create table if not exists public.ratings (
  id uuid primary key default gen_random_uuid(),
  from_user_id uuid not null references auth.users(id) on delete cascade,
  to_user_id uuid references auth.users(id) on delete cascade,
  to_mentor_id uuid references public.mentor_profiles(id) on delete cascade,
  rated_student_name text,
  rating integer not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  check (to_user_id is not null or to_mentor_id is not null or rated_student_name is not null)
);

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
alter table public.exam_results enable row level security;
alter table public.ratings enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

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

drop policy if exists "students_insert_own_exam_results" on public.exam_results;
create policy "students_insert_own_exam_results"
on public.exam_results for insert
to authenticated
with check (auth.uid() = student_id);

drop policy if exists "students_read_own_exam_results" on public.exam_results;
create policy "students_read_own_exam_results"
on public.exam_results for select
to authenticated
using (auth.uid() = student_id);

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
