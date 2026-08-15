"use client";

import { useState, useRef } from "react";
import { Upload, Loader2, X, ImageIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
  label?: string;
}

export function ImageUpload({ value, onChange, label = "Image" }: ImageUploadProps) {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Upload failed");
      onChange(data.url);
      toast({ title: "Image uploaded" });
    } catch (err) {
      toast({
        title: "Upload failed",
        description: err instanceof Error ? err.message : "Please try again",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex items-center gap-3">
        <div className="relative w-16 h-16 rounded-lg border border-border bg-muted/40 overflow-hidden flex items-center justify-center shrink-0">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-muted-foreground" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFile}
            disabled={uploading}
            className="hidden"
            id="image-upload-input"
          />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploading}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-input/30 text-sm hover:border-primary/50 hover:text-primary transition-colors disabled:opacity-60"
            >
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? "Uploading..." : "Upload image"}
            </button>
            {value && (
              <button
                type="button"
                onClick={() => onChange("")}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-border text-sm text-muted-foreground hover:text-destructive transition-colors"
              >
                <X className="w-4 h-4" /> Remove
              </button>
            )}
          </div>
          <Input
            value={value ?? ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... (or upload above)"
            className="text-sm"
          />
        </div>
      </div>
    </div>
  );
}
