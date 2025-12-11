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
  Plus,
  Building2,
  Users,
  Shield,
  FileText,
  Mail,
  Eye,
  Edit,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import masterData from "@/lib/data/master-data.json";

export default function CompanyManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const { companies, submissions } = masterData;

  // Calculate statistics
  const totalCompanies = companies.length;
  const activeCompanies = companies.filter((c) => c.status === "active").length;
  const totalEmployees = companies.reduce((sum, c) => sum + c.totalEmployees, 0);
  const totalGhanaianEmployees = companies.reduce((sum, c) => sum + c.ghanaianEmployees, 0);
  const localContentPercentage = ((totalGhanaianEmployees / totalEmployees) * 100).toFixed(1);

  // Reports statistics
  const totalReports = submissions.length;
  const approvedReports = submissions.filter((s) => s.status === "approved").length;
  const pendingReports = submissions.filter((s) => s.status === "pending").length;
  const declinedReports = submissions.filter((s) => s.status === "declined").length;

  // Filtering logic
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.registeredName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || company.type === typeFilter;
    const matchesStatus = statusFilter === "all" || company.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredCompanies.slice(startIndex, endIndex);

  const uniqueTypes = Array.from(new Set(companies.map((c) => c.type)));

  return (
    <div>
      <AdminHeader title="Company Management" />

      <div className="p-6 space-y-6">
        {/* Overview Stats Cards */}
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
                  <Building2 className="h-6 w-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1 text-sm text-blue-600">
                  <TrendingUp className="h-4 w-4" />
                  <span>+2</span>
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{totalCompanies}</p>
              <p className="text-sm text-muted-foreground">Total Companies</p>
              <p className="text-xs text-muted-foreground mt-1">{activeCompanies} active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-100">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{totalEmployees.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">Total Employees</p>
              <p className="text-xs text-muted-foreground mt-1">
                {totalGhanaianEmployees.toLocaleString()} Ghanaian ({localContentPercentage}%)
              </p>
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
              <p className="text-sm text-muted-foreground">Approved Reports</p>
              <p className="text-xs text-muted-foreground mt-1">{pendingReports} pending</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-orange-100">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{totalCompanies}</p>
              <p className="text-sm text-muted-foreground">Active Permits</p>
              <p className="text-xs text-muted-foreground mt-1">All compliant</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs defaultValue="companies" className="space-y-4">
            <TabsList>
              <TabsTrigger value="companies">All Companies</TabsTrigger>
              <TabsTrigger value="reports">Reports Overview</TabsTrigger>
              <TabsTrigger value="permits">Permits Overview</TabsTrigger>
            </TabsList>

            {/* All Companies Tab */}
            <TabsContent value="companies" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>Registered Companies</CardTitle>
                      <CardDescription>
                        Manage all registered oil and gas companies
                      </CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Register Company
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filters */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search companies..."
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
                            <label className="text-sm font-medium mb-2 block">
                              Company Type
                            </label>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                              <SelectTrigger className="h-9">
                                <SelectValue placeholder="All Types" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                {uniqueTypes.map((type) => (
                                  <SelectItem key={type} value={type}>
                                    {type}
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
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">
                              Results per page
                            </label>
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
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Companies Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Company Name</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead>Employees</TableHead>
                          <TableHead>Local Content %</TableHead>
                          <TableHead>Active Contracts</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentCompanies.length === 0 ? (
                          <TableRow>
                            <TableCell
                              colSpan={8}
                              className="text-center text-muted-foreground py-8"
                            >
                              No companies found
                            </TableCell>
                          </TableRow>
                        ) : (
                          currentCompanies.map((company, index) => {
                            const localContent = (
                              (company.ghanaianEmployees / company.totalEmployees) *
                              100
                            ).toFixed(1);
                            return (
                              <TableRow key={company.id}>
                                <TableCell className="font-medium">
                                  {startIndex + index + 1}
                                </TableCell>
                                <TableCell>
                                  <Link
                                    href={`/admin/companies/${company.id}`}
                                    className="font-medium hover:underline"
                                  >
                                    {company.name}
                                  </Link>
                                  <p className="text-xs text-muted-foreground">
                                    {company.registrationNumber}
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <Badge variant="secondary">{company.type}</Badge>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm">
                                    {company.totalEmployees.toLocaleString()}
                                  </div>
                                  <p className="text-xs text-muted-foreground">
                                    {company.ghanaianEmployees.toLocaleString()} Ghanaian
                                  </p>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[60px]">
                                      <div
                                        className="bg-green-500 h-2 rounded-full"
                                        style={{ width: `${localContent}%` }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium">
                                      {localContent}%
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="text-sm font-medium">
                                    {company.contracts?.active || 0}
                                  </div>
                                </TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8"
                                      asChild
                                    >
                                      <Link href={`/admin/companies/${company.id}`}>
                                        <Eye className="h-4 w-4" />
                                      </Link>
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Mail className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            );
                          })
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-muted-foreground">
                        Showing {startIndex + 1} to{" "}
                        {Math.min(endIndex, filteredCompanies.length)} of{" "}
                        {filteredCompanies.length} companies
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

            {/* Reports Overview Tab */}
            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Company Reports Overview</CardTitle>
                  <CardDescription>Summary of reports by company</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <Card className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-green-100">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-green-600">
                              {approvedReports}
                            </p>
                            <p className="text-sm text-muted-foreground">Approved</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-yellow-100">
                            <Clock className="h-5 w-5 text-yellow-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-yellow-600">
                              {pendingReports}
                            </p>
                            <p className="text-sm text-muted-foreground">Pending</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card className="border-2">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-red-100">
                            <XCircle className="h-5 w-5 text-red-600" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-red-600">
                              {declinedReports}
                            </p>
                            <p className="text-sm text-muted-foreground">Declined</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Total Reports</TableHead>
                          <TableHead>Approved</TableHead>
                          <TableHead>Pending</TableHead>
                          <TableHead>Declined</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companies.map((company) => {
                          const companyReports = submissions.filter(
                            (s) => s.companyId === company.id
                          );
                          const approved = companyReports.filter(
                            (s) => s.status === "approved"
                          ).length;
                          const pending = companyReports.filter(
                            (s) => s.status === "pending"
                          ).length;
                          const declined = companyReports.filter(
                            (s) => s.status === "declined"
                          ).length;

                          return (
                            <TableRow key={company.id}>
                              <TableCell>
                                <Link
                                  href={`/admin/companies/${company.id}`}
                                  className="font-medium hover:underline"
                                >
                                  {company.name}
                                </Link>
                              </TableCell>
                              <TableCell className="font-medium">
                                {companyReports.length}
                              </TableCell>
                              <TableCell>
                                <span className="text-green-600 font-medium">{approved}</span>
                              </TableCell>
                              <TableCell>
                                <span className="text-yellow-600 font-medium">{pending}</span>
                              </TableCell>
                              <TableCell>
                                <span className="text-red-600 font-medium">{declined}</span>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button variant="outline" size="sm" asChild>
                                  <Link href={`/admin/companies/${company.id}`}>
                                    View Details
                                  </Link>
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Permits Overview Tab */}
            <TabsContent value="permits">
              <Card>
                <CardHeader>
                  <CardTitle>Company Permits Overview</CardTitle>
                  <CardDescription>Permit status for all companies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Company</TableHead>
                          <TableHead>Permit Number</TableHead>
                          <TableHead>Permit Status</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {companies.map((company) => (
                          <TableRow key={company.id}>
                            <TableCell>
                              <Link
                                href={`/admin/companies/${company.id}`}
                                className="font-medium hover:underline"
                              >
                                {company.name}
                              </Link>
                            </TableCell>
                            <TableCell className="font-mono text-sm">
                              {company.permitNumber}
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  company.permitStatus === "active" ? "success" : "secondary"
                                }
                              >
                                {company.permitStatus}
                              </Badge>
                            </TableCell>
                            <TableCell>{company.type}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm" asChild>
                                <Link href="/admin/permits">Manage Permits</Link>
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Messaging Tab */}
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
