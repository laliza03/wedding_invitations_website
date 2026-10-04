import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ensemble pour célébrer Liza et Zakaria | Notre mariage",
  description: "Célébrez notre mariage à Laval. Réponse à l’invitation, renseignements sur la célébration et préparation du voyage.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr-CA">
      <body className="antialiased">{children}</body>
    </html>
  );
}
