import { notFound } from "next/navigation";
import { Users, UserCheck, Calendar, Briefcase } from "lucide-react";
import { CompanyProfile } from "@/components/company/company-profile";
import { CompanyInfoCard } from "@/components/company/company-info-card";
import { AdminHeader } from "@/components/layout/admin-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import masterData from "@/lib/data/master-data.json";
import { Company } from "@/types";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CompanyDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const company = masterData.companies.find((c) => c.id === parseInt(id)) as Company | undefined;

  if (!company) {
    notFound();
  }

  const ghanaianPercentage = ((company.ghanaianEmployees / company.totalEmployees) * 100).toFixed(1);

  return (
    <>
      <AdminHeader title={company.name} />
      <div className="p-6">

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Profile & Info */}
          <div className="lg:col-span-1 space-y-6">
            <CompanyProfile company={company} />
            <CompanyInfoCard company={company} />
          </div>

          {/* Main Content - Tabs */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="information" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="information">Information</TabsTrigger>
                <TabsTrigger value="submissions">Submissions</TabsTrigger>
                <TabsTrigger value="contracts">Contracts</TabsTrigger>
              </TabsList>

              <TabsContent value="information" className="space-y-6">
                {/* Employee Statistics Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white/90">
                        Total Employees
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">{company.totalEmployees}</span>
                        <Users className="h-8 w-8 text-white/80" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white/90">
                        Ghanaian Employees
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">{company.ghanaianEmployees}</span>
                        <UserCheck className="h-8 w-8 text-white/80" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white/90">
                        Local Content %
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">{ghanaianPercentage}%</span>
                        <Briefcase className="h-8 w-8 text-white/80" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm font-medium text-white/90">
                        Years Active
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-3xl font-bold">
                          {new Date().getFullYear() - new Date(company.incorporationDate).getFullYear()}
                        </span>
                        <Calendar className="h-8 w-8 text-white/80" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Detailed Information */}
                <Card>
                  <CardHeader>
                    <CardTitle>Company Details</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                        Services Provided
                      </h4>
                      <p className="text-sm">{company.servicesProvided}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                        Permit Status
                      </h4>
                      <p className="text-sm capitalize">{company.permitStatus}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                        Incorporation Date
                      </h4>
                      <p className="text-sm">
                        {new Date(company.incorporationDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground mb-1">
                        Commencement Date
                      </h4>
                      <p className="text-sm">
                        {new Date(company.commencementDate).toLocaleDateString("en-GB")}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="submissions">
                <Card>
                  <CardHeader>
                    <CardTitle>Submissions History</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Submission history will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contracts">
                <Card>
                  <CardHeader>
                    <CardTitle>Contract Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Contract details will be displayed here.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
}
