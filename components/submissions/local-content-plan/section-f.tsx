"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionF() {
  const [legalFirmName, setLegalFirmName] = useState("");
  const [dateOfEngagement, setDateOfEngagement] = useState("");
  const [location, setLocation] = useState("");
  const [servicesPast, setServicesPast] = useState("");
  const [servicesProjected, setServicesProjected] = useState("");
  const [expenditurePast, setExpenditurePast] = useState("");
  const [expenditureProjected, setExpenditureProjected] = useState("");
  const [comprehensiveReport, setComprehensiveReport] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">Legal Services Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Note: Must use Ghanaian Legal Firm unless approved otherwise by the Commission
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="legal-firm">Name of Legal Firm *</Label>
              <Input
                id="legal-firm"
                value={legalFirmName}
                onChange={(e) => setLegalFirmName(e.target.value)}
                placeholder="Law firm name"
              />
            </div>
            <div>
              <Label htmlFor="engagement-date">Date of Engagement *</Label>
              <Input
                id="engagement-date"
                type="date"
                value={dateOfEngagement}
                onChange={(e) => setDateOfEngagement(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Office location"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Past 6 Months</h4>
              <div>
                <Label htmlFor="services-past">Legal Services Obtained *</Label>
                <Textarea
                  id="services-past"
                  value={servicesPast}
                  onChange={(e) => setServicesPast(e.target.value)}
                  placeholder="List of legal services received"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="expenditure-past">Legal Expenditure (USD) *</Label>
                <Input
                  id="expenditure-past"
                  type="number"
                  min="0"
                  value={expenditurePast}
                  onChange={(e) => setExpenditurePast(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Next 6 Months (Projected)</h4>
              <div>
                <Label htmlFor="services-projected">Legal Services Projected *</Label>
                <Textarea
                  id="services-projected"
                  value={servicesProjected}
                  onChange={(e) => setServicesProjected(e.target.value)}
                  placeholder="Expected legal services needed"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="expenditure-projected">Legal Expenditure (USD) *</Label>
                <Input
                  id="expenditure-projected"
                  type="number"
                  min="0"
                  value={expenditureProjected}
                  onChange={(e) => setExpenditureProjected(e.target.value)}
                  placeholder="0.00"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="comprehensive-report">Comprehensive Report *</Label>
            <Textarea
              id="comprehensive-report"
              value={comprehensiveReport}
              onChange={(e) => setComprehensiveReport(e.target.value)}
              placeholder="Detailed report on legal services, engagements, and outcomes"
              rows={6}
            />
            <p className="text-xs text-muted-foreground mt-1">
              Provide a comprehensive overview of legal matters and services
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
