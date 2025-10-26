"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Submission, SubmissionStatus } from "@/types";

interface SubmissionsTableProps {
  submissions: Submission[];
}

function getStatusVariant(status: SubmissionStatus): "pending" | "approved" | "declined" {
  return status as "pending" | "approved" | "declined";
}

export function SubmissionsTable({ submissions }: SubmissionsTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [reportTypeFilter, setReportTypeFilter] = useState<string>("all");
  const [resultsPerPage, setResultsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Get unique report types from submissions
  const reportTypes = useMemo(() => {
    const types = Array.from(new Set(submissions.map((s) => s.reportType)));
    return types.sort();
  }, [submissions]);

  const filteredSubmissions = submissions.filter((submission) => {
    const matchesSearch =
      submission.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      submission.reportType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || submission.status === statusFilter;
    const matchesReportType = reportTypeFilter === "all" || submission.reportType === reportTypeFilter;
    return matchesSearch && matchesStatus && matchesReportType;
  });

  // Pagination logic
  const totalPages = resultsPerPage === -1 ? 1 : Math.ceil(filteredSubmissions.length / resultsPerPage);
  const paginatedSubmissions = resultsPerPage === -1
    ? filteredSubmissions
    : filteredSubmissions.slice((currentPage - 1) * resultsPerPage, currentPage * resultsPerPage);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, reportTypeFilter, resultsPerPage]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
    >
      <Card>
        <CardHeader className="bg-muted/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Submitted Data</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 h-9 text-sm"
                />
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9">
                    <Filter className="mr-2 h-4 w-4" />
                    Filter
                  </Button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-80">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Report Type</Label>
                      <Select value={reportTypeFilter} onValueChange={setReportTypeFilter}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="All report types" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          {reportTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Status</Label>
                      <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="h-9">
                          <SelectValue placeholder="All statuses" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="approved">Approved</SelectItem>
                          <SelectItem value="declined">Declined</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Results per page</Label>
                      <div className="flex gap-2">
                        {[10, 50, 100, -1].map((value) => (
                          <Badge
                            key={value}
                            variant={resultsPerPage === value ? "default" : "outline"}
                            className="cursor-pointer px-3 py-1"
                            onClick={() => setResultsPerPage(value)}
                          >
                            {value === -1 ? "All" : value}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="border-t">
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="w-[5%]">#</TableHead>
                  <TableHead className="w-[40%]">Company</TableHead>
                  <TableHead className="w-[30%]">Report Type</TableHead>
                  <TableHead className="w-[15%]">Submitted</TableHead>
                  <TableHead className="w-[10%]">Status</TableHead>
                </TableRow>
              </TableHeader>
            <TableBody>
              {paginatedSubmissions.map((submission, index) => (
                <TableRow
                  key={submission.id}
                  className="hover:bg-muted/50"
                >
                  <TableCell className="font-medium text-sm">
                    {(currentPage - 1) * resultsPerPage + index + 1}
                  </TableCell>
                  <TableCell className="text-sm">
                    <Link
                      href={`/admin/companies/${submission.companyId}`}
                      className="text-primary hover:underline"
                    >
                      {submission.companyName}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">
                    <Link
                      href={`/admin/reports/${submission.id}`}
                      className="text-primary hover:underline"
                    >
                      {submission.reportType}
                    </Link>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(submission.dateSubmitted).toLocaleDateString("en-GB")}
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(submission.status)} className="text-xs">
                      {submission.status.charAt(0).toUpperCase() + submission.status.slice(1)}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 px-6 pb-6">
              <div className="text-sm text-muted-foreground">
                Showing {(currentPage - 1) * resultsPerPage + 1} to{" "}
                {Math.min(currentPage * resultsPerPage, filteredSubmissions.length)} of{" "}
                {filteredSubmissions.length} results
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </Button>
                <div className="text-sm">
                  Page {currentPage} of {totalPages}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
