"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function SectionC() {
  const [projectType, setProjectType] = useState("");
  const [expectedExpenditure, setExpectedExpenditure] = useState("");
  const [implementationStrategy, setImplementationStrategy] = useState("");
  const [collaboration, setCollaboration] = useState("");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">R&D Sub Plan Details</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div>
            <Label htmlFor="project-type">1. Type of Project/Research and Objectives *</Label>
            <Textarea
              id="project-type"
              value={projectType}
              onChange={(e) => setProjectType(e.target.value)}
              placeholder="Example: Partnership with local university for internships, research into local technology applications, etc."
              rows={4}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Describe the research or development project and its goals
            </p>
          </div>

          <div>
            <Label htmlFor="expenditure">2. Expected Expenditure (USD) *</Label>
            <Input
              id="expenditure"
              type="number"
              min="0"
              step="0.01"
              value={expectedExpenditure}
              onChange={(e) => setExpectedExpenditure(e.target.value)}
              placeholder="0.00"
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Total anticipated budget for the R&D project
            </p>
          </div>

          <div>
            <Label htmlFor="implementation">3. Implementation Strategy and Timelines *</Label>
            <Textarea
              id="implementation"
              value={implementationStrategy}
              onChange={(e) => setImplementationStrategy(e.target.value)}
              placeholder="Example: 18 months theoretical + practical training, quarterly milestones, etc."
              rows={4}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              How will the project be executed and what is the timeline?
            </p>
          </div>

          <div>
            <Label htmlFor="collaboration">4. Collaboration with Institutions *</Label>
            <Textarea
              id="collaboration"
              value={collaboration}
              onChange={(e) => setCollaboration(e.target.value)}
              placeholder="Example: Partnership with Engineering/Marine schools, research institutions, universities, etc."
              rows={4}
              className="mt-2"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Which educational or research institutions will be involved?
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
