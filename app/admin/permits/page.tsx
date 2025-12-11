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
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Edit,
  FileText,
  Clock,
  Building2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";

interface Permit {
  id: number;
  companyId: number;
  companyName: string;
  type: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expiring_soon" | "expired" | "pending" | "suspended";
  daysUntilExpiry: number;
}


const permitsData: Permit[] = [
  {
    id: 1,
    companyId: 1,
    companyName: "Tullow Ghana Limited",
    type: "Exploration License",
    number: "EL-2024-001",
    issueDate: "2024-01-15",
    expiryDate: "2026-01-14",
    status: "active",
    daysUntilExpiry: 431,
  },
  {
    id: 2,
    companyId: 1,
    companyName: "Tullow Ghana Limited",
    type: "Drilling Permit",
    number: "DP-2024-045",
    issueDate: "2024-06-01",
    expiryDate: "2024-12-31",
    status: "expiring_soon",
    daysUntilExpiry: 21,
  },
  {
    id: 3,
    companyId: 2,
    companyName: "ENI Ghana",
    type: "Production License",
    number: "PL-2024-007",
    issueDate: "2024-09-01",
    expiryDate: "2029-08-31",
    status: "active",
    daysUntilExpiry: 1726,
  },
  {
    id: 4,
    companyId: 3,
    companyName: "Kosmos Energy",
    type: "Environmental Clearance",
    number: "EC-2023-112",
    issueDate: "2023-03-10",
    expiryDate: "2025-03-09",
    status: "active",
    daysUntilExpiry: 119,
  },
  {
    id: 5,
    companyId: 2,
    companyName: "ENI Ghana",
    type: "Transportation Permit",
    number: "TP-2024-089",
    issueDate: "2024-02-01",
    expiryDate: "2024-10-31",
    status: "expired",
    daysUntilExpiry: -40,
  },
  {
    id: 6,
    companyId: 4,
    companyName: "Springfield E&P",
    type: "Exploration License",
    number: "EL-2024-PENDING",
    issueDate: "2024-11-15",
    expiryDate: "2026-11-14",
    status: "pending",
    daysUntilExpiry: 730,
  },
  {
    id: 7,
    companyId: 5,
    companyName: "Aker Energy",
    type: "Production License",
    number: "PL-2024-PENDING",
    issueDate: "2024-11-20",
    expiryDate: "2029-11-19",
    status: "pending",
    daysUntilExpiry: 1825,
  },
  {
    id: 8,
    companyId: 6,
    companyName: "Anadarko Petroleum Corporation",
    type: "Exploration License",
    number: "EL-2023-089",
    issueDate: "2023-05-20",
    expiryDate: "2025-05-19",
    status: "active",
    daysUntilExpiry: 160,
  },
  {
    id: 9,
    companyId: 7,
    companyName: "GNPC (Ghana National Petroleum Corporation)",
    type: "Production License",
    number: "PL-2022-015",
    issueDate: "2022-08-10",
    expiryDate: "2027-08-09",
    status: "active",
    daysUntilExpiry: 972,
  },
  {
    id: 10,
    companyId: 8,
    companyName: "Hess Corporation",
    type: "Drilling Permit",
    number: "DP-2024-078",
    issueDate: "2024-09-15",
    expiryDate: "2024-12-15",
    status: "expiring_soon",
    daysUntilExpiry: 5,
  },
  {
    id: 11,
    companyId: 9,
    companyName: "Lukoil Ghana",
    type: "Environmental Clearance",
    number: "EC-2024-034",
    issueDate: "2024-04-01",
    expiryDate: "2026-03-31",
    status: "active",
    daysUntilExpiry: 476,
  },
  {
    id: 12,
    companyId: 10,
    companyName: "Vaalco Energy",
    type: "Production License",
    number: "PL-2024-022",
    issueDate: "2024-07-10",
    expiryDate: "2029-07-09",
    status: "active",
    daysUntilExpiry: 1672,
  },
];


export default function PermitManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Permits filtering
  const filteredPermits = permitsData.filter((permit) => {
    const matchesSearch =
      permit.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      permit.number.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || permit.type === typeFilter;
    const matchesStatus = statusFilter === "all" || permit.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalPages = Math.ceil(filteredPermits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPermits = filteredPermits.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success">Active</Badge>;
      case "expiring_soon":
        return <Badge variant="warning">Expiring Soon</Badge>;
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "pending":
        return <Badge variant="secondary">Pending</Badge>;
      case "suspended":
        return <Badge variant="destructive">Suspended</Badge>;
      case "under_review":
        return <Badge variant="warning">Under Review</Badge>;
      case "approved":
        return <Badge variant="success">Approved</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      default:
        return null;
    }
  };

  const activePermits = permitsData.filter((p) => p.status === "active").length;
  const expiringSoon = permitsData.filter((p) => p.status === "expiring_soon").length;
  const expired = permitsData.filter((p) => p.status === "expired").length;
  const expiringTotal = expiringSoon + expired;
  const pendingPermits = permitsData.filter((p) => p.status === "pending").length;

  return (
    <div>
      <AdminHeader title="Permit Management" />

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
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1">{permitsData.length}</p>
              <p className="text-sm text-muted-foreground">Total Permits</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 text-green-600">{activePermits}</p>
              <p className="text-sm text-muted-foreground">Active</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-orange-100">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 text-orange-600">{expiringSoon}</p>
              <p className="text-sm text-muted-foreground">Expiring Soon</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-purple-100">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 text-purple-600">{pendingPermits}</p>
              <p className="text-sm text-muted-foreground">Pending Permits</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Tabs for Permits and Applications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Tabs defaultValue="permits" className="space-y-4">
            <TabsList>
              <TabsTrigger value="permits">All Permits</TabsTrigger>
              <TabsTrigger value="pending">
                Pending Permits
                {pendingPermits > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-purple-500 text-white rounded-full">
                    {pendingPermits}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="expiring">
                Expiring
                {expiringTotal > 0 && (
                  <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full">
                    {expiringTotal}
                  </span>
                )}
              </TabsTrigger>
            </TabsList>

            {/* All Permits Tab */}
            <TabsContent value="permits" className="space-y-4">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <CardTitle>All Permits</CardTitle>
                      <CardDescription>Manage permits and licenses for all companies</CardDescription>
                    </div>
                    <Button>
                      <Plus className="mr-2 h-4 w-4" />
                      Issue New Permit
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Search and Filter */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search permits..."
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
                            <label className="text-sm font-medium mb-2 block">Permit Type</label>
                            <Select value={typeFilter} onValueChange={setTypeFilter}>
                              <SelectTrigger className="h-9">
                                <SelectValue placeholder="All Types" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All Types</SelectItem>
                                <SelectItem value="Exploration License">Exploration License</SelectItem>
                                <SelectItem value="Drilling Permit">Drilling Permit</SelectItem>
                                <SelectItem value="Production License">Production License</SelectItem>
                                <SelectItem value="Environmental Clearance">Environmental Clearance</SelectItem>
                                <SelectItem value="Transportation Permit">Transportation Permit</SelectItem>
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
                                <SelectItem value="expiring_soon">Expiring Soon</SelectItem>
                                <SelectItem value="expired">Expired</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Permits Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Permit Type</TableHead>
                          <TableHead>Permit Number</TableHead>
                          <TableHead>Issue Date</TableHead>
                          <TableHead>Expiry Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {currentPermits.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                              No permits found
                            </TableCell>
                          </TableRow>
                        ) : (
                          currentPermits.map((permit, index) => (
                            <TableRow key={permit.id}>
                              <TableCell className="font-medium">{startIndex + index + 1}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Building2 className="h-4 w-4 text-muted-foreground" />
                                  <Link
                                    href={`/admin/companies/${permit.companyId}`}
                                    className="font-medium hover:underline"
                                  >
                                    {permit.companyName}
                                  </Link>
                                </div>
                              </TableCell>
                              <TableCell>{permit.type}</TableCell>
                              <TableCell className="font-mono text-sm">{permit.number}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  {new Date(permit.issueDate).toLocaleDateString()}
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2 text-sm">
                                  <Calendar className="h-3 w-3 text-muted-foreground" />
                                  {new Date(permit.expiryDate).toLocaleDateString()}
                                </div>
                                {permit.status === "expiring_soon" && (
                                  <p className="text-xs text-orange-600 mt-1">
                                    {permit.daysUntilExpiry} days left
                                  </p>
                                )}
                              </TableCell>
                              <TableCell>{getStatusBadge(permit.status)}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-2">
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <Edit className="h-4 w-4" />
                                  </Button>
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
                        Showing {startIndex + 1} to {Math.min(endIndex, filteredPermits.length)} of{" "}
                        {filteredPermits.length} permits
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

            {/* Pending Permits Tab */}
            <TabsContent value="pending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Permits</CardTitle>
                  <CardDescription>Review and approve pending permit requests from companies</CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Search */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="relative flex-1 max-w-sm">
                      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        placeholder="Search pending permits..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 h-9 text-sm"
                      />
                    </div>
                  </div>

                  {/* Pending Permits Table */}
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="w-12">#</TableHead>
                          <TableHead>Company</TableHead>
                          <TableHead>Permit Type</TableHead>
                          <TableHead>Permit Number</TableHead>
                          <TableHead>Submitted Date</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {permitsData.filter((p) => p.status === "pending").length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                              No pending permits found
                            </TableCell>
                          </TableRow>
                        ) : (
                          permitsData
                            .filter((p) => p.status === "pending")
                            .map((permit, index) => (
                              <TableRow key={permit.id}>
                                <TableCell className="font-medium">{index + 1}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Building2 className="h-4 w-4 text-muted-foreground" />
                                    <Link
                                      href={`/admin/companies/${permit.companyId}`}
                                      className="font-medium hover:underline"
                                    >
                                      {permit.companyName}
                                    </Link>
                                  </div>
                                </TableCell>
                                <TableCell>{permit.type}</TableCell>
                                <TableCell className="font-mono text-sm">{permit.number}</TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Calendar className="h-3 w-3 text-muted-foreground" />
                                    {new Date(permit.issueDate).toLocaleDateString()}
                                  </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(permit.status)}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button variant="outline" size="sm" className="h-8">
                                      <Eye className="h-3 w-3 mr-1" />
                                      Review
                                    </Button>
                                    <Button size="sm" className="h-8">
                                      Approve
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Expiring Tab */}
            <TabsContent value="expiring" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Expiring Permits</CardTitle>
                  <CardDescription>Permits that are expiring soon or have expired</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="expiring_soon" className="space-y-4">
                    <TabsList>
                      <TabsTrigger value="expiring_soon">
                        Expiring Soon
                        {expiringSoon > 0 && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-orange-500 text-white rounded-full">
                            {expiringSoon}
                          </span>
                        )}
                      </TabsTrigger>
                      <TabsTrigger value="expired">
                        Expired
                        {expired > 0 && (
                          <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                            {expired}
                          </span>
                        )}
                      </TabsTrigger>
                    </TabsList>

                    {/* Expiring Soon Sub-Tab */}
                    <TabsContent value="expiring_soon">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">#</TableHead>
                              <TableHead>Company</TableHead>
                              <TableHead>Permit Type</TableHead>
                              <TableHead>Permit Number</TableHead>
                              <TableHead>Expiry Date</TableHead>
                              <TableHead>Days Remaining</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {permitsData.filter((p) => p.status === "expiring_soon").length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                  No permits expiring soon
                                </TableCell>
                              </TableRow>
                            ) : (
                              permitsData
                                .filter((p) => p.status === "expiring_soon")
                                .map((permit, index) => (
                                  <TableRow key={permit.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <Link
                                          href={`/admin/companies/${permit.companyId}`}
                                          className="font-medium hover:underline"
                                        >
                                          {permit.companyName}
                                        </Link>
                                      </div>
                                    </TableCell>
                                    <TableCell>{permit.type}</TableCell>
                                    <TableCell className="font-mono text-sm">{permit.number}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        {new Date(permit.expiryDate).toLocaleDateString()}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <span className="text-orange-600 font-medium">
                                        {permit.daysUntilExpiry} days
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm" className="h-8">
                                          <Eye className="h-3 w-3 mr-1" />
                                          View
                                        </Button>
                                        <Button variant="outline" size="sm" className="h-8">
                                          <FileText className="h-3 w-3 mr-1" />
                                          Send Reminder
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>

                    {/* Expired Sub-Tab */}
                    <TabsContent value="expired">
                      <div className="rounded-md border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-12">#</TableHead>
                              <TableHead>Company</TableHead>
                              <TableHead>Permit Type</TableHead>
                              <TableHead>Permit Number</TableHead>
                              <TableHead>Expiry Date</TableHead>
                              <TableHead>Expired Since</TableHead>
                              <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {permitsData.filter((p) => p.status === "expired").length === 0 ? (
                              <TableRow>
                                <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                                  No expired permits
                                </TableCell>
                              </TableRow>
                            ) : (
                              permitsData
                                .filter((p) => p.status === "expired")
                                .map((permit, index) => (
                                  <TableRow key={permit.id}>
                                    <TableCell className="font-medium">{index + 1}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2">
                                        <Building2 className="h-4 w-4 text-muted-foreground" />
                                        <Link
                                          href={`/admin/companies/${permit.companyId}`}
                                          className="font-medium hover:underline"
                                        >
                                          {permit.companyName}
                                        </Link>
                                      </div>
                                    </TableCell>
                                    <TableCell>{permit.type}</TableCell>
                                    <TableCell className="font-mono text-sm">{permit.number}</TableCell>
                                    <TableCell>
                                      <div className="flex items-center gap-2 text-sm">
                                        <Calendar className="h-3 w-3 text-muted-foreground" />
                                        {new Date(permit.expiryDate).toLocaleDateString()}
                                      </div>
                                    </TableCell>
                                    <TableCell>
                                      <span className="text-red-600 font-medium">
                                        {Math.abs(permit.daysUntilExpiry)} days ago
                                      </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <div className="flex justify-end gap-2">
                                        <Button variant="outline" size="sm" className="h-8">
                                          <Eye className="h-3 w-3 mr-1" />
                                          View
                                        </Button>
                                        <Button variant="destructive" size="sm" className="h-8">
                                          <AlertTriangle className="h-3 w-3 mr-1" />
                                          Take Action
                                        </Button>
                                      </div>
                                    </TableCell>
                                  </TableRow>
                                ))
                            )}
                          </TableBody>
                        </Table>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
}
