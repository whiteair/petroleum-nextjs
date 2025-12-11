"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionG() {
  const [institutionName, setInstitutionName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [branch, setBranch] = useState("");
  const [yearOfEngagement, setYearOfEngagement] = useState("");
  const [servicesPast, setServicesPast] = useState("");
  const [servicesProjected, setServicesProjected] = useState("");
  const [expenditurePast, setExpenditurePast] = useState("");
  const [expenditureProjected, setExpenditureProjected] = useState("");
  const [servicesDetails, setServicesDetails] = useState("");
  const [natureOfWork, setNatureOfWork] = useState("");
  const [totalExpenditure, setTotalExpenditure] = useState("");
  const [indigenousBank, setIndigenousBank] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">Financial Services Information</CardTitle>
          <p className="text-sm text-muted-foreground">
            Note: Must use Ghanaian financial institution unless approved otherwise by the Commission
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="institution-name">Name of Financial Institution *</Label>
              <Input
                id="institution-name"
                value={institutionName}
                onChange={(e) => setInstitutionName(e.target.value)}
                placeholder="Bank or financial institution name"
              />
            </div>
            <div>
              <Label htmlFor="account-number">Account Number *</Label>
              <Input
                id="account-number"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder="Account number"
              />
            </div>
            <div>
              <Label htmlFor="branch">Branch *</Label>
              <Input
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                placeholder="Branch location"
              />
            </div>
            <div>
              <Label htmlFor="year-engagement">Year of Engagement *</Label>
              <Input
                id="year-engagement"
                type="number"
                min="1900"
                max={new Date().getFullYear()}
                value={yearOfEngagement}
                onChange={(e) => setYearOfEngagement(e.target.value)}
                placeholder="YYYY"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-semibold text-sm">Past 6 Months</h4>
              <div>
                <Label htmlFor="services-past">Financial Services Obtained *</Label>
                <Textarea
                  id="services-past"
                  value={servicesPast}
                  onChange={(e) => setServicesPast(e.target.value)}
                  placeholder="List of financial services received"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="expenditure-past">Financial Expenditure (USD) *</Label>
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
                <Label htmlFor="services-projected">Financial Services Projected *</Label>
                <Textarea
                  id="services-projected"
                  value={servicesProjected}
                  onChange={(e) => setServicesProjected(e.target.value)}
                  placeholder="Expected financial services needed"
                  rows={4}
                />
              </div>
              <div>
                <Label htmlFor="expenditure-projected">Financial Expenditure (USD) *</Label>
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
            <Label htmlFor="services-details">Financial Services Details *</Label>
            <Textarea
              id="services-details"
              value={servicesDetails}
              onChange={(e) => setServicesDetails(e.target.value)}
              placeholder="Detailed description of financial services used"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="nature-work">Nature of Work *</Label>
            <Textarea
              id="nature-work"
              value={natureOfWork}
              onChange={(e) => setNatureOfWork(e.target.value)}
              placeholder="Description of financial transactions and activities"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="total-expenditure">Total Expenditure (USD) *</Label>
              <Input
                id="total-expenditure"
                type="number"
                min="0"
                value={totalExpenditure}
                onChange={(e) => setTotalExpenditure(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="indigenous-bank">Indigenous Bank Details</Label>
              <Input
                id="indigenous-bank"
                value={indigenousBank}
                onChange={(e) => setIndigenousBank(e.target.value)}
                placeholder="If using indigenous Ghanaian bank, provide details"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
