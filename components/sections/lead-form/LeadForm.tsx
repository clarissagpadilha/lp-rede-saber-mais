"use client";

import Link from "next/link";
import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from "react";

import { Button } from "@/components/ui";
import { formContent } from "@/content/form";
import {
  mapZodErrors,
  submitLeadRequest,
  validateLeadClient,
  type LeadSubmitInput,
} from "@/lib/leads/client";
import { formatBrazilPhone } from "@/lib/phone";
import {
  ORGANIZATION_TYPES,
  SIZE_OPTIONS,
  type LeadFields,
} from "@/lib/schemas/lead-form";
import { getClientAttribution } from "@/lib/utm";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { cn } from "@/lib/utils";

type FormState = "idle" | "submitting" | "success" | "error";

type FormValues = {
  nome: string;
  empresa: string;
  cargo: string;
  email: string;
  whatsapp: string;
  tipoOrganizacao: (typeof ORGANIZATION_TYPES)[number];
  quantidadeBeneficiarios: (typeof SIZE_OPTIONS)[number];
  consentimento: boolean;
  website: string;
};

const initialValues: FormValues = {
  nome: "",
  empresa: "",
  cargo: "",
  email: "",
  whatsapp: "",
  tipoOrganizacao: ORGANIZATION_TYPES[0],
  quantidadeBeneficiarios: SIZE_OPTIONS[0],
  consentimento: false,
  website: "",
};

const inputBaseClassName =
  "w-full rounded-[9px] border-[1.5px] bg-white px-3.5 py-3 font-sans text-base text-brand-ink transition-colors focus-visible:border-brand-blue focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-brand-offwhite disabled:text-brand-gray-soft sm:text-[15px]";

export function LeadForm() {
  const formStartedAtRef = useRef(0);
  const successRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const honeypotId = useId();

  const [values, setValues] = useState<FormValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof LeadFields, string>>>({});
  const [formState, setFormState] = useState<FormState>("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();
  const whatsappUrl = whatsappNumber ? buildWhatsAppUrl(whatsappNumber) : null;

  const isSubmitting = formState === "submitting";
  const isSuccess = formState === "success";

  useEffect(() => {
    if (isSuccess) {
      successRef.current?.focus();
    }
  }, [isSuccess]);

  const getFormStartedAt = () => {
    if (formStartedAtRef.current === 0) {
      formStartedAtRef.current = Date.now();
    }
    return formStartedAtRef.current;
  };

  const setField = <K extends keyof FormValues>(key: K, value: FormValues[K]) => {
    setValues((current) => ({ ...current, [key]: value }));
    setFieldErrors((current) => {
      if (!current[key as keyof LeadFields]) return current;
      const next = { ...current };
      delete next[key as keyof LeadFields];
      return next;
    });
  };

  const focusFirstInvalidField = (fields: Partial<Record<keyof LeadFields, string>>) => {
    const order: Array<keyof LeadFields> = [
      "nome",
      "empresa",
      "cargo",
      "email",
      "whatsapp",
      "tipoOrganizacao",
      "quantidadeBeneficiarios",
      "consentimento",
    ];

    const firstKey = order.find((key) => fields[key]);
    if (!firstKey) return;

    const element = document.getElementById(firstKey);
    element?.focus();
  };

  const buildPayload = (): LeadSubmitInput => {
    const attribution = getClientAttribution();

    return {
      nome: values.nome,
      empresa: values.empresa,
      cargo: values.cargo,
      email: values.email,
      whatsapp: values.whatsapp,
      tipoOrganizacao: values.tipoOrganizacao,
      quantidadeBeneficiarios: values.quantidadeBeneficiarios,
      consentimento: values.consentimento,
      website: values.website,
      formStartedAt: getFormStartedAt(),
      utmSource: attribution.utmSource,
      utmMedium: attribution.utmMedium,
      utmCampaign: attribution.utmCampaign,
      utmContent: attribution.utmContent,
      utmTerm: attribution.utmTerm,
      gclid: attribution.gclid,
      fbclid: attribution.fbclid,
      landingPage: attribution.landingPage,
      referrer: attribution.referrer,
    };
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (submittingRef.current || isSuccess) return;

    setStatusMessage("");
    setFormState("idle");

    const payload = buildPayload();
    const validation = validateLeadClient(payload);

    if (!validation.success) {
      const fields = mapZodErrors(validation.error.issues);
      setFieldErrors(fields);
      setFormState("error");
      setStatusMessage("Verifique os campos destacados e tente novamente.");
      statusRef.current?.focus();
      focusFirstInvalidField(fields);
      return;
    }

    submittingRef.current = true;
    setFormState("submitting");

    try {
      const response = await submitLeadRequest(validation.data);

      if (response.success) {
        setFormState("success");
        setFieldErrors({});
        setStatusMessage(formContent.successMessage);
        setValues(initialValues);
        formStartedAtRef.current = Date.now();
        return;
      }

      if (response.error === "validation" && response.fields) {
        setFieldErrors(response.fields as Partial<Record<keyof LeadFields, string>>);
        focusFirstInvalidField(response.fields as Partial<Record<keyof LeadFields, string>>);
      }

      setFormState("error");
      setStatusMessage(response.message || formContent.errorMessage);
      statusRef.current?.focus();
    } catch {
      setFormState("error");
      setStatusMessage(formContent.errorMessage);
      statusRef.current?.focus();
    } finally {
      submittingRef.current = false;
    }
  };

  if (isSuccess) {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        aria-live="polite"
        className="mt-8 rounded-[12px] border border-brand-line bg-brand-blue-mist px-5 py-6 text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
      >
        <p className="text-base font-medium text-brand-navy">{formContent.successMessage}</p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={statusRef}
        tabIndex={-1}
        aria-live="polite"
        className="sr-only"
      >
        {statusMessage}
      </div>

      {formState === "error" && statusMessage ? (
        <div
          role="alert"
          className="mt-8 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          <p>{statusMessage}</p>
          {whatsappUrl ? (
            <p className="mt-2">
              {formContent.whatsappAltPrefix}{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold underline underline-offset-2"
              >
                Abrir WhatsApp
              </a>
            </p>
          ) : null}
        </div>
      ) : null}

      <form className="mt-8" onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2">
          <FormField
            id="nome"
            label="Nome"
            required
            error={fieldErrors.nome}
            className=""
          >
            <input
              id="nome"
              name="nome"
              type="text"
              required
              autoComplete="name"
              maxLength={100}
              disabled={isSubmitting}
              value={values.nome}
              onChange={(event) => setField("nome", event.target.value)}
              placeholder="Seu nome completo"
              aria-invalid={Boolean(fieldErrors.nome)}
              aria-describedby={fieldErrors.nome ? "nome-error" : undefined}
              className={cn(inputBaseClassName, fieldErrors.nome && errorBorderClassName)}
            />
          </FormField>

          <FormField
            id="empresa"
            label="Empresa ou instituição"
            required
            error={fieldErrors.empresa}
          >
            <input
              id="empresa"
              name="empresa"
              type="text"
              required
              autoComplete="organization"
              maxLength={150}
              disabled={isSubmitting}
              value={values.empresa}
              onChange={(event) => setField("empresa", event.target.value)}
              placeholder="Nome da organização"
              aria-invalid={Boolean(fieldErrors.empresa)}
              aria-describedby={fieldErrors.empresa ? "empresa-error" : undefined}
              className={cn(inputBaseClassName, fieldErrors.empresa && errorBorderClassName)}
            />
          </FormField>

          <FormField id="cargo" label="Cargo" error={fieldErrors.cargo}>
            <input
              id="cargo"
              name="cargo"
              type="text"
              autoComplete="organization-title"
              maxLength={100}
              disabled={isSubmitting}
              value={values.cargo}
              onChange={(event) => setField("cargo", event.target.value)}
              placeholder="Seu cargo"
              aria-invalid={Boolean(fieldErrors.cargo)}
              aria-describedby={fieldErrors.cargo ? "cargo-error" : undefined}
              className={cn(inputBaseClassName, fieldErrors.cargo && errorBorderClassName)}
            />
          </FormField>

          <FormField id="email" label="E-mail profissional" required error={fieldErrors.email}>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              maxLength={150}
              disabled={isSubmitting}
              value={values.email}
              onChange={(event) => setField("email", event.target.value)}
              placeholder="voce@empresa.com"
              aria-invalid={Boolean(fieldErrors.email)}
              aria-describedby={fieldErrors.email ? "email-error" : undefined}
              className={cn(inputBaseClassName, fieldErrors.email && errorBorderClassName)}
            />
          </FormField>

          <FormField id="whatsapp" label="WhatsApp" required error={fieldErrors.whatsapp}>
            <input
              id="whatsapp"
              name="whatsapp"
              type="tel"
              required
              autoComplete="tel"
              inputMode="numeric"
              disabled={isSubmitting}
              value={values.whatsapp}
              onChange={(event) => setField("whatsapp", formatBrazilPhone(event.target.value))}
              placeholder="(00) 00000-0000"
              aria-invalid={Boolean(fieldErrors.whatsapp)}
              aria-describedby={fieldErrors.whatsapp ? "whatsapp-error" : undefined}
              className={cn(inputBaseClassName, fieldErrors.whatsapp && errorBorderClassName)}
            />
          </FormField>

          <FormField
            id="tipoOrganizacao"
            label="Tipo de organização"
            required
            error={fieldErrors.tipoOrganizacao}
          >
            <select
              id="tipoOrganizacao"
              name="tipoOrganizacao"
              required
              disabled={isSubmitting}
              value={values.tipoOrganizacao}
              onChange={(event) =>
                setField(
                  "tipoOrganizacao",
                  event.target.value as FormValues["tipoOrganizacao"],
                )
              }
              aria-invalid={Boolean(fieldErrors.tipoOrganizacao)}
              aria-describedby={
                fieldErrors.tipoOrganizacao ? "tipoOrganizacao-error" : undefined
              }
              className={cn(
                inputBaseClassName,
                fieldErrors.tipoOrganizacao && errorBorderClassName,
              )}
            >
              {ORGANIZATION_TYPES.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>

          <FormField
            id="quantidadeBeneficiarios"
            label="Quantidade aproximada de pessoas que poderiam ser beneficiadas"
            required
            error={fieldErrors.quantidadeBeneficiarios}
            className="md:col-span-2"
          >
            <select
              id="quantidadeBeneficiarios"
              name="quantidadeBeneficiarios"
              required
              disabled={isSubmitting}
              value={values.quantidadeBeneficiarios}
              onChange={(event) =>
                setField(
                  "quantidadeBeneficiarios",
                  event.target.value as FormValues["quantidadeBeneficiarios"],
                )
              }
              aria-invalid={Boolean(fieldErrors.quantidadeBeneficiarios)}
              aria-describedby={
                fieldErrors.quantidadeBeneficiarios
                  ? "quantidadeBeneficiarios-error"
                  : undefined
              }
              className={cn(
                inputBaseClassName,
                fieldErrors.quantidadeBeneficiarios && errorBorderClassName,
              )}
            >
              {SIZE_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </FormField>
        </div>

        <div className="absolute left-[-9999px]" aria-hidden="true">
          <label htmlFor={honeypotId}>Website</label>
          <input
            id={honeypotId}
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) => setField("website", event.target.value)}
          />
        </div>

        <div className="mt-2 flex items-start gap-3">
          <input
            id="consentimento"
            name="consentimento"
            type="checkbox"
            required
            disabled={isSubmitting}
            checked={values.consentimento}
            onChange={(event) => setField("consentimento", event.target.checked)}
            aria-invalid={Boolean(fieldErrors.consentimento)}
            aria-describedby={
              fieldErrors.consentimento ? "consentimento-error" : undefined
            }
            className="mt-0.5 size-5 shrink-0 accent-brand-orange disabled:cursor-not-allowed"
          />
          <label htmlFor="consentimento" className="text-[13px] leading-relaxed text-brand-gray sm:text-[13.5px]">
            Ao enviar este formulário, você concorda que a Rede Saber Mais utilize os dados informados
            para retornar seu contato e apresentar informações sobre o Plano de Educação, conforme a{" "}
            <Link
              href={formContent.privacyHref}
              className="font-semibold text-brand-blue underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Política de Privacidade
            </Link>
            .
          </label>
        </div>
        {fieldErrors.consentimento ? (
          <p id="consentimento-error" role="alert" className="mt-2 text-sm text-red-700">
            {fieldErrors.consentimento}
          </p>
        ) : null}

        <Button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="mt-6 min-h-11 w-full justify-center px-4 py-[15px] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? formContent.submittingLabel : formContent.submitLabel}
        </Button>

        {whatsappUrl ? (
          <p className="mt-4 text-center text-[13.5px] text-brand-gray">
            {formContent.whatsappAltPrefix}{" "}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-blue underline-offset-2 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-blue"
            >
              Abrir WhatsApp
            </a>
          </p>
        ) : null}
      </form>
    </>
  );
}

const errorBorderClassName = "border-red-400";

function FormField({
  children,
  className,
  error,
  id,
  label,
  required,
}: {
  children: ReactNode;
  className?: string;
  error?: string;
  id: string;
  label: string;
  required?: boolean;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-[13px] font-semibold text-brand-navy">
        {label}
        {required ? <span className="sr-only"> (obrigatório)</span> : null}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}
