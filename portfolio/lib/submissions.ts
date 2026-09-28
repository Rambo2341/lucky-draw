import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { ContactInput } from "@/lib/contact";

/**
 * Where contact requests are kept, for the admin panel.
 *
 * Production: Upstash Redis over its REST API (no SDK). Connect "Upstash for Redis"
 * from the Vercel Marketplace and Vercel adds KV_REST_API_URL / KV_REST_API_TOKEN
 * (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN also work).
 *
 * Development: without those variables, requests are written to
 * .data/submissions.json so the whole flow can be tried locally.
 */

import type { Submission } from "@/lib/submission-types";
export { statuses, type Submission, type SubmissionStatus } from "@/lib/submission-types";

type Store = {
  list(): Promise<Submission[]>;
  create(s: Submission): Promise<void>;
  update(id: string, patch: Partial<Pick<Submission, "status">>): Promise<Submission | null>;
  remove(id: string): Promise<void>;
};

const HASH = "zenox:submissions";
const INDEX = "zenox:submissions:index";

function redisEnv() {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

function redisStore(url: string, token: string): Store {
  async function pipeline(commands: (string | number)[][]): Promise<unknown[]> {
    const res = await fetch(`${url}/pipeline`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(commands),
      cache: "no-store",
    });
    if (!res.ok) throw new Error(`Redis request failed (${res.status})`);
    const out = (await res.json()) as { result?: unknown; error?: string }[];
    const failed = out.find((r) => r.error);
    if (failed) throw new Error(`Redis error: ${failed.error}`);
    return out.map((r) => r.result);
  }
  const parse = (v: unknown) => (typeof v === "string" ? (JSON.parse(v) as Submission) : null);

  return {
    async list() {
      const [ids] = (await pipeline([["ZREVRANGE", INDEX, 0, 999]])) as [string[]];
      if (!ids?.length) return [];
      const [rows] = (await pipeline([["HMGET", HASH, ...ids]])) as [unknown[]];
      return rows.map(parse).filter((s): s is Submission => Boolean(s));
    },
    async create(s) {
      await pipeline([
        ["HSET", HASH, s.id, JSON.stringify(s)],
        ["ZADD", INDEX, Date.parse(s.createdAt), s.id],
      ]);
    },
    async update(id, patch) {
      const [raw] = await pipeline([["HGET", HASH, id]]);
      const current = parse(raw);
      if (!current) return null;
      const next = { ...current, ...patch };
      await pipeline([["HSET", HASH, id, JSON.stringify(next)]]);
      return next;
    },
    async remove(id) {
      await pipeline([
        ["HDEL", HASH, id],
        ["ZREM", INDEX, id],
      ]);
    },
  };
}

function fileStore(): Store {
  const file = path.join(process.cwd(), ".data", "submissions.json");
  async function read(): Promise<Submission[]> {
    try {
      return JSON.parse(await readFile(file, "utf8")) as Submission[];
    } catch {
      return [];
    }
  }
  async function write(all: Submission[]) {
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(all, null, 2));
  }
  return {
    async list() {
      return (await read()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    },
    async create(s) {
      await write([s, ...(await read())]);
    },
    async update(id, patch) {
      const all = await read();
      const i = all.findIndex((s) => s.id === id);
      if (i < 0) return null;
      all[i] = { ...all[i], ...patch };
      await write(all);
      return all[i];
    },
    async remove(id) {
      await write((await read()).filter((s) => s.id !== id));
    },
  };
}

/** Null when nothing is configured (production without Redis). */
export function getStore(): Store | null {
  const r = redisEnv();
  if (r) return redisStore(r.url, r.token);
  // Serverless file systems are read-only or ephemeral, so the file store is development-only.
  if (process.env.NODE_ENV !== "production" || process.env.ZENOX_FILE_STORE === "1") return fileStore();
  return null;
}

export function newSubmission(input: ContactInput, locale: "en" | "ar"): Submission {
  return {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    locale,
    status: "new",
    name: input.name.trim(),
    email: input.email.trim(),
    phone: input.phone.trim(),
    projectType: input.projectType,
    budget: input.budget,
    message: input.message.trim(),
  };
}
