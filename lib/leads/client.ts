import type { ZodIssue } from "zod";

import {
  type LeadSubmitInput,
  leadSubmitSchema,
} from "@/lib/schemas/lead-form";

export type LeadApiSuccessResponse = {
  success: true;
};

export type LeadApiErrorCode =
  | "validation"
  | "spam"
  | "integration"
  | "configuration"
  | "invalid_request";

export type LeadApiErrorResponse = {
  success: false;
  error: LeadApiErrorCode;
  message: string;
  fields?: Partial<Record<keyof LeadSubmitInput, string>>;
};

export type LeadApiResponse = LeadApiSuccessResponse | LeadApiErrorResponse;

export async function submitLeadRequest(payload: LeadSubmitInput): Promise<LeadApiResponse> {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  });

  let data: LeadApiResponse;

  try {
    data = (await response.json()) as LeadApiResponse;
  } catch {
    return {
      success: false,
      error: "integration",
      message: "Não foi possível enviar sua solicitação agora. Tente novamente em alguns instantes.",
    };
  }

  return data;
}

export function mapZodErrors(
  issues: ZodIssue[],
): Partial<Record<keyof LeadSubmitInput, string>> {
  const fields: Partial<Record<keyof LeadSubmitInput, string>> = {};

  for (const issue of issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !fields[key as keyof LeadSubmitInput]) {
      fields[key as keyof LeadSubmitInput] = issue.message;
    }
  }

  return fields;
}

export function validateLeadClient(payload: LeadSubmitInput) {
  return leadSubmitSchema.safeParse(payload);
}

export type { LeadSubmitInput };
