import type { Metadata } from "next";
import { Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "সুবর্ণ জয়ন্তী ও প্রাক্তন শিক্ষার্থী পুনর্মিলনী | Golden Jubilee & Alumni Reunion",
  description: "বিদ্যালয়ের সুবর্ণ জয়ন্তী ও ৫০ বছর পূর্তি উপলক্ষে গৌরবোজ্জ্বল পুনর্মিলনী উৎসব ও অনলাইন রেজিস্ট্রেশন পোর্টাল।",
  keywords: ["Golden Jubilee", "Alumni Reunion", "সুবর্ণ জয়ন্তী", "রি-ইউনিয়ন", "বিদ্যালয় পুনর্মিলনী", "রেজিস্ট্রেশন"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" className={`${hindSiliguri.variable} ${inter.variable}`}>
      <body className="min-h-screen flex flex-col antialiased selection:bg-amber-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
