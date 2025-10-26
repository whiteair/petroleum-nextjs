"use client";

import { Building2, FileText, CheckCircle } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { PermitsCard } from "@/components/dashboard/permits-card";
import { SubmissionsTable } from "@/components/dashboard/submissions-table";
import { NewsCard } from "@/components/dashboard/news-card";
import { AdminHeader } from "@/components/layout/admin-header";
import masterData from "@/lib/data/master-data.json";
import { Submission, NewsItem } from "@/types";

export default function AdminDashboard() {
  const { statistics, submissions, news } = masterData;
  const typedSubmissions = submissions as Submission[];
  const typedNews = news as NewsItem[];

  return (
    <>
      <AdminHeader title="Dashboard" />
      <div className="p-6">

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Companies"
          value={statistics.totalCompanies}
          icon={Building2}
          delay={0}
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Submitted Reports"
          value={statistics.submittedReports}
          icon={FileText}
          delay={0.1}
          trend={{ value: 20, isPositive: true }}
        />
        <StatCard
          title="Approved Reports"
          value={statistics.approvedReports}
          icon={CheckCircle}
          delay={0.2}
          trend={{ value: 8, isPositive: false }}
        />
        <PermitsCard
          pending={30}
          active={100}
          expired={20}
          delay={0.3}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submissions Table (2/3 width) */}
        <div className="lg:col-span-2">
          <SubmissionsTable submissions={typedSubmissions} />
        </div>

        {/* News Sidebar (1/3 width) */}
        <div className="lg:col-span-1">
          <NewsCard news={typedNews} />
        </div>
      </div>
      </div>
    </>
  );
}
