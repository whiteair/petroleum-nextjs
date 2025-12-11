"use client";

import { useState } from "react";
import { Users, UserCheck, Calendar, Briefcase } from "lucide-react";
import { CompanyProfile } from "@/components/company/company-profile";
import { CompanyInfoCard } from "@/components/company/company-info-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CompanySubmissionsTable, CategorizedSubmission } from "@/components/company/company-submissions-table";
import { LocalContentPlanView } from "@/components/company/local-content-plan-view";
import { Company } from "@/types";
import masterData from "@/lib/data/master-data.json";

interface CompanyDetailsContentProps {
  company: Company;
}

export function CompanyDetailsContent({ company }: CompanyDetailsContentProps) {
  const [viewingReport, setViewingReport] = useState<CategorizedSubmission | null>(null);
  const ghanaianPercentage = ((company.ghanaianEmployees / company.totalEmployees) * 100).toFixed(1);

  const handleViewReport = (submission: CategorizedSubmission) => {
    setViewingReport(submission);
  };

  const handleBackFromReport = () => {
    setViewingReport(null);
  };

  if (viewingReport) {
    return (
      <div className="lg:col-span-3">
        <LocalContentPlanView
          reportTitle={viewingReport.reportType}
          onBack={handleBackFromReport}
        />
      </div>
    );
  }

  return (
    <div className="lg:col-span-3">
      <Tabs defaultValue="information" className="w-full">
        <TabsList className="inline-flex h-10 items-center justify-start rounded-md bg-muted p-1 text-muted-foreground mb-6 w-full">
          <TabsTrigger value="information">Information</TabsTrigger>
          <TabsTrigger value="contracts">Contracts</TabsTrigger>
          <TabsTrigger value="permits">Permits</TabsTrigger>
          <TabsTrigger value="portal-access">Portal Access</TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Employees Card */}
            <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-white/90">
                  Employees
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">{company.totalEmployees}</span>
                  <Users className="h-8 w-8 text-white/80" />
                </div>
                <div className="text-sm text-white/80">
                  <span className="font-semibold text-white">{company.ghanaianEmployees}</span> Local <span className="mx-1">|</span> <span className="font-semibold text-white">{company.totalEmployees - company.ghanaianEmployees}</span> Foreign
                </div>
              </CardContent>
            </Card>

            {/* Contracts Card */}
            <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-white/90">
                  Contracts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">{company.contracts?.total || 0}</span>
                  <Briefcase className="h-8 w-8 text-white/80" />
                </div>
                <div className="text-sm text-white/80">
                  <span className="font-semibold text-white">{company.contracts?.active || 0}</span> Active <span className="mx-1">|</span> <span className="font-semibold text-white">{company.contracts?.past || 0}</span> Past
                </div>
              </CardContent>
            </Card>

            {/* Submissions Card */}
            <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-white/90">
                  Submissions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">
                    {masterData.submissions.filter(s => s.companyId === company.id).length}
                  </span>
                  <UserCheck className="h-8 w-8 text-white/80" />
                </div>
                <div className="text-sm text-white/80">
                  <span className="font-semibold text-white">
                    {masterData.submissions.filter(s => s.companyId === company.id && s.status === "approved").length}
                  </span> Approved <span className="mx-1">|</span>{" "}
                  <span className="font-semibold text-white">
                    {masterData.submissions.filter(s => s.companyId === company.id && s.status === "pending").length}
                  </span> Pending
                </div>
              </CardContent>
            </Card>

            {/* Years Active Card */}
            <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-white/90">
                  Years Active
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold">
                    {new Date().getFullYear() - new Date(company.incorporationDate).getFullYear()}
                  </span>
                  <Calendar className="h-8 w-8 text-white/80" />
                </div>
                <div className="text-sm text-white/80">
                  Since {new Date(company.incorporationDate).getFullYear()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Submissions Table */}
          <CompanySubmissionsTable companyId={company.id} onViewReport={handleViewReport} />
        </TabsContent>

        <TabsContent value="contracts" className="space-y-6">
          {/* Contracts Executed / Purchase Orders Obtained */}
          <Card>
            <CardHeader>
              <CardTitle>Contracts Executed / Purchase Orders Obtained</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold w-[5%]">#</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Company Awarding</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Contract Description</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Award Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Total Sum (USD)</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Amount Received</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">1.</td>
                      <td className="py-3 px-4 text-sm">ABC Ghana LTD</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">Supply of OCTG/Pipes</a>
                      </td>
                      <td className="py-3 px-4 text-sm">11th Dec 2015</td>
                      <td className="py-3 px-4 text-sm">USD 33.2M</td>
                      <td className="py-3 px-4 text-sm">USD 10.2M</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Ongoing
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">2.</td>
                      <td className="py-3 px-4 text-sm">Redlake Ghana LTD</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">Marine Survey</a>
                      </td>
                      <td className="py-3 px-4 text-sm">19th Feb 2019</td>
                      <td className="py-3 px-4 text-sm">USD 23M</td>
                      <td className="py-3 px-4 text-sm">USD 3.2M</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Ongoing
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">3.</td>
                      <td className="py-3 px-4 text-sm">Lloyd & Co. LTD</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">Fibre Optic Cable Optimization</a>
                      </td>
                      <td className="py-3 px-4 text-sm">3rd Jul 2016</td>
                      <td className="py-3 px-4 text-sm">USD 17.2M</td>
                      <td className="py-3 px-4 text-sm">USD 12.5M</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Contracts Sub-Contracted / Purchase Orders Issued */}
          <Card>
            <CardHeader>
              <CardTitle>Contracts Sub-Contracted / Purchase Orders Issued by the Company</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold w-[5%]">#</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">PO No.</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Description</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Vendor Name</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Award Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Total Sum (USD)</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Amount Received</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Supplier Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Comments</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">1.</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">9610043</a>
                      </td>
                      <td className="py-3 px-4 text-sm">Consultancy Services</td>
                      <td className="py-3 px-4 text-sm">Redlake Ghana LTD</td>
                      <td className="py-3 px-4 text-sm">19th Feb 2020</td>
                      <td className="py-3 px-4 text-sm">USD 565,500</td>
                      <td className="py-3 px-4 text-sm">USD 450,000</td>
                      <td className="py-3 px-4 text-sm">Indigenous</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Ongoing
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">2.</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">6258193</a>
                      </td>
                      <td className="py-3 px-4 text-sm">Inspection Services</td>
                      <td className="py-3 px-4 text-sm">ABC Ghana LTD</td>
                      <td className="py-3 px-4 text-sm">21st Aug 2018</td>
                      <td className="py-3 px-4 text-sm">USD 625,000</td>
                      <td className="py-3 px-4 text-sm">USD 530,000</td>
                      <td className="py-3 px-4 text-sm">Foreign</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Completed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">3.</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">9134526</a>
                      </td>
                      <td className="py-3 px-4 text-sm">Car Rental Services</td>
                      <td className="py-3 px-4 text-sm">DNK Engineering</td>
                      <td className="py-3 px-4 text-sm">10th Sep 2019</td>
                      <td className="py-3 px-4 text-sm">USD 89,000</td>
                      <td className="py-3 px-4 text-sm">USD 75,000</td>
                      <td className="py-3 px-4 text-sm">Indigenous</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Completed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Local Content Spend */}
          <Card>
            <CardHeader>
              <CardTitle>Local Content Spend (2018)</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold w-[5%]">#</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Spend Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Quarter 1</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Quarter 2</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Quarter 3</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Quarter 4</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Total Spend</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Comment</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">1.</td>
                      <td className="py-3 px-4 text-sm">Ghanaian Employees</td>
                      <td className="py-3 px-4 text-sm">606,705</td>
                      <td className="py-3 px-4 text-sm">542,705</td>
                      <td className="py-3 px-4 text-sm">743,705</td>
                      <td className="py-3 px-4 text-sm">322,705</td>
                      <td className="py-3 px-4 text-sm font-semibold">2,215,820</td>
                      <td className="py-3 px-4 text-sm">Courier & Catering Services</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">2.</td>
                      <td className="py-3 px-4 text-sm">Ghanaian Services</td>
                      <td className="py-3 px-4 text-sm">606,705</td>
                      <td className="py-3 px-4 text-sm">542,705</td>
                      <td className="py-3 px-4 text-sm">743,705</td>
                      <td className="py-3 px-4 text-sm">322,705</td>
                      <td className="py-3 px-4 text-sm font-semibold">2,215,820</td>
                      <td className="py-3 px-4 text-sm">Stationery & Equipment</td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">3.</td>
                      <td className="py-3 px-4 text-sm">Goods and Materials</td>
                      <td className="py-3 px-4 text-sm">606,705</td>
                      <td className="py-3 px-4 text-sm">542,705</td>
                      <td className="py-3 px-4 text-sm">743,705</td>
                      <td className="py-3 px-4 text-sm">322,705</td>
                      <td className="py-3 px-4 text-sm font-semibold">2,215,820</td>
                      <td className="py-3 px-4 text-sm">Travel & Hospitality</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permits" className="space-y-6">
          {/* Active Permits */}
          <Card>
            <CardHeader>
              <CardTitle>Active Permits</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold w-[5%]">#</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Permit Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Permit Number</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Issue Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Expiry Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Issuing Authority</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">1.</td>
                      <td className="py-3 px-4 text-sm">Petroleum Agreement</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">PA-2018-0156</a>
                      </td>
                      <td className="py-3 px-4 text-sm">15th Jan 2018</td>
                      <td className="py-3 px-4 text-sm">15th Jan 2028</td>
                      <td className="py-3 px-4 text-sm">Ministry of Energy</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">2.</td>
                      <td className="py-3 px-4 text-sm">Environmental Permit</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">EP-2019-0432</a>
                      </td>
                      <td className="py-3 px-4 text-sm">10th Mar 2019</td>
                      <td className="py-3 px-4 text-sm">10th Mar 2026</td>
                      <td className="py-3 px-4 text-sm">EPA Ghana</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">3.</td>
                      <td className="py-3 px-4 text-sm">Work & Residence Permit</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">WRP-2023-1289</a>
                      </td>
                      <td className="py-3 px-4 text-sm">5th Jun 2023</td>
                      <td className="py-3 px-4 text-sm">5th Jun 2025</td>
                      <td className="py-3 px-4 text-sm">Ghana Immigration Service</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Expiring Soon
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">4.</td>
                      <td className="py-3 px-4 text-sm">Offshore Operations License</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">OOL-2020-0078</a>
                      </td>
                      <td className="py-3 px-4 text-sm">22nd Aug 2020</td>
                      <td className="py-3 px-4 text-sm">22nd Aug 2030</td>
                      <td className="py-3 px-4 text-sm">Petroleum Commission</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Pending Permits */}
          <Card>
            <CardHeader>
              <CardTitle>Pending Permits</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold w-[5%]">#</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Application ID</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Permit Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Submission Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Expected Decision</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Processing Officer</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">1.</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">APP-2024-3421</a>
                      </td>
                      <td className="py-3 px-4 text-sm">Drilling Permit</td>
                      <td className="py-3 px-4 text-sm">12th Nov 2024</td>
                      <td className="py-3 px-4 text-sm">12th Feb 2025</td>
                      <td className="py-3 px-4 text-sm">Kwame Asante</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                          Under Review
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">2.</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">APP-2024-3156</a>
                      </td>
                      <td className="py-3 px-4 text-sm">Import License</td>
                      <td className="py-3 px-4 text-sm">28th Oct 2024</td>
                      <td className="py-3 px-4 text-sm">28th Jan 2025</td>
                      <td className="py-3 px-4 text-sm">Ama Osei</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">
                          Pending Documentation
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* Expired Permits */}
          <Card>
            <CardHeader>
              <CardTitle>Expired Permits</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-semibold w-[5%]">#</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Permit Type</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Original Number</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Expiry Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Renewal Number</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Renewal Date</th>
                      <th className="text-left py-3 px-4 text-sm font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">1.</td>
                      <td className="py-3 px-4 text-sm">Environmental Permit</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">EP-2014-0156</a>
                      </td>
                      <td className="py-3 px-4 text-sm">10th Mar 2019</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">EP-2019-0432</a>
                      </td>
                      <td className="py-3 px-4 text-sm">10th Mar 2019</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Renewed
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">2.</td>
                      <td className="py-3 px-4 text-sm">Safety Certificate</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">SC-2017-0892</a>
                      </td>
                      <td className="py-3 px-4 text-sm">15th Jul 2022</td>
                      <td className="py-3 px-4 text-sm">—</td>
                      <td className="py-3 px-4 text-sm">—</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-700 ring-1 ring-inset ring-gray-600/20">
                          Expired
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b hover:bg-muted/50">
                      <td className="py-3 px-4 text-sm">3.</td>
                      <td className="py-3 px-4 text-sm">Work & Residence Permit</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">WRP-2021-0445</a>
                      </td>
                      <td className="py-3 px-4 text-sm">5th Jun 2023</td>
                      <td className="py-3 px-4 text-sm">
                        <a href="#" className="text-primary hover:underline">WRP-2023-1289</a>
                      </td>
                      <td className="py-3 px-4 text-sm">5th Jun 2023</td>
                      <td className="py-3 px-4 text-sm">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Renewed
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="portal-access" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Portal Access Users</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 text-sm font-semibold">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Position</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold">Email</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">Kwame Mensah</td>
                    <td className="py-3 px-4 text-sm">CEO</td>
                    <td className="py-3 px-4 text-sm">kwame.mensah@{company.name.toLowerCase().replace(/\s+/g, '')}.com</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">Ama Osei</td>
                    <td className="py-3 px-4 text-sm">IT Administrator</td>
                    <td className="py-3 px-4 text-sm">ama.osei@{company.name.toLowerCase().replace(/\s+/g, '')}.com</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">John Antwi</td>
                    <td className="py-3 px-4 text-sm">Accountant</td>
                    <td className="py-3 px-4 text-sm">john.antwi@{company.name.toLowerCase().replace(/\s+/g, '')}.com</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">Sarah Boateng</td>
                    <td className="py-3 px-4 text-sm">Admin Officer</td>
                    <td className="py-3 px-4 text-sm">sarah.boateng@{company.name.toLowerCase().replace(/\s+/g, '')}.com</td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4 text-sm">Michael Owusu</td>
                    <td className="py-3 px-4 text-sm">Contact Person</td>
                    <td className="py-3 px-4 text-sm">michael.owusu@{company.name.toLowerCase().replace(/\s+/g, '')}.com</td>
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
