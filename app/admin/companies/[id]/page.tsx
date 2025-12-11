import { notFound } from "next/navigation";
import { CompanyProfile } from "@/components/company/company-profile";
import { CompanyInfoCard } from "@/components/company/company-info-card";
import { AdminHeader } from "@/components/layout/admin-header";
import { CompanyDetailsContent } from "@/components/company/company-details-content";
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

          {/* Main Content */}
          <CompanyDetailsContent company={company} />
        </div>
      </div>
    </>
  );
}
