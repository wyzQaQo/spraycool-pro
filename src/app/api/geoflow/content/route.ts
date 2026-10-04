import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import crypto from "crypto";

const SECRET = process.env.GEOFLOW_API_SECRET || "change-me-to-a-random-string";

function verifySig(body: string, header: string | null): boolean {
  if (!header) return false;
  const hmac = crypto.createHmac("sha256", SECRET).update(body).digest("hex");
  return header === `sha256=${hmac}`;
}

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("x-hub-signature");

  if (!verifySig(body, sig)) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  let data: {
    title: string;
    slug: string;
    markdown: string;
    meta_description: string;
    keywords: string[];
    author: string;
    published_at: string;
    featured_image?: string;
    category?: string;
  };

  try {
    data = JSON.parse(body);
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  if (!data.title || !data.slug || !data.markdown) {
    return NextResponse.json({ error: "missing required fields: title, slug, markdown" }, { status: 400 });
  }

  const dir = path.join(process.cwd(), "content", "articles");
  await mkdir(dir, { recursive: true });

  const frontmatter = `---
title: "${data.title.replace(/"/g, '\\"')}"
slug: "${data.slug}"
description: "${data.meta_description?.replace(/"/g, '\\"') || ""}"
publishedAt: "${data.published_at || new Date().toISOString()}"
category: "${data.category || ""}"
keywords: [${(data.keywords || []).map((k) => `"${k.replace(/"/g, '\\"')}"`).join(", ")}]
${data.featured_image ? `featuredImage: "${data.featured_image}"` : ""}
---

${data.markdown}`;

  const filePath = path.join(dir, `${data.slug}.mdx`);

  try {
    await writeFile(filePath, frontmatter, "utf-8");
    console.log(`[GEOFlow] Saved: ${data.title} → ${filePath}`);
  } catch (err) {
    console.error(`[GEOFlow] Failed to write ${filePath}:`, err);
    return NextResponse.json({ error: "write_failed" }, { status: 500 });
  }

  return NextResponse.json({
    status: "ok",
    slug: data.slug,
    file: `content/articles/${data.slug}.mdx`,
  });
}

export async function GET() {
  return NextResponse.json({
    service: "GEOFlow Content Receiver",
    version: "1.0.0",
    status: "running",
  });
}
