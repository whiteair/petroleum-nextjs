"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionD() {
  const [initiatives, setInitiatives] = useState("");
  const [implementation, setImplementation] = useState("");
  const [expenditure, setExpenditure] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">Technology Transfer Programme Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="initiatives">1. Initiatives or Programmes to be Pursued *</Label>
            <Textarea
              id="initiatives"
              value={initiatives}
              onChange={(e) => setInitiatives(e.target.value)}
              placeholder="Example: Training for business management, implementing systems locally, knowledge transfer programs, etc."
              rows={4}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Describe the technology transfer initiatives planned
            </p>
          </div>

          <div>
            <Label htmlFor="implementation">2. Implementation Strategy and Timelines *</Label>
            <Input
              id="implementation"
              value={implementation}
              onChange={(e) => setImplementation(e.target.value)}
              placeholder="e.g., Phased approach over 24 months, quarterly reviews, etc."
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              How and when will technology transfer occur?
            </p>
          </div>

          <div>
            <Label htmlFor="expenditure">3. Expenditure to be Incurred (USD) *</Label>
            <Textarea
              id="expenditure"
              value={expenditure}
              onChange={(e) => setExpenditure(e.target.value)}
              placeholder="Breakdown of costs: training $X, equipment $Y, implementation $Z, etc."
              rows={4}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Total budget and breakdown for technology transfer activities
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
