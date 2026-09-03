"use client";

import Image from "next/image";
import {
  Award,
  BookOpen,
  BriefcaseBusiness,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  Languages,
  Map,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Stream = "any" | "science" | "commerce" | "arts" | "vocational";
type Interest =
  | "technology"
  | "health"
  | "agriculture"
  | "business"
  | "government"
  | "creative";

const copy = {
  English: {
    badge: "Rural student career opportunity navigator",
    title: "Find a practical career path from your interests.",
    subtitle:
      "CareerMitra helps students compare careers, entrance exams, scholarships, courses, and next steps in one simple guidance flow.",
    start: "Build my guidance plan",
    profile: "Student profile",
    matches: "Recommended pathways",
    opportunities: "Opportunity finder",
    roadmap: "Learning roadmap",
  },
  Hindi: {
    badge: "Gaon ke students ke liye career navigator",
    title: "Apni ruchi se practical career raasta dhoondo.",
    subtitle:
      "CareerMitra careers, exams, scholarships, courses aur next steps ko ek simple flow mein dikhata hai.",
    start: "Mera guidance plan banao",
    profile: "Student profile",
    matches: "Recommended pathways",
    opportunities: "Opportunity finder",
    roadmap: "Learning roadmap",
  },
  Marathi: {
    badge: "Gramin vidyarthyan sathi career navigator",
    title: "Tumchya interest nusar yogya career marg shodha.",
    subtitle:
      "CareerMitra careers, exams, scholarships, courses ani next steps ekatra dakhavto.",
    start: "Maza guidance plan banao",
    profile: "Student profile",
    matches: "Recommended pathways",
    opportunities: "Opportunity finder",
    roadmap: "Learning roadmap",
  },
};

const interests: { id: Interest; label: string; icon: React.ReactNode }[] = [
  { id: "technology", label: "Technology", icon: <BriefcaseBusiness /> },
  { id: "health", label: "Health care", icon: <CheckCircle2 /> },
  { id: "agriculture", label: "Agriculture", icon: <Map /> },
  { id: "business", label: "Business", icon: <ClipboardList /> },
  { id: "government", label: "Govt jobs", icon: <Award /> },
  { id: "creative", label: "Creative work", icon: <Sparkles /> },
];

const pathways = [
  {
    title: "Diploma in Computer Engineering",
    fit: ["technology"],
    streams: ["science", "vocational", "any"],
    level: "Class 10 or 12",
    eligibility: "Class 10 pass, basic maths comfort, state polytechnic admission.",
    exams: ["State Polytechnic CET", "ITI/Polytechnic counselling"],
    skills: ["Computer basics", "Logic building", "English typing"],
    courses: ["Web development basics", "Python fundamentals", "Digital literacy"],
    outcome: "Junior developer, technician, support engineer, later B.Tech lateral entry.",
  },
  {
    title: "Nursing and Community Health",
    fit: ["health"],
    streams: ["science"],
    level: "Class 12 Science",
    eligibility: "Class 12 PCB preferred, age and institute rules vary by state.",
    exams: ["ANM/GNM admissions", "State nursing entrance"],
    skills: ["Biology basics", "Communication", "First aid"],
    courses: ["Human anatomy basics", "Public health", "Patient care"],
    outcome: "Nursing assistant, GNM/ANM pathway, community health worker.",
  },
  {
    title: "Agri-Tech and Farm Management",
    fit: ["agriculture", "technology", "business"],
    streams: ["science", "vocational", "any"],
    level: "Class 10 or 12",
    eligibility: "Interest in farming, soil, machinery, supply chains, or agri business.",
    exams: ["Agriculture diploma admissions", "ICAR after Class 12"],
    skills: ["Crop planning", "Mobile tools", "Basic accounts"],
    courses: ["Soil health", "Drone use in farming", "Agri entrepreneurship"],
    outcome: "Agri assistant, farm manager, agri startup helper, extension services.",
  },
  {
    title: "Banking, Accounts and Micro-Enterprise",
    fit: ["business", "government"],
    streams: ["commerce", "arts", "any"],
    level: "Class 12",
    eligibility: "Class 12 pass, basic maths, interest in accounts or local enterprise.",
    exams: ["CUET", "Clerk exams after graduation", "Skill India courses"],
    skills: ["Bookkeeping", "UPI and digital payments", "Customer handling"],
    courses: ["Tally basics", "Excel for accounts", "Business communication"],
    outcome: "Accounts assistant, banking preparation, local business operator.",
  },
  {
    title: "Teacher Training and Social Work",
    fit: ["government", "creative"],
    streams: ["arts", "commerce", "science", "any"],
    level: "Class 12 or Graduation",
    eligibility: "Class 12 for D.El.Ed routes; graduation for B.Ed routes.",
    exams: ["D.El.Ed admissions", "TET after teacher training"],
    skills: ["Public speaking", "Child learning", "Local language strength"],
    courses: ["Teaching methods", "Digital classroom tools", "Community projects"],
    outcome: "Primary teacher route, NGO educator, community learning coordinator.",
  },
  {
    title: "Design, Media and Local Content Creation",
    fit: ["creative", "technology", "business"],
    streams: ["arts", "commerce", "science", "vocational", "any"],
    level: "Class 10 or 12",
    eligibility: "Portfolio and practice matter more than stream for many beginner roles.",
    exams: ["Design institute tests", "Skill certificate courses"],
    skills: ["Visual sense", "Storytelling", "Phone video editing"],
    courses: ["Canva/design basics", "Video editing", "Local language writing"],
    outcome: "Content creator, design assistant, local business marketing support.",
  },
];

const scholarships = [
  "National Scholarship Portal: category, income, minority, disability and merit schemes.",
  "State post-matric scholarships: fee support for eligible Class 11, 12, diploma and degree students.",
  "AICTE Pragati/Saksham: technical education support for eligible students.",
  "Local CSR and NGO scholarships: add district-level listings through a teacher/admin panel.",
];

const roadmap = [
  {
    week: "Week 1",
    title: "Know yourself",
    detail: "Enter interests, stream, marks range, family budget, language and location.",
  },
  {
    week: "Week 2",
    title: "Shortlist options",
    detail: "Compare 3 career paths by eligibility, cost, duration, exams and local access.",
  },
  {
    week: "Week 3",
    title: "Prepare documents",
    detail: "Track caste/income certificates, mark sheets, Aadhaar, bank account and photos.",
  },
  {
    week: "Week 4",
    title: "Take action",
    detail: "Apply for courses, entrance exams, scholarships and a starter learning module.",
  },
];

function getMatches(interest: Interest, stream: Stream, marks: number, budget: string) {
  return pathways
    .map((path) => {
      let score = 38;
      if (path.fit.includes(interest)) score += 34;
      if (path.streams.includes(stream) || path.streams.includes("any")) score += 18;
      if (marks >= 75) score += 6;
      if (budget === "low" && path.level.includes("10")) score += 4;
      return { ...path, score: Math.min(score, 98) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

type ToolInput = {
  interest?: Interest;
  stream?: Stream;
  marks?: number;
  budget?: string;
  language?: keyof typeof copy;
};

declare global {
  interface Document {
    modelContext?: {
      registerTool: (
        tool: {
          name: string;
          title: string;
          description: string;
          inputSchema: object;
          execute: (input: unknown) => unknown;
          annotations?: { readOnlyHint?: boolean; untrustedContentHint?: boolean };
        },
        options?: { signal?: AbortSignal },
      ) => void | Promise<void>;
    };
  }
}

export default function Home() {
  const [language, setLanguage] = useState<keyof typeof copy>("English");
  const [stream, setStream] = useState<Stream>("science");
  const [interest, setInterest] = useState<Interest>("technology");
  const [marks, setMarks] = useState(72);
  const [budget, setBudget] = useState("low");

  const text = copy[language];
  const matches = useMemo(
    () => getMatches(interest, stream, marks, budget),
    [budget, interest, marks, stream],
  );

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const validInterests = interests.map((item) => item.id);
    const validStreams = ["any", "science", "commerce", "arts", "vocational"];
    const validBudgets = ["low", "medium", "open"];
    const validLanguages = Object.keys(copy);

    const execute = (input: unknown) => {
      const payload = (input ?? {}) as ToolInput;
      const nextInterest = validInterests.includes(payload.interest as Interest)
        ? (payload.interest as Interest)
        : interest;
      const nextStream = validStreams.includes(payload.stream as Stream)
        ? (payload.stream as Stream)
        : stream;
      const nextBudget = validBudgets.includes(payload.budget ?? "")
        ? (payload.budget as string)
        : budget;
      const nextLanguage = validLanguages.includes(payload.language ?? "")
        ? (payload.language as keyof typeof copy)
        : language;
      const nextMarks =
        typeof payload.marks === "number" && payload.marks >= 35 && payload.marks <= 98
          ? Math.round(payload.marks)
          : marks;

      setInterest(nextInterest);
      setStream(nextStream);
      setBudget(nextBudget);
      setLanguage(nextLanguage);
      setMarks(nextMarks);

      return {
        profile: {
          interest: nextInterest,
          stream: nextStream,
          budget: nextBudget,
          language: nextLanguage,
          marks: nextMarks,
        },
        recommendations: getMatches(nextInterest, nextStream, nextMarks, nextBudget).map(
          ({ title, score, eligibility, exams, skills, outcome }) => ({
            title,
            score,
            eligibility,
            exams,
            skills,
            outcome,
          }),
        ),
      };
    };

    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: "configure_student_profile",
            title: "Configure student profile",
            description:
              "Update the visible CareerMitra demo profile and return matching career pathways.",
            inputSchema: {
              type: "object",
              properties: {
                interest: { type: "string", enum: validInterests },
                stream: { type: "string", enum: validStreams },
                marks: { type: "number", minimum: 35, maximum: 98 },
                budget: { type: "string", enum: validBudgets },
                language: { type: "string", enum: validLanguages },
              },
              additionalProperties: false,
            },
            annotations: { readOnlyHint: false, untrustedContentHint: false },
            execute,
          },
          { signal: lifecycle.signal },
        ),
      ).catch(() => undefined);
    } catch {
      return undefined;
    }

    return () => lifecycle.abort();
  }, [budget, interest, language, marks, stream]);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="relative isolate overflow-hidden border-b border-border bg-[linear-gradient(135deg,#f7fbf5_0%,#eaf7f4_42%,#fff8e6_100%)]">
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-background to-transparent" />
        <div className="mx-auto grid min-h-[720px] w-full max-w-7xl items-center gap-8 px-4 py-5 sm:px-6 lg:grid-cols-[0.98fr_1.02fr] lg:px-8">
          <div className="relative z-10 max-w-2xl py-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white/80 px-3 py-2 text-xs font-semibold uppercase text-emerald-900 shadow-sm">
              <Languages className="h-4 w-4" />
              {text.badge}
            </div>
            <h1 className="text-balance text-4xl font-bold leading-[1.03] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              {text.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-7 text-slate-700 sm:text-lg">
              {text.subtitle}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#navigator"
                className="inline-flex min-h-11 items-center gap-2 rounded-md bg-emerald-700 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <Search className="h-4 w-4" />
                {text.start}
              </a>
              <a
                href="#roadmap"
                className="inline-flex min-h-11 items-center gap-2 rounded-md border border-slate-300 bg-white/85 px-5 py-3 text-sm font-semibold text-slate-900 transition hover:border-emerald-500 hover:text-emerald-800 focus:outline-none focus:ring-4 focus:ring-emerald-200"
              >
                <Map className="h-4 w-4" />
                View roadmap
              </a>
            </div>
            <div className="mt-8 grid max-w-xl grid-cols-3 gap-3">
              {[
                ["6", "career clusters"],
                ["4", "languages planned"],
                ["30 min", "counselling flow"],
              ].map(([value, label]) => (
                <div key={label} className="border-l-2 border-emerald-500 bg-white/50 px-3 py-2">
                  <div className="text-2xl font-bold text-slate-950">{value}</div>
                  <div className="text-xs font-medium uppercase text-slate-600">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative z-10 overflow-hidden rounded-lg border border-white/70 bg-white shadow-2xl shadow-emerald-900/15">
            <Image
              src="/careermitra-hero.png"
              alt="Rural students exploring career pathways with CareerMitra"
              width={1680}
              height={945}
              priority
              className="aspect-[16/10] w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section id="navigator" className="border-b border-border bg-white">
        <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[360px_minmax(0,1fr)] lg:px-8">
          <aside className="self-start rounded-lg border border-border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-100 text-emerald-800">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold">{text.profile}</h2>
                <p className="text-sm text-muted-foreground">Tune the demo inputs.</p>
              </div>
            </div>

            <label className="block text-sm font-semibold text-slate-800" htmlFor="language">
              Guidance language
            </label>
            <select
              id="language"
              value={language}
              onChange={(event) => setLanguage(event.target.value as keyof typeof copy)}
              className="mt-2 h-11 w-full rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:ring-emerald-100"
            >
              {Object.keys(copy).map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>

            <label className="mt-5 block text-sm font-semibold text-slate-800" htmlFor="stream">
              Current background
            </label>
            <select
              id="stream"
              value={stream}
              onChange={(event) => setStream(event.target.value as Stream)}
              className="mt-2 h-11 w-full rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:ring-emerald-100"
            >
              <option value="science">Class 11-12 Science</option>
              <option value="commerce">Commerce</option>
              <option value="arts">Arts / Humanities</option>
              <option value="vocational">ITI / Vocational</option>
              <option value="any">Not decided yet</option>
            </select>

            <div className="mt-5">
              <p className="text-sm font-semibold text-slate-800">Main interest</p>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {interests.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setInterest(item.id)}
                    className={`flex min-h-16 items-center gap-2 rounded-md border px-3 text-left text-sm font-semibold transition focus:outline-none focus:ring-4 focus:ring-emerald-100 ${
                      interest === item.id
                        ? "border-emerald-600 bg-emerald-50 text-emerald-950"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                    }`}
                  >
                    <span className="[&_svg]:h-4 [&_svg]:w-4">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-5 block text-sm font-semibold text-slate-800" htmlFor="marks">
              Marks estimate: {marks}%
            </label>
            <input
              id="marks"
              type="range"
              min="35"
              max="98"
              value={marks}
              onChange={(event) => setMarks(Number(event.target.value))}
              className="mt-3 w-full accent-emerald-700"
            />

            <label className="mt-5 block text-sm font-semibold text-slate-800" htmlFor="budget">
              Family budget preference
            </label>
            <select
              id="budget"
              value={budget}
              onChange={(event) => setBudget(event.target.value)}
              className="mt-2 h-11 w-full rounded-md border border-input bg-white px-3 text-sm outline-none focus:ring-4 focus:ring-emerald-100"
            >
              <option value="low">Low cost first</option>
              <option value="medium">Balanced options</option>
              <option value="open">Open to private options</option>
            </select>
          </aside>

          <div>
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-emerald-700">Personalized output</p>
                <h2 className="mt-1 text-3xl font-bold tracking-normal text-slate-950">{text.matches}</h2>
              </div>
              <div className="inline-flex items-center gap-2 rounded-md bg-amber-100 px-3 py-2 text-sm font-semibold text-amber-950">
                <Sparkles className="h-4 w-4" />
                Demo recommendation engine
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-3">
              {matches.map((match) => (
                <article key={match.title} className="rounded-lg border border-border bg-card p-5 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-bold leading-tight text-slate-950">{match.title}</h3>
                    <span className="rounded-md bg-emerald-700 px-2 py-1 text-xs font-bold text-white">
                      {match.score}%
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{match.outcome}</p>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="font-bold text-slate-900">Eligibility</dt>
                      <dd className="mt-1 text-slate-600">{match.eligibility}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-900">Entrance / admission</dt>
                      <dd className="mt-1 text-slate-600">{match.exams.join(", ")}</dd>
                    </div>
                    <div>
                      <dt className="font-bold text-slate-900">Skills to start</dt>
                      <dd className="mt-1 text-slate-600">{match.skills.join(", ")}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f7fbf5]">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-sky-100 text-sky-800">
                <Award className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold tracking-normal text-slate-950">{text.opportunities}</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {scholarships.map((item) => (
                <div key={item} className="rounded-lg border border-emerald-100 bg-white p-4 shadow-sm">
                  <p className="text-sm leading-6 text-slate-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div id="roadmap">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-amber-100 text-amber-900">
                <BookOpen className="h-5 w-5" />
              </div>
              <h2 className="text-3xl font-bold tracking-normal text-slate-950">{text.roadmap}</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {roadmap.map((step) => (
                <article key={step.week} className="grid grid-cols-[76px_minmax(0,1fr)] gap-4 rounded-lg border border-amber-100 bg-white p-4 shadow-sm">
                  <div className="rounded-md bg-amber-500 px-2 py-3 text-center text-sm font-bold text-slate-950">
                    {step.week}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-950">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.detail}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_1fr_1fr] lg:px-8">
          {[
            ["For students", "Simple questions, local-language explanations, and career options that do not assume big-city exposure."],
            ["For mentors", "A clean counselling script with eligibility checks, document reminders, and course suggestions."],
            ["For the team", "A month-sized build: static data first, then admin uploads, then district-specific opportunity feeds."],
          ].map(([title, detail]) => (
            <div key={title}>
              <GraduationCap className="mb-3 h-6 w-6 text-emerald-300" />
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">{detail}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
