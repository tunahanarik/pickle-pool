import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Pickle Pool | Free NFT Quest",
  description:
    "Complete simple quests to register for the exclusive Pickle Pool FREE NFT mint on Base chain.",
  keywords: ["NFT", "Base", "Pickle", "Mint", "ERC-721A", "Pickle Pool", "Quest"],
  openGraph: {
    title: "Pickle Pool | Free NFT Quest",
    description:
      "Complete simple quests to register for the exclusive Pickle Pool FREE NFT mint on Base chain.",
    type: "website",
    siteName: "Pickle Pool",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pickle Pool | Free NFT Quest",
    description:
      "Complete quests to register for the Pickle Pool FREE NFT mint!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        {children}
      </body>
    </html>
  );
}
