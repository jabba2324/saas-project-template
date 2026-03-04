import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AvatarUpload } from "@/components/profile/avatar-upload";
import { ChangePasswordForm } from "@/components/profile/change-password-form";

export const metadata = { title: "Profile — SaaS Template" };

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) redirect("/login");

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  const isCredentialUser = Boolean(user?.password);

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
        <p className="text-slate-500 mt-1">Manage your account settings.</p>
      </div>

      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle>Profile picture</CardTitle>
          <CardDescription>
            Upload a photo — stored in Vercel Blob and served from the CDN.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AvatarUpload
            hasImage={Boolean(user?.image)}
            userName={user?.name ?? user?.email ?? "User"}
          />
        </CardContent>
      </Card>

      <Separator />

      {/* Account info */}
      <Card>
        <CardHeader>
          <CardTitle>Account details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Name</span>
            <span className="font-medium">{user?.name ?? "—"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>
            <span className="font-medium">{user?.email}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Auth method</span>
            <span className="font-medium">{isCredentialUser ? "Email / password" : "OAuth"}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Member since</span>
            <span className="font-medium">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })
                : "—"}
            </span>
          </div>
        </CardContent>
      </Card>

      <Separator />

      {/* Password */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            {isCredentialUser
              ? "Change your account password."
              : "Your account uses OAuth — password management is handled by your provider."}
          </CardDescription>
        </CardHeader>
        {isCredentialUser && (
          <CardContent>
            <ChangePasswordForm />
          </CardContent>
        )}
      </Card>
    </div>
  );
}
