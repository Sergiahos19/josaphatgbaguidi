import type { Metadata, Viewport } from "next";
import "./globals.css";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} - Économie & Finance Internationale`,
  description:
    "Portfolio personnel de Josaphat GBAGUIDI, dont le parcours universitaire est en Économie et Finance Internationale à l'Université de Parakou.",
  applicationName: "Josaphat GBAGUIDI - Portfolio",
  openGraph: {
    title: `${profile.name} - Économie & Finance Internationale`,
    description:
      "Découvrir le parcours, les domaines d'intérêt et les ressources pédagogiques de Josaphat GBAGUIDI.",
    type: "website",
    locale: "fr_BJ",
  },
  icons: { icon: "/favicon.svg" },
};

export const viewport: Viewport = {
  themeColor: "#0b1421",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
