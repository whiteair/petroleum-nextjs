"use client";

import { FileText, CreditCard, ClipboardCheck, Ban, CheckCircle2, AlertCircle } from "lucide-react";
import { StatusCard } from "@/components/company/status-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";

export default function CompanyDashboard() {
  // In production, this would be fetched based on logged-in company
  const companyStatus = {
    applicationStatus: "not_submitted",
    paymentStatus: "not_paid",
    formStatus: "incomplete",
    approvalStatus: "not_approved",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto py-8 px-4">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Track your application and submission status
            </p>
          </div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/company">Company</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatusCard
            title="Application Status"
            value="Not Submitted"
            icon={FileText}
            color="bg-gradient-to-br from-blue-500 to-blue-600"
            delay={0}
          />
          <StatusCard
            title="Payment Status"
            value="Not Paid"
            icon={CreditCard}
            color="bg-gradient-to-br from-red-500 to-red-600"
            delay={0.1}
          />
          <StatusCard
            title="Form Status"
            value="Incomplete"
            icon={ClipboardCheck}
            color="bg-gradient-to-br from-pink-500 to-pink-600"
            delay={0.2}
          />
          <StatusCard
            title="Commission Approval"
            value="Not Approved"
            icon={Ban}
            color="bg-gradient-to-br from-purple-500 to-purple-600"
            delay={0.3}
          />
        </div>

        {/* Instructions Card */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-blue-600" />
              Getting Started Instructions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Complete Your Application
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Fill out the application form with your company details and required documentation.
                    </p>
                    <Button className="mt-3" size="sm" variant="outline">
                      Start Application
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Make Payment
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Process the registration fee payment through the approved payment channels.
                    </p>
                    <Button className="mt-3" size="sm" variant="outline" disabled>
                      Proceed to Payment
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Submit Local Content Plan
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Upload your local content plan and supporting documents for review.
                    </p>
                    <Button className="mt-3" size="sm" variant="outline" disabled>
                      Upload Documents
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold">
                    4
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">
                      Await Commission Approval
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your application will be reviewed by the Ghana Petroleum Commission.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded-r">
              <div className="flex gap-3">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-900 mb-1">Important Notice</h4>
                  <p className="text-sm text-blue-800">
                    All petroleum companies operating in Ghana must comply with local content regulations.
                    Ensure all information provided is accurate and up-to-date. For assistance, contact
                    the Ghana Petroleum Commission support team.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <FileText className="h-6 w-6" />
                <span className="text-sm">View Application</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <CreditCard className="h-6 w-6" />
                <span className="text-sm">Payment History</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <ClipboardCheck className="h-6 w-6" />
                <span className="text-sm">Submit Reports</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col items-center gap-2">
                <CheckCircle2 className="h-6 w-6" />
                <span className="text-sm">View Status</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
