"use client";

import { UsersHeader } from "@/components/layout/users-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  RefreshCw,
  Eye,
  Download,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { motion } from "framer-motion";

interface Permit {
  id: number;
  type: string;
  number: string;
  issueDate: string;
  expiryDate: string;
  status: "active" | "expiring_soon" | "expired" | "pending";
  daysUntilExpiry: number;
}

const permitsData: Permit[] = [
  {
    id: 1,
    type: "Exploration License",
    number: "EL-2024-001",
    issueDate: "2024-01-15",
    expiryDate: "2026-01-14",
    status: "active",
    daysUntilExpiry: 431,
  },
  {
    id: 2,
    type: "Drilling Permit",
    number: "DP-2024-045",
    issueDate: "2024-06-01",
    expiryDate: "2024-12-31",
    status: "expiring_soon",
    daysUntilExpiry: 21,
  },
  {
    id: 3,
    type: "Environmental Clearance",
    number: "EC-2023-112",
    issueDate: "2023-03-10",
    expiryDate: "2025-03-09",
    status: "active",
    daysUntilExpiry: 119,
  },
  {
    id: 4,
    type: "Production License",
    number: "PL-2024-007",
    issueDate: "2024-09-01",
    expiryDate: "2029-08-31",
    status: "active",
    daysUntilExpiry: 1726,
  },
  {
    id: 5,
    type: "Transportation Permit",
    number: "TP-2024-089",
    issueDate: "2024-02-01",
    expiryDate: "2024-10-31",
    status: "expired",
    daysUntilExpiry: -40,
  },
];

export default function PermitsPage() {
  const activePermits = permitsData.filter((p) => p.status === "active").length;
  const expiringSoon = permitsData.filter((p) => p.status === "expiring_soon").length;
  const expired = permitsData.filter((p) => p.status === "expired").length;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge variant="success" className="flex items-center gap-1">
          <CheckCircle2 className="h-3 w-3" />
          Active
        </Badge>;
      case "expiring_soon":
        return <Badge variant="warning" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Expiring Soon
        </Badge>;
      case "expired":
        return <Badge variant="destructive" className="flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          Expired
        </Badge>;
      case "pending":
        return <Badge variant="secondary" className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          Pending
        </Badge>;
      default:
        return null;
    }
  };

  return (
    <div>
      <UsersHeader title="Permits" />

      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/users/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Permits</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold">Permits & Licenses</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your permits, licenses, and registrations
          </p>
        </motion.div>

        {/* Alert Banner for Expiring Permits */}
        {expiringSoon > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <Card className="border-orange-200 bg-orange-50 dark:bg-orange-950/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-medium text-orange-900 dark:text-orange-100">
                      Action Required: {expiringSoon} permit{expiringSoon > 1 ? 's' : ''} expiring soon
                    </p>
                    <p className="text-sm text-orange-800 dark:text-orange-200 mt-1">
                      Please renew your permits before they expire to avoid disruptions to your operations.
                    </p>
                  </div>
                  <Button variant="outline" className="border-orange-300 hover:bg-orange-100">
                    View Permits
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
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
              <p className="text-sm text-muted-foreground">Active Permits</p>
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
                <div className="p-3 rounded-lg bg-red-100">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <p className="text-2xl font-bold mb-1 text-red-600">{expired}</p>
              <p className="text-sm text-muted-foreground">Expired</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Permits Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Your Permits</CardTitle>
              <CardDescription>View and manage all your permits and licenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Permit Type</TableHead>
                      <TableHead>Permit Number</TableHead>
                      <TableHead>Issue Date</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {permitsData.map((permit) => (
                      <TableRow key={permit.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4 w-4 text-muted-foreground" />
                            {permit.type}
                          </div>
                        </TableCell>
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
                              Expires in {permit.daysUntilExpiry} days
                            </p>
                          )}
                          {permit.status === "expired" && (
                            <p className="text-xs text-red-600 mt-1">
                              Expired {Math.abs(permit.daysUntilExpiry)} days ago
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
                              <Download className="h-4 w-4" />
                            </Button>
                            {(permit.status === "expiring_soon" || permit.status === "expired") && (
                              <Button variant="outline" size="sm" className="h-8">
                                <RefreshCw className="h-3 w-3 mr-1" />
                                Renew
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Apply for New Permit</h3>
                  <p className="text-sm text-muted-foreground">
                    Submit a new permit application
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-green-100">
                  <RefreshCw className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Renew Permit</h3>
                  <p className="text-sm text-muted-foreground">
                    Renew an existing permit
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-purple-100">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Application Status</h3>
                  <p className="text-sm text-muted-foreground">
                    Track your permit applications
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Information Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <Card>
            <CardHeader className="bg-blue-50 dark:bg-blue-950/20">
              <CardTitle className="text-lg">Permit Renewal Information</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <p className="font-medium">Start renewal process early</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Begin the renewal process at least 60 days before expiry
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">2</span>
                  </div>
                  <div>
                    <p className="font-medium">Prepare required documents</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Ensure all supporting documents are up-to-date and readily available
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-blue-600">3</span>
                  </div>
                  <div>
                    <p className="font-medium">Processing time</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Allow 30-45 business days for processing of renewal applications
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
