import { auth } from "@/lib/auth";

export const runtime = "nodejs";

export const GET = (request: Request) =>
  auth.handler(request);

export const POST = (request: Request) =>
  auth.handler(request);