import React from "react";
import AdminDashboard from "@/components/AdminDashboard";

export const metadata = {
  title: "অ্যাডমিন ড্যাশবোর্ড | সুবর্ণ জয়ন্তী ও পুনর্মিলনী",
  description: "সুবর্ণ জয়ন্তী অ্যালামনাই রেজিস্ট্রেশন ও পেমেন্ট অডিট প্যানেল।",
};

export default function AdminPage() {
  return (
    <div className="bg-slate-100 min-h-[85vh]">
      <AdminDashboard />
    </div>
  );
}
