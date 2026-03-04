import { NextRequest, NextResponse } from "next/server";
import { put, get } from "@vercel/blob";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);
const MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

// Serve the current user's avatar from private blob storage
export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const [user] = await db
    .select({ image: users.image })
    .from(users)
    .where(eq(users.id, session.user.id))
    .limit(1);

  if (!user?.image) {
    return new NextResponse("Not found", { status: 404 });
  }

  const result = await get(user.image, { access: "private" });

  if (!result?.stream) {
    return new NextResponse("Not found", { status: 404 });
  }

  // Clamp Content-Type to our allowlist — never trust client-supplied or
  // blob-stored values directly, to prevent stored XSS via text/html.
  const blobType = result.headers.get("Content-Type") ?? "";
  const safeContentType = ALLOWED_TYPES.has(blobType)
    ? blobType
    : "application/octet-stream";

  return new NextResponse(result.stream, {
    headers: {
      "Content-Type": safeContentType,
      "Content-Disposition": "inline",
      "X-Content-Type-Options": "nosniff",
      "Cache-Control": "private, max-age=3600",
    },
  });
}

// Upload a new avatar to private blob storage
export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json(
      { error: "File type not allowed. Use JPEG, PNG, WebP, or GIF." },
      { status: 400 }
    );
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json(
      { error: "File too large. Max size is 5 MB." },
      { status: 400 }
    );
  }

  const extension = file.type.split("/")[1];
  const pathname = `avatars/${session.user.id}.${extension}`;

  const blob = await put(pathname, file, {
    access: "private",
    addRandomSuffix: false,
  });

  await db
    .update(users)
    .set({ image: blob.url })
    .where(eq(users.id, session.user.id));

  return NextResponse.json({ success: true });
}
