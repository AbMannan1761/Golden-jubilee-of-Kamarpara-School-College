"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Sparkles, 
  Award, 
  UserPlus, 
  IdCard, 
  ShieldCheck, 
  Users, 
  Bell
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "মূল পাতা", icon: Sparkles },
    { href: "/#coordinators", label: "ব্যাচ সমন্বয়ক", icon: Users },
    { href: "/#notices", label: "নোটিশ বোর্ড", icon: Bell },
    { href: "/register", label: "রেজিস্ট্রেশন", icon: UserPlus, highlight: true },
    { href: "/badge", label: "ই-ব্যাজ / স্লিপ", icon: IdCard },
    { href: "/admin", label: "অ্যাডমিন", icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-amber-200/80 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Branding */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <img src="/school-logo.jpg" alt="Kamarpara School & College" className="w-10 h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform border-2 border-amber-400" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base sm:text-lg font-black text-slate-900 group-hover:text-red-700 transition-colors">
                    Kamarpara School & College
                  </span>
                  <span className="inline-block text-[10px] font-semibold bg-amber-100 text-amber-800 px-1.5 py-0.2 rounded-full border border-amber-300">
                    ৫০ বছর
                  </span>
                </div>
                <p className="text-[11px] font-bold text-red-700 -mt-0.5">
                  সুবর্ণ জয়ন্তী ও প্রাক্তন শিক্ষার্থী পুনর্মিলনী
                </p>
              </div>
            </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              if (link.highlight) {
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-black text-white bg-gradient-to-r from-red-600 via-amber-600 to-amber-500 shadow-md shadow-amber-500/25 hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
                    </span>
                  </Link>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold transition-colors ${
                    isActive
                      ? "text-red-700 bg-red-50 font-black"
                      : "text-slate-800 hover:text-red-700 hover:bg-slate-100"
                  }`}
                >
                  <Icon className="w-4 h-4 text-slate-500 group-hover:text-red-600" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-600 hover:text-red-700 hover:bg-amber-50 focus:outline-none transition"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-amber-100 bg-white/95 backdrop-blur-md px-4 pt-2 pb-6 space-y-2 animate-fadeIn">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            if (link.highlight) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 shadow-md shadow-red-500/20"
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-base font-medium transition ${
                  isActive
                    ? "text-red-700 bg-red-50 font-bold"
                    : "text-slate-700 hover:bg-slate-100 hover:text-red-700"
                }`}
              >
                <Icon className="w-5 h-5 text-amber-600" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}
