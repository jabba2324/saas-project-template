import Link from "next/link";
import { RegisterForm } from "@/components/auth/register-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";

export const metadata = { title: "Create account — SaaS Template" };

export default function RegisterPage() {
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
              <CardTitle>Create an account</CardTitle>
              <CardDescription>
                Enter your details below to get started.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RegisterForm />
            </CardContent>
            <CardFooter className="justify-center text-sm text-muted-foreground">
              Already have an account?&nbsp;
              <Link href="/login" className="font-medium text-foreground hover:underline">
                Sign in
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Toaster />
    </>
  );
}
