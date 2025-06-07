import { Poppins, Open_Sans } from "next/font/google";
import { GLOBAL_METADATA } from "@/utils/helper/seo";
import { BASE_URL_FRONTEND } from "@/utils/endpoints";
import Nav from "@/components/Nav";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
});

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});


export async function generateMetadata() {
  const image = 'https://flywate.vercel.app/tabLogo.png';

  return {
    ...GLOBAL_METADATA, // Spread global defaults first
    title: "Flywate",
    description: "Flywate Nylon Shuttle",
    keywords: "Flywate, Flywate Nylon Shuttle, ",
    metadataBase: new URL(BASE_URL_FRONTEND),
    alternates: {
      canonical: (BASE_URL_FRONTEND)
    },
    openGraph: {
      ...GLOBAL_METADATA, // Spread OG defaults if any
      title: "Flywate",
      description: "Flywate Nylon Shuttle",
      type: "website",
      url: (BASE_URL_FRONTEND),
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: "Flywate",
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: "Flywate",
      description: "Flywate Nylon Shuttle",
      images: [image]
    }
  };
}


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${openSans.variable} antialiased`}>
        <Nav />
        {children}
      </body>
    </html>
  );
}
