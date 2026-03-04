"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, Loader2 } from "lucide-react";

interface AvatarUploadProps {
  hasImage: boolean;
  userName: string;
}

export function AvatarUpload({ hasImage, userName }: AvatarUploadProps) {
  const router = useRouter();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Use a cache-buster so the browser re-fetches after a new upload
  const [cacheBuster, setCacheBuster] = useState(() => Date.now());
  const [showImage, setShowImage] = useState(hasImage);
  const [isPending, startTransition] = useTransition();

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        toast({
          title: "Upload failed",
          description: body.error ?? "Could not upload image.",
          variant: "destructive",
        });
        return;
      }

      setShowImage(true);
      setCacheBuster(Date.now());
      toast({ title: "Profile picture updated!" });
      router.refresh();
    });
  }

  return (
    <div className="flex items-center gap-6">
      <div className="relative">
        <Avatar className="h-20 w-20">
          {showImage && (
            <AvatarImage
              src={`/api/profile/avatar?t=${cacheBuster}`}
              alt={userName}
            />
          )}
          <AvatarFallback className="text-xl">{initials}</AvatarFallback>
        </Avatar>
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/40">
            <Loader2 className="h-5 w-5 text-white animate-spin" />
          </div>
        )}
      </div>

      <div className="space-y-1">
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
        >
          <Upload className="h-4 w-4 mr-2" />
          {isPending ? "Uploading…" : "Upload photo"}
        </Button>
        <p className="text-xs text-muted-foreground">
          JPEG, PNG, WebP or GIF · Max 5 MB
        </p>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
