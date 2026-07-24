import { NextResponse } from "next/server";

import {
  mapZodErrors,
  type LeadApiErrorResponse,
  type LeadApiSuccessResponse,
} from "@/lib/leads/client";
import {
  MAX_PAYLOAD_BYTES,
  MIN_SUBMIT_MS,
  buildWebhookPayload,
  forwardLeadToWebhook,
} from "@/lib/leads/server";
import { getClientIp, isRateLimited } from "@/lib/rate-limit";
import { leadSubmitSchema } from "@/lib/schemas/lead-form";

function errorResponse(
  status: number,
  body: LeadApiErrorResponse,
): NextResponse<LeadApiErrorResponse> {
  return NextResponse.json(body, { status });
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) {
    return errorResponse(415, {
      success: false,
      error: "invalid_request",
      message: "Requisição inválida.",
    });
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_PAYLOAD_BYTES) {
    return errorResponse(413, {
      success: false,
      error: "spam",
      message: "Não foi possível processar sua solicitação.",
    });
  }

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return errorResponse(400, {
      success: false,
      error: "invalid_request",
      message: "Requisição inválida.",
    });
  }

  if (
    json &&
    typeof json === "object" &&
    "website" in json &&
    typeof (json as { website?: unknown }).website === "string" &&
    (json as { website: string }).website.trim().length > 0
  ) {
    return errorResponse(400, {
      success: false,
      error: "spam",
      message: "Não foi possível processar sua solicitação.",
    });
  }

  const parsed = leadSubmitSchema.safeParse(json);
  if (!parsed.success) {
    return errorResponse(400, {
      success: false,
      error: "validation",
      message: "Verifique os campos destacados e tente novamente.",
      fields: mapZodErrors(parsed.error.issues),
    });
  }

  const data = parsed.data;

  if (data.website.trim().length > 0) {
    return errorResponse(400, {
      success: false,
      error: "spam",
      message: "Não foi possível processar sua solicitação.",
    });
  }

  const elapsed = Date.now() - data.formStartedAt;
  if (elapsed < MIN_SUBMIT_MS) {
    return errorResponse(429, {
      success: false,
      error: "spam",
      message: "Não foi possível processar sua solicitação.",
    });
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp)) {
    return errorResponse(429, {
      success: false,
      error: "spam",
      message: "Não foi possível processar sua solicitação.",
    });
  }

  const webhookUrl = process.env.LEAD_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[leads] LEAD_WEBHOOK_URL is not configured.");
    }

    return errorResponse(503, {
      success: false,
      error: "configuration",
      message: "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.",
    });
  }

  const submittedAt = new Date().toISOString();
  const landingPage =
    data.landingPage?.trim() ||
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    request.headers.get("origin") ||
    "";

  const payload = buildWebhookPayload(
    data,
    landingPage,
    data.referrer,
    submittedAt,
  );

  try {
    const delivered = await forwardLeadToWebhook(payload, webhookUrl);

    if (!delivered) {
      return errorResponse(502, {
        success: false,
        error: "integration",
        message:
          "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.",
      });
    }
  } catch {
    return errorResponse(502, {
      success: false,
      error: "integration",
      message:
        "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.",
    });
  }

  return NextResponse.json<LeadApiSuccessResponse>({ success: true });
}
