"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  Banknote,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ClipboardList,
  GraduationCap,
  HeartPulse,
  Languages,
  Leaf,
  Lightbulb,
  Menu,
  Microscope,
  Palette,
  PhoneCall,
  Search,
  Shield,
  Sparkles,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Language = "English" | "Hindi";
type Category =
  | "All"
  | "Technology"
  | "Healthcare"
  | "Agriculture"
  | "Education"
  | "Government"
  | "Business"
  | "Arts"
  | "Vocational"
  | "Science"
  | "Finance";

type Assessment = {
  interests: string;
  education: string;
  skills: string;
  dream: string;
  location: string;
};

const languageCopy = {
  English: {
    navAssessment: "Career Assessment",
    navPathways: "Pathways",
    navScholarships: "Scholarships",
    navExams: "Exams",
    navResources: "Resources",
    start: "Start Assessment",
    languageButton: "हिंदी",
    eyebrow: "Career guidance for students beyond metro cities",
    title: "Plan a career path that fits your real life",
    subtitle:
      "CareerMitra helps students explore practical careers, scholarships, entrance exams, skills, and next steps in a simple guidance flow.",
    quiz: "Take the Career Quiz",
    explore: "Explore Pathways",
    assessmentTitle: "Tell us about yourself",
    assessmentSubtitle:
      "Answer a few questions and get tailored suggestions you can discuss with a parent, teacher, or mentor.",
    submit: "Get My Recommendations",
    recommendations: "Your recommended starting points",
    empty:
      "Fill the form and tap the button to see your best-matching career options.",
  },
  Hindi: {
    navAssessment: "Career Assessment",
    navPathways: "Pathways",
    navScholarships: "Scholarships",
    navExams: "Exams",
    navResources: "Resources",
    start: "Assessment Shuru Karein",
    languageButton: "English",
    eyebrow: "Chhote shehron aur gaon ke students ke liye career guidance",
    title: "Apni zindagi ke hisaab se career raasta banao",
    subtitle:
      "CareerMitra practical careers, scholarships, entrance exams, skills aur next steps ko ek simple guidance flow mein dikhata hai.",
    quiz: "Career Quiz Dein",
    explore: "Pathways Dekhein",
    assessmentTitle: "Apne baare mein batayein",
    assessmentSubtitle:
      "Kuch sawalon ke jawab dekar teacher, parent ya mentor ke saath discuss karne layak suggestions paayein.",
    submit: "Meri Recommendations Dikhao",
    recommendations: "Aapke recommended starting points",
    empty:
      "Form bhar kar button dabayein; yahan aapke best-matching career options dikhai denge.",
  },
};

const categories: Category[] = [
  "All",
  "Technology",
  "Healthcare",
  "Agriculture",
  "Education",
  "Government",
  "Business",
  "Arts",
  "Vocational",
  "Science",
  "Finance",
];

const iconMap: Record<Category, React.ReactNode> = {
  All: <Search />,
  Technology: <BriefcaseBusiness />,
  Healthcare: <HeartPulse />,
  Agriculture: <Leaf />,
  Education: <GraduationCap />,
  Government: <Shield />,
  Business: <Building2 />,
  Arts: <Palette />,
  Vocational: <Wrench />,
  Science: <Microscope />,
  Finance: <Banknote />,
};

const pathways = [
  {
    category: "Agriculture" as Category,
    title: "Agricultural Scientist / Agri-Entrepreneur",
    description:
      "Use modern farming knowledge to improve yields, solve local farm problems, or build an agriculture business.",
    salary: "Rs 3-8 LPA, higher with entrepreneurship",
    demand: "High",
    eligibility: "Class 12 Science for degree routes; Class 10 or 12 for diploma and skill routes.",
    skills: ["Soil and crop basics", "Data collection", "Local market awareness"],
    roadmap: ["Choose agriculture or science subjects", "Prepare for ICAR or state admissions", "Intern with farms, FPOs, or krishi kendras"],
  },
  {
    category: "Government" as Category,
    title: "Government Officer / Public Services",
    description:
      "Work in administration, revenue, railways, SSC, police, defence, or public service roles with steady growth.",
    salary: "Rs 4-18 LPA with allowances",
    demand: "Steady",
    eligibility: "Class 12 for several uniformed services; graduation for UPSC, SSC CGL, banking, and state services.",
    skills: ["General studies", "Reasoning", "Writing practice"],
    roadmap: ["Build reading habits", "Track exam calendars", "Attempt mock tests every week"],
  },
  {
    category: "Education" as Category,
    title: "Teacher / Learning Mentor",
    description:
      "Teach in schools, coaching centres, community programs, or digital learning platforms.",
    salary: "Rs 3-9 LPA",
    demand: "Steady",
    eligibility: "D.El.Ed, B.Ed, TET, CTET, or subject-specific qualifications depending on the role.",
    skills: ["Clear explanation", "Child development", "Subject mastery"],
    roadmap: ["Choose a teaching level", "Complete required training", "Prepare for TET or CTET"],
  },
  {
    category: "Finance" as Category,
    title: "Banking / Finance Professional",
    description:
      "Work in banks, microfinance, insurance, accounts, or local enterprise finance support.",
    salary: "Rs 3-8 LPA",
    demand: "Steady",
    eligibility: "Class 12 for early accounts roles; graduation for bank officer and analyst routes.",
    skills: ["Basic maths", "Bookkeeping", "Customer communication"],
    roadmap: ["Learn spreadsheets and accounts", "Prepare for CUET or commerce courses", "Attempt banking aptitude tests"],
  },
  {
    category: "Vocational" as Category,
    title: "Electrician / ITI Skilled Trades",
    description:
      "Build job-ready technical skills through ITI or apprenticeships, with a path to employment or self-employment.",
    salary: "Rs 2-5 LPA, more with own work",
    demand: "High",
    eligibility: "Class 10 is enough for many ITI trades; some advanced routes need Class 12.",
    skills: ["Safety practice", "Tool handling", "Problem diagnosis"],
    roadmap: ["Select a local high-demand trade", "Complete ITI or apprenticeship", "Build a client and service record"],
  },
  {
    category: "Arts" as Category,
    title: "Designer / Digital Creator",
    description:
      "Create graphics, videos, local-language content, brand material, and digital campaigns for businesses.",
    salary: "Rs 2.5-10 LPA",
    demand: "High",
    eligibility: "Portfolio and practice matter strongly; formal design courses can help.",
    skills: ["Visual sense", "Storytelling", "Mobile editing"],
    roadmap: ["Make 10 sample projects", "Learn design tools", "Offer work to local businesses"],
  },
  {
    category: "Healthcare" as Category,
    title: "Doctor / Medical Professional",
    description:
      "Diagnose and treat patients through MBBS, AYUSH, dental, pharmacy, or allied medical routes.",
    salary: "Rs 8-25 LPA, varies widely",
    demand: "High",
    eligibility: "Class 12 PCB with NEET for MBBS, BDS, AYUSH, and several medical courses.",
    skills: ["Biology", "Discipline", "Patient care"],
    roadmap: ["Strengthen PCB basics", "Prepare for NEET", "Compare government and private college costs"],
  },
  {
    category: "Business" as Category,
    title: "Entrepreneur / Small Business Owner",
    description:
      "Start a shop, service, agri-business, online store, or local distribution venture with practical finance planning.",
    salary: "Variable, unlimited potential",
    demand: "High",
    eligibility: "No fixed degree required; business skills, market understanding, and discipline are essential.",
    skills: ["Selling", "Budgeting", "Customer trust"],
    roadmap: ["Find a local problem", "Test a small paid offer", "Use government schemes responsibly"],
  },
  {
    category: "Technology" as Category,
    title: "Software Developer / IT Professional",
    description:
      "Build apps, websites, automation, and software systems for companies, startups, or freelance clients.",
    salary: "Rs 3-15 LPA, grows with skill",
    demand: "High",
    eligibility: "Engineering, BCA, diploma, or strong portfolio routes can all work.",
    skills: ["Coding basics", "English reading", "Problem solving"],
    roadmap: ["Learn one programming language", "Build small projects", "Apply for internships or freelance tasks"],
  },
  {
    category: "Healthcare" as Category,
    title: "Staff Nurse / Healthcare Worker",
    description:
      "Care for patients in hospitals, clinics, and community health settings with steady rural and urban demand.",
    salary: "Rs 2.5-6 LPA",
    demand: "High",
    eligibility: "ANM, GNM, or B.Sc Nursing routes after Class 12, depending on course and institute.",
    skills: ["First aid", "Communication", "Care discipline"],
    roadmap: ["Check nursing admissions", "Prepare documents", "Practice biology and communication"],
  },
  {
    category: "Science" as Category,
    title: "Lab Technician / Research Assistant",
    description:
      "Support labs in healthcare, agriculture, food testing, environment, or science education.",
    salary: "Rs 2.5-7 LPA",
    demand: "Growing",
    eligibility: "Class 12 Science, diploma, B.Sc, or lab technician certification.",
    skills: ["Observation", "Measurements", "Record keeping"],
    roadmap: ["Choose a science subject", "Find diploma or B.Sc options", "Get practical lab exposure"],
  },
  {
    category: "Technology" as Category,
    title: "Data Analyst",
    description:
      "Use spreadsheets, charts, and basic programming to help organisations make better decisions.",
    salary: "Rs 4-12 LPA",
    demand: "High",
    eligibility: "Any stream can enter with maths comfort, spreadsheet skill, and a project portfolio.",
    skills: ["Excel", "Charts", "Basic statistics"],
    roadmap: ["Learn spreadsheets", "Build dashboards from public data", "Study SQL or Python basics"],
  },
];

const scholarships = [
  {
    title: "Central Sector Scheme of Scholarships",
    provider: "Ministry of Education",
    description:
      "Merit-cum-means support for academically strong students from low-income families.",
    amount: "Rs 12,000 per year for UG, Rs 20,000 for PG",
    level: "Undergraduate",
    deadline: "August to September",
    eligibility:
      "80%+ in Class 12, family income below Rs 8 lakh, pursuing graduation.",
    url: "https://scholarships.gov.in/",
  },
  {
    title: "PG Indira Gandhi Scholarship for Single Girl Child",
    provider: "UGC",
    description:
      "Support for single girl child students pursuing postgraduate education.",
    amount: "Rs 36,200 per year for 2 years",
    level: "Postgraduate",
    deadline: "September to November",
    eligibility: "Single girl child pursuing post-graduation, up to 30 years age.",
    url: "https://ugc.gov.in/",
  },
  {
    title: "National Scholarship Portal Post-Matric",
    provider: "Government of India",
    description:
      "Central and state scholarship access for eligible post-matric students.",
    amount: "Rs 1,000 to Rs 20,000 per year, varies by scheme",
    level: "Class 11 onward",
    deadline: "October to November, varies yearly",
    eligibility:
      "SC, ST, OBC, minority, and other eligible students based on scheme rules.",
    url: "https://scholarships.gov.in/",
  },
  {
    title: "INSPIRE Scholarship for Higher Education",
    provider: "Department of Science and Technology",
    description:
      "Encourages talented students to pursue science and research degrees.",
    amount: "Rs 80,000 per year",
    level: "Undergraduate",
    deadline: "July to September",
    eligibility:
      "Top-performing Class 12 science students pursuing natural sciences.",
    url: "https://online-inspire.gov.in/",
  },
  {
    title: "AICTE Pragati Scholarship for Girls",
    provider: "AICTE",
    description:
      "Financial support for girl students entering technical diploma or degree courses.",
    amount: "Rs 50,000 per year",
    level: "Diploma / Degree",
    deadline: "September to October",
    eligibility:
      "Girl students admitted to technical education, family income below Rs 8 lakh.",
    url: "https://aictescholarship.gov.in/",
  },
  {
    title: "Post-Matric Scholarship for Minorities",
    provider: "Ministry of Minority Affairs",
    description:
      "Financial assistance for minority community students after Class 10.",
    amount: "Up to Rs 20,000 per year",
    level: "All post-matric levels",
    deadline: "August to October",
    eligibility:
      "Eligible minority students at post-matric level with income limits as notified.",
    url: "https://scholarships.gov.in/",
  },
];

const exams = [
  {
    title: "JEE Main",
    full: "Joint Entrance Examination - Main",
    field: "Engineering",
    description:
      "Entrance exam for NITs, IIITs, engineering colleges, and JEE Advanced qualification.",
    eligibility: "Class 12 with Physics, Chemistry, and Mathematics.",
    period: "January and April sessions",
    pattern: "Computer-based papers with objective questions.",
    topics: ["Physics", "Chemistry", "Mathematics"],
    url: "https://jeemain.nta.ac.in/",
  },
  {
    title: "NEET-UG",
    full: "National Eligibility cum Entrance Test",
    field: "Medical",
    description:
      "Single major entrance exam for MBBS, BDS, AYUSH, and many allied health admissions.",
    eligibility: "Class 12 with Physics, Chemistry, Biology, and English.",
    period: "Usually February to March applications, May exam",
    pattern: "Offline test with Physics, Chemistry, Botany, and Zoology.",
    topics: ["Physics", "Chemistry", "Biology"],
    url: "https://neet.nta.nic.in/",
  },
  {
    title: "UPSC Civil Services",
    full: "Union Public Service Commission Civil Services Examination",
    field: "Civil Services",
    description:
      "Recruitment route for IAS, IPS, IFS, and other central Group A services.",
    eligibility: "Graduation in any discipline, age rules apply.",
    period: "Applications usually in February",
    pattern: "Prelims, Mains, and Interview.",
    topics: ["General Studies", "CSAT", "Essay", "Current Affairs"],
    url: "https://upsc.gov.in/",
  },
  {
    title: "SSC CGL",
    full: "Staff Selection Commission Combined Graduate Level",
    field: "Government",
    description:
      "Recruitment for Group B and C posts in central ministries and departments.",
    eligibility: "Graduation from a recognised university.",
    period: "Usually April to May applications",
    pattern: "Tiered objective and skill-based examination.",
    topics: ["Quantitative Aptitude", "English", "Reasoning", "General Awareness"],
    url: "https://ssc.nic.in/",
  },
  {
    title: "IBPS PO",
    full: "Institute of Banking Personnel Selection Probationary Officer",
    field: "Banking",
    description:
      "Recruitment exam for probationary officer posts in public sector banks.",
    eligibility: "Graduation in any discipline, age rules apply.",
    period: "Usually August to September applications",
    pattern: "Prelims, Mains, and Interview.",
    topics: ["Reasoning", "English", "Quantitative Aptitude", "General Awareness"],
    url: "https://ibps.in/",
  },
  {
    title: "NDA",
    full: "National Defence Academy Examination",
    field: "Defence",
    description:
      "Entry route for Army, Navy, and Air Force officer training after school.",
    eligibility: "Class 12; Physics and Maths needed for Air Force and Navy.",
    period: "Usually January and June applications",
    pattern: "Written exam followed by SSB interview.",
    topics: ["Mathematics", "English", "GK", "Science"],
    url: "https://upsc.gov.in/",
  },
  {
    title: "CLAT",
    full: "Common Law Admission Test",
    field: "Law",
    description:
      "Entrance exam for undergraduate and postgraduate law programs at National Law Universities.",
    eligibility: "Class 12 for UG law; LLB for PG law.",
    period: "Usually July to October applications",
    pattern: "Reading-heavy aptitude test.",
    topics: ["English", "Current Affairs", "Legal Reasoning", "Logic"],
    url: "https://consortiumofnlus.ac.in/",
  },
  {
    title: "CUET-UG",
    full: "Common University Entrance Test - Undergraduate",
    field: "General",
    description:
      "Single-window entrance test for undergraduate programs in many universities.",
    eligibility: "Class 12 from a recognised board.",
    period: "Usually February to April applications",
    pattern: "Computer-based papers selected by subject.",
    topics: ["Language", "Domain Subjects", "General Test"],
    url: "https://cuet.samarth.ac.in/",
  },
];

const resources = [
  {
    title: "Free Learning Resources",
    detail:
      "Course playlists, open study material, language-friendly channels, and beginner projects for every stream.",
    icon: <BookOpen />,
  },
  {
    title: "Mentorship & Guidance",
    detail:
      "A simple way to prepare questions before speaking with teachers, alumni, seniors, or local counsellors.",
    icon: <Users />,
  },
  {
    title: "Exam Preparation Tips",
    detail:
      "Timetable ideas, mock-test habits, revision cycles, and document reminders for exam season.",
    icon: <ClipboardList />,
  },
  {
    title: "Helpline & Support",
    detail:
      "Keep nearby counselling centres, scholarship help desks, and trusted school contacts in one place.",
    icon: <PhoneCall />,
  },
];

function getRecommendations(form: Assessment) {
  const combined = `${form.interests} ${form.skills} ${form.dream}`.toLowerCase();
  const education = form.education.toLowerCase();

  return pathways
    .map((path) => {
      let score = 42;
      const haystack = `${path.category} ${path.title} ${path.description} ${path.skills.join(" ")}`.toLowerCase();
      for (const word of combined.split(/[^a-z0-9]+/).filter((item) => item.length > 2)) {
        if (haystack.includes(word)) score += 7;
      }
      if (education.includes("8") && path.eligibility.includes("Class 10")) score += 12;
      if (education.includes("11") && path.eligibility.includes("Class 12")) score += 12;
      if (education.includes("graduation") && path.eligibility.toLowerCase().includes("graduation")) score += 14;
      if (combined.includes("doctor") || combined.includes("nurse") || combined.includes("health")) {
        if (path.category === "Healthcare") score += 28;
      }
      if (combined.includes("computer") || combined.includes("coding") || combined.includes("software")) {
        if (path.category === "Technology") score += 28;
      }
      if (combined.includes("farm") || combined.includes("agri")) {
        if (path.category === "Agriculture") score += 28;
      }
      if (combined.includes("government") || combined.includes("police") || combined.includes("ias")) {
        if (path.category === "Government") score += 24;
      }
      return { ...path, score: Math.min(score, 96) };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

type ToolInput = Partial<Assessment> & { language?: Language; category?: Category };

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
  const [language, setLanguage] = useState<Language>("English");
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState<Category>("All");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState<Assessment>({
    interests: "",
    education: "Class 8-10 (Middle/High School)",
    skills: "",
    dream: "",
    location: "",
  });

  const text = languageCopy[language];
  const filteredPathways = useMemo(
    () => pathways.filter((path) => category === "All" || path.category === category),
    [category],
  );
  const recommendations = useMemo(() => getRecommendations(form), [form]);

  useEffect(() => {
    const context = document.modelContext;
    if (!context?.registerTool) return;

    const lifecycle = new AbortController();
    const execute = (input: unknown) => {
      const payload = (input ?? {}) as ToolInput;
      const nextForm = {
        interests: payload.interests ?? form.interests,
        education: payload.education ?? form.education,
        skills: payload.skills ?? form.skills,
        dream: payload.dream ?? form.dream,
        location: payload.location ?? form.location,
      };
      const nextLanguage = payload.language === "Hindi" || payload.language === "English" ? payload.language : language;
      const nextCategory = categories.includes(payload.category as Category) ? (payload.category as Category) : category;

      setForm(nextForm);
      setLanguage(nextLanguage);
      setCategory(nextCategory);
      setSubmitted(true);

      return {
        profile: nextForm,
        language: nextLanguage,
        category: nextCategory,
        recommendations: getRecommendations(nextForm).map((item) => ({
          title: item.title,
          category: item.category,
          score: item.score,
          eligibility: item.eligibility,
          roadmap: item.roadmap,
        })),
      };
    };

    try {
      void Promise.resolve(
        context.registerTool(
          {
            name: "create_career_guidance_plan",
            title: "Create career guidance plan",
            description:
              "Fill the visible CareerMitra assessment profile and return matching career, scholarship, and exam guidance.",
            inputSchema: {
              type: "object",
              properties: {
                interests: { type: "string" },
                education: { type: "string" },
                skills: { type: "string" },
                dream: { type: "string" },
                location: { type: "string" },
                language: { type: "string", enum: ["English", "Hindi"] },
                category: { type: "string", enum: categories },
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
  }, [category, form, language]);

  function updateField(field: keyof Assessment, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/92 backdrop-blur">
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
          <a href="#home" className="flex items-center gap-2 font-bold text-slate-950" onClick={() => setMenuOpen(false)}>
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-600 text-white shadow-sm">C</span>
            <span>Career<span className="text-sky-600">Mitra</span></span>
          </a>
          <div className="hidden items-center gap-8 md:flex">
            <a className="text-sm font-semibold text-slate-600 hover:text-sky-700" href="#assessment">{text.navAssessment}</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-sky-700" href="#pathways">{text.navPathways}</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-sky-700" href="#scholarships">{text.navScholarships}</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-sky-700" href="#exams">{text.navExams}</a>
            <a className="text-sm font-semibold text-slate-600 hover:text-sky-700" href="#resources">{text.navResources}</a>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              type="button"
              onClick={() => setLanguage(language === "English" ? "Hindi" : "English")}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-4 focus:ring-sky-100"
            >
              <Languages className="h-4 w-4" />
              {text.languageButton}
            </button>
            <a className="inline-flex h-10 items-center rounded-lg bg-sky-600 px-4 text-sm font-bold text-white shadow-sm shadow-sky-900/10 hover:bg-sky-700" href="#assessment">
              {text.start}
            </a>
          </div>
          <button
            type="button"
            className="grid h-10 w-10 place-items-center rounded-lg border border-slate-200 md:hidden"
            onClick={() => setMenuOpen((value) => !value)}
            aria-label="Open menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {menuOpen ? (
          <div className="border-t border-slate-200 bg-white px-4 py-4 md:hidden">
            <div className="grid gap-3">
              {[
                [text.navAssessment, "#assessment"],
                [text.navPathways, "#pathways"],
                [text.navScholarships, "#scholarships"],
                [text.navExams, "#exams"],
                [text.navResources, "#resources"],
              ].map(([label, href]) => (
                <a key={href} className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50" href={href} onClick={() => setMenuOpen(false)}>
                  {label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => setLanguage(language === "English" ? "Hindi" : "English")}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 text-sm font-semibold"
              >
                <Languages className="h-4 w-4" />
                {text.languageButton}
              </button>
            </div>
          </div>
        ) : null}
      </header>

      <section id="home" className="overflow-hidden bg-white">
        <div className="mx-auto grid min-h-[calc(100vh-4rem)] w-full max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-xs font-bold uppercase text-sky-800">
              <Sparkles className="h-3.5 w-3.5" />
              {text.eyebrow}
            </div>
            <h1 className="max-w-3xl text-4xl font-black leading-[1.03] tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              {text.title}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{text.subtitle}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="inline-flex min-h-12 items-center gap-2 rounded-lg bg-sky-600 px-5 py-3 font-bold text-white shadow-lg shadow-sky-900/15 hover:bg-sky-700" href="#assessment">
                {text.quiz}
                <ArrowRight className="h-4 w-4" />
              </a>
              <a className="inline-flex min-h-12 items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-3 font-bold text-slate-700 hover:border-sky-300 hover:text-sky-700" href="#pathways">
                {text.explore}
              </a>
            </div>
          </div>
          <div className="relative">
            <div className="overflow-hidden rounded-lg border border-slate-100 bg-slate-50 shadow-2xl shadow-sky-950/12">
              <Image
                src="/careermitra-hero.png"
                alt="Students in a rural setting exploring future career possibilities"
                width={1680}
                height={945}
                priority
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/10]"
              />
            </div>
            <div className="absolute -bottom-5 left-5 rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
              <p className="text-xs font-bold uppercase text-slate-500">Guidance Score</p>
              <p className="text-3xl font-black text-sky-700">100%</p>
              <p className="text-sm text-slate-600">Personalised</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-4 lg:col-span-2">
            {[
              ["12+", "Career Pathways", <Brain key="brain" />],
              ["8+", "Scholarships", <Award key="award" />],
              ["10+", "Exams", <GraduationCap key="grad" />],
              ["2", "Languages", <Languages key="lang" />],
            ].map(([value, label, icon]) => (
              <div key={label as string} className="flex items-center gap-4 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-sky-50 text-sky-700 [&_svg]:h-5 [&_svg]:w-5">{icon}</span>
                <span>
                  <span className="block text-2xl font-black text-slate-950">{value}</span>
                  <span className="block text-sm text-slate-500">{label}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="assessment" className="border-y border-slate-200 bg-sky-50/50">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-xs font-bold uppercase text-sky-800">
              <Lightbulb className="h-4 w-4" />
              Guided Assessment
            </div>
            <h2 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">{text.assessmentTitle}</h2>
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">{text.assessmentSubtitle}</p>

            <form
              className="mt-7 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              onSubmit={(event) => {
                event.preventDefault();
                setSubmitted(true);
              }}
            >
              <label className="block text-sm font-bold text-slate-800" htmlFor="interests">Your Interests *</label>
              <textarea
                id="interests"
                required
                value={form.interests}
                onChange={(event) => updateField("interests", event.target.value)}
                placeholder="e.g. computers, farming, helping people, drawing, maths..."
                className="mt-2 min-h-24 w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />

              <label className="mt-4 block text-sm font-bold text-slate-800" htmlFor="education">Current Education Level *</label>
              <select
                id="education"
                value={form.education}
                onChange={(event) => updateField("education", event.target.value)}
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              >
                <option>Class 8-10 (Middle/High School)</option>
                <option>Class 11-12 (Higher Secondary)</option>
                <option>Graduation (B.A/B.Sc/B.Com)</option>
                <option>Diploma / ITI</option>
                <option>Post Graduation</option>
                <option>Other</option>
              </select>

              <label className="mt-4 block text-sm font-bold text-slate-800" htmlFor="skills">Your Skills *</label>
              <textarea
                id="skills"
                required
                value={form.skills}
                onChange={(event) => updateField("skills", event.target.value)}
                placeholder="e.g. good at maths, public speaking, coding, painting..."
                className="mt-2 min-h-20 w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />

              <label className="mt-4 block text-sm font-bold text-slate-800" htmlFor="dream">Your Dream / Aspiration *</label>
              <textarea
                id="dream"
                required
                value={form.dream}
                onChange={(event) => updateField("dream", event.target.value)}
                placeholder="e.g. I want to become an engineer and support my family"
                className="mt-2 min-h-20 w-full resize-y rounded-lg border border-slate-200 px-3 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />

              <label className="mt-4 block text-sm font-bold text-slate-800" htmlFor="location">Location (optional)</label>
              <input
                id="location"
                value={form.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="e.g. Ratlam, Madhya Pradesh"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 px-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
              />

              <button type="submit" className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-sky-600 px-5 py-3 font-bold text-white hover:bg-sky-700 focus:outline-none focus:ring-4 focus:ring-sky-100">
                <Sparkles className="h-4 w-4" />
                {text.submit}
              </button>
            </form>
          </div>

          <div className="self-start rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase text-sky-700">Assessment Output</p>
                <h3 className="mt-1 text-2xl font-black text-slate-950">{text.recommendations}</h3>
              </div>
              <CheckCircle2 className="h-8 w-8 text-emerald-600" />
            </div>
            {!submitted ? (
              <div className="mt-5 rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm leading-7 text-slate-600">
                {text.empty}
              </div>
            ) : (
              <div className="mt-5 grid gap-4">
                {recommendations.map((item) => (
                  <article key={item.title} className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs font-bold uppercase text-sky-700">{item.category}</p>
                        <h4 className="mt-1 text-lg font-black text-slate-950">{item.title}</h4>
                      </div>
                      <span className="rounded-lg bg-emerald-600 px-2.5 py-1 text-sm font-black text-white">{item.score}%</span>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p>
                    <div className="mt-4 grid gap-2 sm:grid-cols-3">
                      {item.roadmap.map((step, index) => (
                        <div key={step} className="rounded-lg bg-white p-3 text-sm text-slate-700">
                          <span className="mb-1 block text-xs font-black text-sky-700">Step {index + 1}</span>
                          {step}
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="pathways" className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Career Pathways" title="Explore Career Opportunities" detail="Browse careers across fields. See skills needed, eligibility, income range, demand, and a step-by-step starting plan." />
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCategory(item)}
                className={`inline-flex min-h-9 items-center gap-2 rounded-full px-4 text-sm font-bold transition focus:outline-none focus:ring-4 focus:ring-sky-100 [&_svg]:h-4 [&_svg]:w-4 ${
                  category === item ? "bg-sky-600 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {iconMap[item]}
                {item}
              </button>
            ))}
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredPathways.map((path) => {
              const isExpanded = expanded === path.title;
              return (
                <article key={path.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-sky-200 hover:shadow-lg">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-lg bg-sky-50 text-sky-700 [&_svg]:h-5 [&_svg]:w-5">{iconMap[path.category]}</span>
                    <p className="text-sm font-black uppercase text-sky-700">{path.category}</p>
                  </div>
                  <h3 className="mt-4 text-xl font-black leading-tight text-slate-950">{path.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{path.description}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                    <span className="rounded-full bg-emerald-50 px-3 py-1 font-bold text-emerald-700">{path.salary}</span>
                    <span className="rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-700">{path.demand}</span>
                  </div>
                  <button type="button" onClick={() => setExpanded(isExpanded ? null : path.title)} className="mt-4 inline-flex items-center gap-1 text-sm font-black text-sky-700 hover:text-sky-900">
                    {isExpanded ? "Hide details" : "View details"}
                    {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {isExpanded ? (
                    <div className="mt-4 border-t border-slate-200 pt-4">
                      <p className="text-sm font-black text-slate-950">Eligibility</p>
                      <p className="mt-1 text-sm leading-6 text-slate-600">{path.eligibility}</p>
                      <p className="mt-4 text-sm font-black text-slate-950">Skills to start</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {path.skills.map((skill) => (
                          <span key={skill} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{skill}</span>
                        ))}
                      </div>
                      <p className="mt-4 text-sm font-black text-slate-950">Roadmap</p>
                      <ol className="mt-2 grid gap-2 text-sm text-slate-600">
                        {path.roadmap.map((step) => (
                          <li key={step} className="rounded-lg bg-slate-50 p-3">{step}</li>
                        ))}
                      </ol>
                    </div>
                  ) : null}
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="scholarships" className="border-y border-slate-200 bg-amber-50/50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Financial Support" title="Find Scholarships for You" detail="Discover scholarships students may be eligible for, from government schemes to national foundations." />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {scholarships.map((scholarship) => (
              <article key={scholarship.title} className="flex flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-amber-200 hover:shadow-lg">
                <h3 className="text-lg font-black leading-tight text-slate-950">{scholarship.title}</h3>
                <p className="mt-1 text-sm font-bold text-amber-700">{scholarship.provider}</p>
                <p className="mt-3 text-sm leading-6 text-slate-600">{scholarship.description}</p>
                <dl className="mt-4 grid gap-3 text-sm">
                  <InfoTerm label="Amount" value={scholarship.amount} />
                  <InfoTerm label="Level" value={scholarship.level} />
                  <InfoTerm label="Deadline" value={scholarship.deadline} />
                  <InfoTerm label="Eligibility" value={scholarship.eligibility} />
                </dl>
                <a className="mt-5 inline-flex items-center gap-1 text-sm font-black text-amber-700 hover:text-amber-900" href={scholarship.url} target="_blank" rel="noreferrer">
                  How to Apply
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="exams" className="bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Entrance Examinations" title="Prepare for Entrance Exams" detail="Key information about major entrance exams: eligibility, application period, exam pattern, and topics to prepare." />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {exams.map((exam) => (
              <article key={exam.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-indigo-200 hover:shadow-lg">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-black text-slate-950">{exam.title}</h3>
                    <p className="mt-1 text-sm font-semibold text-slate-500">{exam.full}</p>
                  </div>
                  <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-black uppercase text-indigo-700">{exam.field}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{exam.description}</p>
                <dl className="mt-4 grid gap-3 text-sm">
                  <InfoTerm label="Eligibility" value={exam.eligibility} />
                  <InfoTerm label="Application Period" value={exam.period} />
                  <InfoTerm label="Exam Pattern" value={exam.pattern} />
                </dl>
                <div className="mt-4">
                  <p className="text-xs font-black uppercase text-slate-500">Key Topics</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {exam.topics.map((topic) => (
                      <span key={topic} className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">{topic}</span>
                    ))}
                  </div>
                </div>
                <a className="mt-5 inline-flex items-center gap-1 text-sm font-black text-indigo-700 hover:text-indigo-900" href={exam.url} target="_blank" rel="noreferrer">
                  Official Website
                  <ArrowRight className="h-4 w-4" />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="resources" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Actionable Guidance" title="Resources to Help You Succeed" detail="Practical guidance and tools that support the journey after choosing a direction." />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {resources.map((resource) => (
              <article key={resource.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-lg">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-sky-50 text-sky-700 [&_svg]:h-5 [&_svg]:w-5">{resource.icon}</span>
                <h3 className="mt-5 text-lg font-black text-slate-950">{resource.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{resource.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 text-white">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2 font-black">
              <span className="grid h-9 w-9 place-items-center rounded-lg bg-sky-500">C</span>
              CareerMitra
            </div>
            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              Guiding students toward brighter futures, one practical career step at a time.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase text-slate-300">Quick Links</h2>
            <div className="mt-4 grid gap-2">
              {[
                [text.navAssessment, "#assessment"],
                [text.navPathways, "#pathways"],
                [text.navScholarships, "#scholarships"],
                [text.navExams, "#exams"],
                [text.navResources, "#resources"],
              ].map(([label, href]) => (
                <a key={href} className="text-sm text-slate-400 hover:text-sky-300" href={href}>{label}</a>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-black uppercase text-slate-300">About</h2>
            <p className="mt-4 text-sm leading-6 text-slate-400">
              CareerMitra is a multilingual career guidance platform built to help students make informed decisions with confidence.
            </p>
            <p className="mt-5 text-sm text-slate-500">© 2026 CareerMitra. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}

function SectionHeading({ eyebrow, title, detail }: { eyebrow: string; title: string; detail: string }) {
  return (
    <div className="max-w-3xl">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-2 text-xs font-black uppercase text-sky-800">
        <Sparkles className="h-3.5 w-3.5" />
        {eyebrow}
      </div>
      <h2 className="text-3xl font-black tracking-normal text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-7 text-slate-600">{detail}</p>
    </div>
  );
}

function InfoTerm({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-black text-slate-950">{label}</dt>
      <dd className="mt-1 leading-6 text-slate-600">{value}</dd>
    </div>
  );
}
