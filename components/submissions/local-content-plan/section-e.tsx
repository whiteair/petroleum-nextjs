"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload } from "lucide-react";

export function SectionE() {
  // Insurance fields
  const [insuranceProvider, setInsuranceProvider] = useState("");
  const [officeLocation, setOfficeLocation] = useState("");
  const [insuranceBroker, setInsuranceBroker] = useState("");
  const [assetInsured, setAssetInsured] = useState("");
  const [sumInsured, setSumInsured] = useState("");
  const [typeOfCover, setTypeOfCover] = useState("");

  // Reinsurance fields
  const [reinsuranceProvider, setReinsuranceProvider] = useState("");
  const [reinsuranceAsset, setReinsuranceAsset] = useState("");
  const [reinsuranceSum, setReinsuranceSum] = useState("");
  const [reasonForOmission, setReasonForOmission] = useState("");

  return (
    <div className="space-y-8">
      {/* Insurance Section */}
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">Insurance Services</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="insurance-provider">Name of Provider *</Label>
              <Input
                id="insurance-provider"
                value={insuranceProvider}
                onChange={(e) => setInsuranceProvider(e.target.value)}
                placeholder="Insurance company name"
              />
            </div>
            <div>
              <Label htmlFor="office-location">Office Location *</Label>
              <Input
                id="office-location"
                value={officeLocation}
                onChange={(e) => setOfficeLocation(e.target.value)}
                placeholder="Physical address"
              />
            </div>
            <div>
              <Label htmlFor="insurance-broker">Insurance Broker *</Label>
              <Input
                id="insurance-broker"
                value={insuranceBroker}
                onChange={(e) => setInsuranceBroker(e.target.value)}
                placeholder="Broker name"
              />
            </div>
            <div>
              <Label htmlFor="asset-insured">Asset Insured *</Label>
              <Input
                id="asset-insured"
                value={assetInsured}
                onChange={(e) => setAssetInsured(e.target.value)}
                placeholder="Description of insured asset"
              />
            </div>
            <div>
              <Label htmlFor="sum-insured">Sum Insured (USD) *</Label>
              <Input
                id="sum-insured"
                type="number"
                min="0"
                value={sumInsured}
                onChange={(e) => setSumInsured(e.target.value)}
                placeholder="0.00"
              />
            </div>
            <div>
              <Label htmlFor="type-of-cover">Type of Cover *</Label>
              <Input
                id="type-of-cover"
                value={typeOfCover}
                onChange={(e) => setTypeOfCover(e.target.value)}
                placeholder="e.g., Comprehensive, Third Party, etc."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Reinsurance Section */}
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">Reinsurance Services</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="reinsurance-provider">Name of Provider</Label>
              <Input
                id="reinsurance-provider"
                value={reinsuranceProvider}
                onChange={(e) => setReinsuranceProvider(e.target.value)}
                placeholder="Reinsurance company name"
              />
            </div>
            <div>
              <Label htmlFor="reinsurance-asset">Asset Insured</Label>
              <Input
                id="reinsurance-asset"
                value={reinsuranceAsset}
                onChange={(e) => setReinsuranceAsset(e.target.value)}
                placeholder="Description of reinsured asset"
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="reinsurance-sum">Sum Insured (USD)</Label>
              <Input
                id="reinsurance-sum"
                type="number"
                min="0"
                value={reinsuranceSum}
                onChange={(e) => setReinsuranceSum(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="reason-omission">Reason for Omission (if applicable)</Label>
            <Textarea
              id="reason-omission"
              value={reasonForOmission}
              onChange={(e) => setReasonForOmission(e.target.value)}
              placeholder="Explain if reinsurance is not being used"
              rows={3}
            />
          </div>

          <div>
            <Label>National Insurance Commission Approval</Label>
            <div className="mt-2 border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
              <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Upload NIC approval document</p>
              <p className="text-xs text-muted-foreground mb-3">PDF, DOC, DOCX (Max 5MB)</p>
              <Button variant="outline" size="sm">Choose File</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
