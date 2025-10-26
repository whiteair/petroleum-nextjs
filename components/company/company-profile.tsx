"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Company } from "@/types";

interface CompanyProfileProps {
  company: Company;
}

export function CompanyProfile({ company }: CompanyProfileProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4 bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={company.logo}
                alt={company.name}
                fill
                className="object-contain p-4"
                sizes="128px"
              />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              {company.name}
            </h2>
            <Badge
              variant={company.status === "active" ? "success" : "destructive"}
              className="mb-2"
            >
              {company.status.charAt(0).toUpperCase() + company.status.slice(1)}
            </Badge>
            <p className="text-sm text-muted-foreground">{company.type}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
