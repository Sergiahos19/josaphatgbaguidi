import { profile } from "@/data/profile";

export type RequestKind = "Contact général" | "Demande de devis" | "Demande de formation";

export function buildWhatsAppMessage(
  kind: RequestKind,
  fields: Record<string, string>,
) {
  const labels: Record<string, string> = {
    name: "Nom",
    email: "E-mail",
    subject: "Sujet",
    message: "Message",
    phone: "Téléphone",
    service: "Service souhaité",
    details: "Besoin",
    budget: "Budget indicatif",
    deadline: "Délai souhaité",
    training: "Formation souhaitée",
    level: "Niveau actuel",
    objective: "Objectif pédagogique",
    availability: "Disponibilités",
  };

  const details = Object.entries(fields)
    .filter(([, value]) => value.trim().length > 0)
    .map(([key, value]) => `${labels[key] ?? key}: ${value.trim()}`)
    .join("\n");

  return `Bonjour ${profile.name},\n\n${kind}\n\n${details}\n\nMessage préparé depuis votre portfolio.`;
}

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${profile.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
