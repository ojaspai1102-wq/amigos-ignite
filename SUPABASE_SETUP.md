# CareerMitra Supabase Setup

Follow these steps once. After this, the website can save accounts, student data,
uploaded exam results, mentor profiles, and ratings in Supabase.

## 1. Create the free Supabase project

1. Go to https://supabase.com/.
2. Create a free account or log in.
3. Click **New project**.
4. Enter a project name such as **CareerMitra**.
5. Save the database password somewhere safe.
6. Wait for Supabase to finish creating the project.

## 2. Create the database tables

1. Open your Supabase project.
2. Go to **SQL Editor**.
3. Open `supabase-schema.sql` from this GitHub repo.
4. Copy the full SQL.
5. Paste it into Supabase SQL Editor.
6. Click **Run**.

This creates:

- `profiles`: student and mentor login profile data
- `mentor_profiles`: preloaded mentor qualifications and experience
- `exam_results`: uploaded exam result file records
- `ratings`: student-to-mentor and mentor-to-student ratings
- `exam-results`: private file storage bucket

## 3. Get your Supabase keys

1. In Supabase, go to **Project Settings**.
2. Open **API**.
3. Copy the **Project URL**.
4. Copy the **anon public key**.

The anon key is safe to use in a frontend website. Do not use the service-role
key in GitHub Pages.

## 4. Add the backend config to the website code

1. Open `supabase-config.js`.
2. Paste your Supabase Project URL in `url`.
3. Paste your Supabase anon public key in `anonKey`.
4. Save the file.
5. Push the updated file to GitHub.

After this, the website connects automatically when it opens. The Project URL
and anon key are not shown in the website interface.

Important: the anon key is safe for frontend use. Never put the service-role key
in this file or anywhere in a GitHub Pages website.

## 5. Create demo accounts

Create one student account:

- Account type: `Student`
- Email: any test email you can access
- Password: at least 6 characters

Create one mentor account:

- Account type: `Mentor`
- Email: another test email
- Password: at least 6 characters

If email confirmation is enabled in Supabase Auth, confirm the email before
logging in. For faster demos, you can temporarily disable email confirmation in
Supabase Auth settings.

## 6. Test the main flows

Student flow:

1. Login as student.
2. Fill student name, class, village, and goal.
3. Click **Save student data**.
4. Upload an exam result PDF or image.
5. Rate a mentor.

Mentor flow:

1. Login as mentor.
2. View the preloaded mentor database.
3. Rate the visible student record.

## Important note

This is a project-demo integration that works on GitHub Pages. For a production
app, add an admin dashboard for assigning real students to real mentors, and add
stricter Row Level Security rules for school staff and counsellors.
