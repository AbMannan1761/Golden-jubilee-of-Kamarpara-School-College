import React from "react";
import RegistrationForm from "@/components/RegistrationForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "অনলাইন রেজিস্ট্রেশন | সুবর্ণ জয়ন্তী ও পুনর্মিলনী",
  description: "সুবর্ণ জয়ন্তী ও প্রাক্তন শিক্ষার্থী পুনর্মিলনী অনলাইন রেজিস্ট্রেশন ফরম।",
};

export default function RegisterPage() {
  return (
    <div className="py-8 bg-slate-50 min-h-[85vh]">
      <div className="max-w-4xl mx-auto px-4 mb-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-red-700 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>মূল পাতায় ফিরে যান</span>
        </Link>
      </div>
      <RegistrationForm />
    </div>
  );
}
