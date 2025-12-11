"use client";

import { AdminHeader } from "@/components/layout/admin-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  Calendar,
  Building2,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import masterData from "@/lib/data/master-data.json";

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [companyFilter, setCompanyFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { submissions: reports } = masterData;

  // Calculate statistics
  const totalReports = reports.length;
  const approvedReports = reports.filter((r) => r.status === "approved").length;
  const pendingReports = reports.filter((r) => r.status === "pending").length;
  const declinedReports = reports.filter((r) => r.status === "declined").length;

  // Filtering logic
  const filteredReports = reports.filter((report) => {
    const matchesSearch =
      report.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportType.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCompany = companyFilter === "all" || report.companyName === companyFilter;
    const matchesStatus = statusFilter === "all" || report.status === statusFilter;
    const matchesType = typeFilter === "all" || report.reportType.includes(typeFilter);
    return matchesSearch && matchesCompany && matchesStatus && matchesType;
  });

  // Pagination
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentReports = filteredReports.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "pending":
        return <Badge variant="warning">Pending</Badge>;
      case "declined":
        return <Badge variant="destructive">Declined</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const uniqueCompanies = Array.from(new Set(reports.map((r) => r.companyName)));

  return (
    <div>
      <AdminHeader title="Reports & Submissions" />

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+12%</span>
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{totalReports}</p>
              <p className="text-sm text-muted-foreground">Total Reports</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 text-green-600">{approvedReports}</p>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-yellow-100">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 text-yellow-600">{pendingReports}</p>
              <p className="text-sm text-muted-foreground">Pending Review</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-red-100">
                  <XCircle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 text-red-600">{declinedReports}</p>
              <p className="text-sm text-muted-foreground">Declined</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs for different views */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">
                All Reports
                <span className="ml-2 px-2 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {totalReports}
                </span>
              </TabsTrigger>
              <TabsTrigger value="pending">
                Pending
                {pendingReports > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-yellow-500 text-white rounded-full">
                    {pendingReports}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="declined">Declined</TabsTrigger>
            </TabsList>

            {/* All Reports Tab */}
            <TabsContent value="all" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>All Reports & Submissions</CardTitle>
                      <CardDescription>View and manage all company reports and submissions</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search reports..."
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
                          <div>
                            <label className="text-sm font-medium mb-2 block">Company</label>
                            <Select value={companyFilter} onValueChange={setCompanyFilter}>
                              <SelectTrigger className="h-9">
                                <SelectValue placeholder="All Companies" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Companies</SelectItem>
                                {uniqueCompanies.map((company) => (
                                  <SelectItem key={company} value={company}>
                                    {company}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Status</label>
                            <Select value={statusFilter} onValueChange={setStatusFilter}>
                              <SelectTrigger className="h-9">
                                <SelectValue placeholder="All Status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="approved">Approved</SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="declined">Declined</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Results per page</label>
                            <Select
                              value={itemsPerPage.toString()}
                              onValueChange={(value) => {
                                setItemsPerPage(Number(value));
                                setCurrentPage(1);
                              }}
                            >
                              <SelectTrigger className="h-9">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="25">25</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                                <SelectItem value="100">100</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Reports Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Report Type</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentReports.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                              No reports found
                            </TableCell>
                          </TableRow>
                        ) : (
                          currentReports.map((report, index) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-muted-foreground" />
                                  <Link
                                    href={`/admin/companies/${report.companyId}`}
                                    className="font-medium hover:underline"
                                  >
                                    {report.companyName}
                                  </Link>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  {report.reportType}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  {new Date(report.dateSubmitted).toLocaleDateString()}
                                </div>
                              </TableCell>
                              <TableCell>{getStatusBadge(report.status)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  {report.status === "pending" && (
                                    <>
                                      <Button variant="outline" size="sm" className="h-8 text-green-600 hover:bg-green-50">
                                        Approve
                                      </Button>
                                      <Button variant="outline" size="sm" className="h-8 text-red-600 hover:bg-red-50">
                                        Decline
                                      </Button>
                                    </>
                                  )}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredReports.length)} of{" "}
                        {filteredReports.length} reports
                      </p>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          Previous
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
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
            </TabsContent>

            {/* Pending Tab */}
            <TabsContent value="pending">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Reports</CardTitle>
                  <CardDescription>Reports awaiting review and approval</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Report Type</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports
                          .filter((r) => r.status === "pending")
                          .map((report, index) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>
                                <Link
                                  href={`/admin/companies/${report.companyId}`}
                                  className="font-medium hover:underline"
                                >
                                  {report.companyName}
                                </Link>
                              </TableCell>
                              <TableCell>{report.reportType}</TableCell>
                              <TableCell>
                                {new Date(report.dateSubmitted).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="outline" size="sm" className="h-8">
                                    <Eye className="h-3 w-3 mr-1" />
                                    Review
                                  </Button>
                                  <Button size="sm" className="h-8 bg-green-600 hover:bg-green-700">
                                    Approve
                                  </Button>
                                  <Button variant="destructive" size="sm" className="h-8">
                                    Decline
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Approved Tab */}
            <TabsContent value="approved">
              <Card>
                <CardHeader>
                  <CardTitle>Approved Reports</CardTitle>
                  <CardDescription>Successfully approved reports</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Report Type</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports
                          .filter((r) => r.status === "approved")
                          .map((report, index) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>
                                <Link
                                  href={`/admin/companies/${report.companyId}`}
                                  className="font-medium hover:underline"
                                >
                                  {report.companyName}
                                </Link>
                              </TableCell>
                              <TableCell>{report.reportType}</TableCell>
                              <TableCell>
                                {new Date(report.dateSubmitted).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Download className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Declined Tab */}
            <TabsContent value="declined">
              <Card>
                <CardHeader>
                  <CardTitle>Declined Reports</CardTitle>
                  <CardDescription>Reports that were declined</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Report Type</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {reports
                          .filter((r) => r.status === "declined")
                          .map((report, index) => (
                            <TableRow key={report.id}>
                              <TableCell className="font-medium">{index + 1}</TableCell>
                              <TableCell>
                                <Link
                                  href={`/admin/companies/${report.companyId}`}
                                  className="font-medium hover:underline"
                                >
                                  {report.companyName}
                                </Link>
                              </TableCell>
                              <TableCell>{report.reportType}</TableCell>
                              <TableCell>
                                {new Date(report.dateSubmitted).toLocaleDateString()}
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="outline" size="sm" className="h-8">
                                    Request Revision
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
