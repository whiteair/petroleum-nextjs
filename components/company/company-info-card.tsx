"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Globe, MapPin, FileText, Hash, Building } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Company } from "@/types";

interface CompanyInfoCardProps {
  company: Company;
}

interface InfoItemProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

function InfoItem({ icon: Icon, label, value }: InfoItemProps) {
  return (
    <div className="flex items-start gap-3 py-3 border-b last:border-0">
      <Icon className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground font-medium mb-0.5">{label}</p>
        <p className="text-sm text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}

export function CompanyInfoCard({ company }: CompanyInfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Company Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-0">
          <InfoItem icon={Building} label="Registered Name" value={company.registeredName} />
          <InfoItem icon={Mail} label="Email" value={company.email} />
          <InfoItem icon={Phone} label="Telephone" value={company.telephone} />
          <InfoItem icon={Globe} label="Website" value={company.website} />
          <InfoItem icon={MapPin} label="Address" value={company.address} />
          <InfoItem icon={FileText} label="Registration Number" value={company.registrationNumber} />
          <InfoItem icon={FileText} label="Permit Number" value={company.permitNumber} />
          <InfoItem icon={Hash} label="TIN" value={company.tin} />
        </CardContent>
      </Card>
    </motion.div>
  );
}
