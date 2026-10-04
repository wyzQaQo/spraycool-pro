import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "100Cooling | Outdoor Comfort Systems",
  description: "Outdoor comfort systems for resorts, hotels & commercial venues",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
