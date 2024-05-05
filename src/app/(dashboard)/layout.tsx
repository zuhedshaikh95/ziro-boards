import { Navbar } from "@/components/global";
import { OrganizationSidebar, Sidebar } from "@/components/sidebar";
import React from "react";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-screen">
      <Sidebar />

      <section className="ml-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrganizationSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </section>
    </main>
  );
}
