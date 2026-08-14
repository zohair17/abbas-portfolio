import { Geist, Geist_Mono, Anton } from "next/font/google";
import "./globals.css";
import AuroraBackground from "./components/AuroraBackground";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Display face for the hero name — single weight, so no synthetic bolding.
const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abbas — Full Stack Developer",
  description:
    "Full Stack Developer crafting immersive digital experiences across frontend and backend.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${anton.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-[#0a0a0a] text-white">
        <AuroraBackground />
        {children}
      </body>
    </html>
  );
}
