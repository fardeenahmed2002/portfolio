import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const form = await req.formData();
  const file = form.get("file");
  if (!file || typeof file === "string") {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const bytes = await (file as Blob).arrayBuffer();
  const buffer = Buffer.from(bytes);

  try {
    const result: { secure_url: string } = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "portfolio", resource_type: "auto" }, (error, res) => {
          if (error || !res) return reject(error);
          resolve({ secure_url: res.secure_url });
        })
        .end(buffer);
    });

    return NextResponse.json({ url: result.secure_url });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
