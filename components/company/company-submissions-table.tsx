"use client";

import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import masterData from "@/lib/data/master-data.json";

interface CompanySubmissionsTableProps {
  companyId: number;
  onViewReport?: (submission: CategorizedSubmission) => void;
}

type SubmissionCategory = "performance" | "procurement" | "local-content" | "other";

export interface CategorizedSubmission {
  id: number;
  reportType: string;
  dateSubmitted: string;
  status: string;
  category: SubmissionCategory;
  frequency: "annual" | "quarterly";
}

export function CompanySubmissionsTable({ companyId, onViewReport }: CompanySubmissionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Categorize submissions
  const categorizeSubmission = (reportType: string): { category: SubmissionCategory; frequency: "annual" | "quarterly" } => {
    const lowerType = reportType.toLowerCase();

    let category: SubmissionCategory = "other";
    if (lowerType.includes("local content")) category = "local-content";
    else if (lowerType.includes("procurement")) category = "procurement";
    else if (lowerType.includes("performance") || lowerType.includes("production") || lowerType.includes("financial")) category = "performance";

    const frequency = lowerType.includes("q1") || lowerType.includes("q2") || lowerType.includes("q3") || lowerType.includes("q4") ? "quarterly" : "annual";

    return { category, frequency };
  };

  // Get and categorize submissions for this company
  const companySubmissions: CategorizedSubmission[] = masterData.submissions
    .filter((s) => s.companyId === companyId)
    .map((s) => ({
      ...s,
      ...categorizeSubmission(s.reportType)
    }));

  // Extract unique years
  const years = Array.from(
    new Set(
      companySubmissions.map((s) => new Date(s.dateSubmitted).getFullYear().toString())
    )
  ).sort((a, b) => parseInt(b) - parseInt(a));

  // Filter submissions
  const filteredSubmissions = useMemo(() => {
    return companySubmissions.filter((submission) => {
      const matchesSearch =
        submission.reportType.toLowerCase().includes(searchQuery.toLowerCase()) ||
        submission.status.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        categoryFilter === "all" || submission.category === categoryFilter;

      const matchesYear =
        yearFilter === "all" ||
        new Date(submission.dateSubmitted).getFullYear().toString() === yearFilter;

      const matchesStatus =
        statusFilter === "all" || submission.status === statusFilter;

      return matchesSearch && matchesCategory && matchesYear && matchesStatus;
    });
  }, [companySubmissions, searchQuery, categoryFilter, yearFilter, statusFilter]);

  // Sort filtered submissions by date (most recent first)
  const sortedSubmissions = useMemo(() => {
    return [...filteredSubmissions].sort(
      (a, b) => new Date(b.dateSubmitted).getTime() - new Date(a.dateSubmitted).getTime()
    );
  }, [filteredSubmissions]);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      approved: "default",
      pending: "secondary",
      declined: "destructive",
    };

    return (
      <Badge variant={variants[status] || "outline"} className="capitalize">
        {status}
      </Badge>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submissions</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search submissions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Category</SelectItem>
              <SelectItem value="performance">Performance</SelectItem>
              <SelectItem value="procurement">Procurement</SelectItem>
              <SelectItem value="local-content">Local Content</SelectItem>
            </SelectContent>
          </Select>
          <Select value={yearFilter} onValueChange={setYearFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Year</SelectItem>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Status</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="declined">Declined</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Single Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground w-16">#</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Report</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Date Submitted</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-muted-foreground">
                    No submissions found
                  </td>
                </tr>
              ) : (
                sortedSubmissions.map((submission, index) => {
                  const isLocalContentPlan = submission.category === "local-content";
                  return (
                    <tr
                      key={submission.id}
                      className={`border-b hover:bg-muted/50 ${isLocalContentPlan && onViewReport ? 'cursor-pointer' : ''}`}
                      onClick={() => isLocalContentPlan && onViewReport?.(submission)}
                    >
                      <td className="py-3 px-4 text-sm">{index + 1}.</td>
                      <td className={`py-3 px-4 text-sm ${isLocalContentPlan && onViewReport ? 'text-primary hover:underline font-medium' : ''}`}>
                        {submission.reportType}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {new Date(submission.dateSubmitted).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric"
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        {getStatusBadge(submission.status)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Results count */}
        {sortedSubmissions.length > 0 && (
          <div className="mt-4 text-sm text-muted-foreground">
            Showing {sortedSubmissions.length} of {companySubmissions.length} submissions
          </div>
        )}
      </CardContent>
    </Card>
  );
}
