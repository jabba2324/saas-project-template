import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/toaster";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const initials = session.user?.name
    ? session.user.name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : session.user?.email?.[0].toUpperCase() ?? "?";

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Top nav */}
        <header className="bg-white border-b sticky top-0 z-10">
          <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
            <Link href="/dashboard" className="font-bold text-slate-900 tracking-tight">
              SaaS Template
            </Link>

            <nav className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Dashboard
              </Link>
              <Link
                href="/profile"
                className="text-sm text-slate-600 hover:text-slate-900 font-medium"
              >
                Profile
              </Link>

              <div className="flex items-center gap-3 pl-3 border-l border-slate-200">
                <Link href="/profile">
                  <Avatar className="h-8 w-8 cursor-pointer ring-2 ring-transparent hover:ring-slate-300 transition-all">
                    <AvatarImage src="/api/profile/avatar" alt={session.user?.name ?? "User"} />
                    <AvatarFallback className="text-xs">{initials}</AvatarFallback>
                  </Avatar>
                </Link>

                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button variant="ghost" size="sm" type="submit">
                    Sign out
                  </Button>
                </form>
              </div>
            </nav>
          </div>
        </header>

        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
      </div>
      <Toaster />
    </>
  );
}
