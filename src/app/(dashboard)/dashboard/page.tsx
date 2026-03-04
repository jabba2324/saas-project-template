import { auth } from "@/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const metadata = { title: "Dashboard — SaaS Template" };

export default async function DashboardPage() {
  const session = await auth();
  const name = session?.user?.name ?? session?.user?.email ?? "there";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-500 mt-1">Welcome back, {name}!</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard title="Total Users" value="1" description="Registered accounts" />
        <MetricCard title="Storage Used" value="0 B" description="Vercel Blob usage" />
        <MetricCard title="DB Queries" value="—" description="Vercel Postgres" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting started</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-slate-600">
          <Step number={1} text="Link a Vercel Postgres store in the Vercel dashboard and run vercel env pull .env.local" />
          <Step number={2} text="Link a Vercel Blob store and add BLOB_READ_WRITE_TOKEN to your env" />
          <Step number={3} text="Add AUTH_GOOGLE_ID / AUTH_GITHUB_ID OAuth credentials" />
          <Step number={4} text="Run npm run db:push to create all tables" />
          <Step number={5} text="Deploy with vercel --prod and enjoy your SaaS!" />
        </CardContent>
      </Card>
    </div>
  );
}

function MetricCard({ title, value, description }: { title: string; value: string; description: string }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-500">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-bold text-slate-900">{value}</p>
        <p className="text-xs text-slate-400 mt-1">{description}</p>
      </CardContent>
    </Card>
  );
}

function Step({ number, text }: { number: number; text: string }) {
  return (
    <div className="flex gap-3">
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-100 text-slate-600 text-xs font-bold flex items-center justify-center">
        {number}
      </span>
      <span>{text}</span>
    </div>
  );
}
