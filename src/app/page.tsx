import Link from "next/link";
import { auth } from "@/auth";

export default async function LandingPage() {
  // Gracefully handle missing env vars during initial setup
  const session = await auth().catch(() => null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Nav */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="font-bold text-lg tracking-tight">SaaS Template</span>
          <nav className="flex items-center gap-3">
            {session?.user ? (
              <>
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Dashboard
                </Link>
                <Link
                  href="/profile"
                  className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  My Profile
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-slate-600 hover:text-slate-900"
                >
                  Sign in
                </Link>
                <Link
                  href="/register"
                  className="text-sm font-medium bg-slate-900 text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-colors"
                >
                  Get started
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 text-sm font-medium px-3 py-1 rounded-full mb-8">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Built on Vercel — Auth · Postgres · Blob
        </div>

        <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          Ship your SaaS
          <br />
          <span className="text-slate-400">faster than ever</span>
        </h1>

        <p className="text-lg text-slate-500 max-w-xl mx-auto mb-10">
          A production-ready Next.js 16 template with authentication, database,
          and file storage — all wired up and ready to go.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link
            href={session?.user ? "/dashboard" : "/register"}
            className="bg-slate-900 text-white px-8 py-3 rounded-lg font-medium hover:bg-slate-700 transition-colors"
          >
            {session?.user ? "Go to dashboard" : "Start for free"}
          </Link>
          <a
            href="https://github.com/jabba2324/saas-project-template"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-slate-200 text-slate-700 px-8 py-3 rounded-lg font-medium hover:bg-slate-50 transition-colors"
          >
            View on GitHub
          </a>
        </div>

        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-6 mt-24 text-left">
          {features.map((f) => (
            <div key={f.title} className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm">
              <div className="text-2xl mb-3">{f.icon}</div>
              <h3 className="font-semibold text-slate-900 mb-1">{f.title}</h3>
              <p className="text-sm text-slate-500">{f.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

const features = [
  {
    icon: "🔐",
    title: "Auth.js v5",
    description:
      "Email and password authentication via Auth.js v5. Stateless JWT sessions — no database session table required.",
  },
  {
    icon: "🗄️",
    title: "Vercel Postgres",
    description:
      "Neon-powered serverless Postgres with Drizzle ORM. Type-safe queries and push-based migrations included.",
  },
  {
    icon: "🖼️",
    title: "Vercel Blob",
    description:
      "Profile picture uploads stored privately in Vercel Blob. Served securely via an authenticated API route.",
  },
];
