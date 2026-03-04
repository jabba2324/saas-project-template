import Link from "next/link";
import { LoginForm } from "@/components/auth/login-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";

export const metadata = { title: "Sign in — SaaS Template" };

export default function LoginPage() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="text-xl font-bold tracking-tight text-slate-900">
              SaaS Template
            </Link>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
              <CardDescription>
                Welcome back — sign in to your account.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <LoginForm />
            </CardContent>
            <CardFooter className="justify-center text-sm text-muted-foreground">
              Don&apos;t have an account?&nbsp;
              <Link href="/register" className="font-medium text-foreground hover:underline">
                Sign up
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  );
}
