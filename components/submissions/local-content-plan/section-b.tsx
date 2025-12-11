"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Upload } from "lucide-react";

interface SuccessionPair {
  id: string;
  expatName: string;
  expatPosition: string;
  expatQualifications: string;
  expatExperience: string;
  ghanaianName: string;
  ghanaianPosition: string;
  ghanaianQualifications: string;
  ghanaianExperience: string;
  localizationDuration: string;
  startDate: string;
  endDate: string;
  remarks: string;
}

interface TrainingRequirement {
  id: string;
  expatName: string;
  successorName: string;
  skillsRequired: string;
  trainingCertifications: string;
  kpis: string;
  remarks: string;
}

export function SectionB() {
  const [successionPairs, setSuccessionPairs] = useState<SuccessionPair[]>([
    {
      id: "1",
      expatName: "",
      expatPosition: "",
      expatQualifications: "",
      expatExperience: "",
      ghanaianName: "",
      ghanaianPosition: "",
      ghanaianQualifications: "",
      ghanaianExperience: "",
      localizationDuration: "",
      startDate: "",
      endDate: "",
      remarks: "",
    }
  ]);
  const [trainingRequirements, setTrainingRequirements] = useState<TrainingRequirement[]>([
    {
      id: "1",
      expatName: "",
      successorName: "",
      skillsRequired: "",
      trainingCertifications: "",
      kpis: "",
      remarks: "",
    }
  ]);

  const addSuccessionPair = () => {
    setSuccessionPairs([...successionPairs, {
      id: Date.now().toString(),
      expatName: "",
      expatPosition: "",
      expatQualifications: "",
      expatExperience: "",
      ghanaianName: "",
      ghanaianPosition: "",
      ghanaianQualifications: "",
      ghanaianExperience: "",
      localizationDuration: "",
      startDate: "",
      endDate: "",
      remarks: "",
    }]);
  };

  const removeSuccessionPair = (id: string) => {
    setSuccessionPairs(successionPairs.filter((p) => p.id !== id));
  };

  const updateSuccessionPair = (id: string, field: keyof SuccessionPair, value: string) => {
    setSuccessionPairs(successionPairs.map((p) => p.id === id ? { ...p, [field]: value } : p));
  };

  const addTrainingRequirement = () => {
    setTrainingRequirements([...trainingRequirements, {
      id: Date.now().toString(),
      expatName: "",
      successorName: "",
      skillsRequired: "",
      trainingCertifications: "",
      kpis: "",
      remarks: "",
    }]);
  };

  const removeTrainingRequirement = (id: string) => {
    setTrainingRequirements(trainingRequirements.filter((t) => t.id !== id));
  };

  const updateTrainingRequirement = (id: string, field: keyof TrainingRequirement, value: string) => {
    setTrainingRequirements(trainingRequirements.map((t) => t.id === id ? { ...t, [field]: value } : t));
  };

  return (
    <div className="space-y-8">
      {/* File Upload */}
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">Succession/Localization Strategy Document</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
            <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-sm font-medium mb-1">Upload comprehensive succession strategy document</p>
            <p className="text-xs text-muted-foreground mb-4">PDF, DOC, DOCX (Max 10MB)</p>
            <Button variant="outline" size="sm">Choose File</Button>
          </div>
        </CardContent>
      </Card>

      {/* Succession Plan Pairs */}
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">1. Succession Plan Pairs</CardTitle>
          <p className="text-sm text-muted-foreground">
            Side-by-side comparison of Expatriate positions and their Ghanaian successors
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          {successionPairs.map((pair, index) => (
            <div key={pair.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-sm">Succession Pair #{index + 1}</h4>
                {successionPairs.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSuccessionPair(pair.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Expatriate Column */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <h5 className="font-semibold text-sm">Expatriate</h5>
                  <div>
                    <Label htmlFor={`exp-name-${pair.id}`}>Name *</Label>
                    <Input
                      id={`exp-name-${pair.id}`}
                      value={pair.expatName}
                      onChange={(e) => updateSuccessionPair(pair.id, "expatName", e.target.value)}
                      placeholder="Expatriate name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-position-${pair.id}`}>Position *</Label>
                    <Input
                      id={`exp-position-${pair.id}`}
                      value={pair.expatPosition}
                      onChange={(e) => updateSuccessionPair(pair.id, "expatPosition", e.target.value)}
                      placeholder="Current position"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-qual-${pair.id}`}>Qualifications/Certifications *</Label>
                    <Textarea
                      id={`exp-qual-${pair.id}`}
                      value={pair.expatQualifications}
                      onChange={(e) => updateSuccessionPair(pair.id, "expatQualifications", e.target.value)}
                      placeholder="Educational and professional qualifications"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`exp-exp-${pair.id}`}>Years of Experience *</Label>
                    <Input
                      id={`exp-exp-${pair.id}`}
                      type="number"
                      min="0"
                      value={pair.expatExperience}
                      onChange={(e) => updateSuccessionPair(pair.id, "expatExperience", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Ghanaian Successor Column */}
                <div className="space-y-4 p-4 border rounded-lg">
                  <h5 className="font-semibold text-sm">Ghanaian Successor</h5>
                  <div>
                    <Label htmlFor={`gha-name-${pair.id}`}>Name *</Label>
                    <Input
                      id={`gha-name-${pair.id}`}
                      value={pair.ghanaianName}
                      onChange={(e) => updateSuccessionPair(pair.id, "ghanaianName", e.target.value)}
                      placeholder="Successor name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gha-position-${pair.id}`}>Position *</Label>
                    <Input
                      id={`gha-position-${pair.id}`}
                      value={pair.ghanaianPosition}
                      onChange={(e) => updateSuccessionPair(pair.id, "ghanaianPosition", e.target.value)}
                      placeholder="Target position"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gha-qual-${pair.id}`}>Qualifications/Certifications *</Label>
                    <Textarea
                      id={`gha-qual-${pair.id}`}
                      value={pair.ghanaianQualifications}
                      onChange={(e) => updateSuccessionPair(pair.id, "ghanaianQualifications", e.target.value)}
                      placeholder="Educational and professional qualifications"
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`gha-exp-${pair.id}`}>Years of Experience *</Label>
                    <Input
                      id={`gha-exp-${pair.id}`}
                      type="number"
                      min="0"
                      value={pair.ghanaianExperience}
                      onChange={(e) => updateSuccessionPair(pair.id, "ghanaianExperience", e.target.value)}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>

              {/* Localization Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t">
                <div>
                  <Label htmlFor={`loc-duration-${pair.id}`}>Localization Duration *</Label>
                  <Input
                    id={`loc-duration-${pair.id}`}
                    value={pair.localizationDuration}
                    onChange={(e) => updateSuccessionPair(pair.id, "localizationDuration", e.target.value)}
                    placeholder="e.g., 12 months"
                  />
                </div>
                <div>
                  <Label htmlFor={`start-date-${pair.id}`}>Start Date *</Label>
                  <Input
                    id={`start-date-${pair.id}`}
                    type="date"
                    value={pair.startDate}
                    onChange={(e) => updateSuccessionPair(pair.id, "startDate", e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor={`end-date-${pair.id}`}>End Date *</Label>
                  <Input
                    id={`end-date-${pair.id}`}
                    type="date"
                    value={pair.endDate}
                    onChange={(e) => updateSuccessionPair(pair.id, "endDate", e.target.value)}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor={`remarks-${pair.id}`}>Remarks</Label>
                <Textarea
                  id={`remarks-${pair.id}`}
                  value={pair.remarks}
                  onChange={(e) => updateSuccessionPair(pair.id, "remarks", e.target.value)}
                  placeholder="Additional notes about the succession plan"
                  rows={2}
                />
              </div>
            </div>
          ))}

          <Button onClick={addSuccessionPair} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Succession Pair
          </Button>
        </CardContent>
      </Card>

      {/* Training Requirements */}
      <Card>
        <CardHeader className="bg-muted">
          <CardTitle className="text-base">2. Specific Training Requirements</CardTitle>
          <p className="text-sm text-muted-foreground">
            Training needs for each succession pair
          </p>
        </CardHeader>
        <CardContent className="p-6 space-y-4">
          {trainingRequirements.map((req, index) => (
            <div key={req.id} className="p-4 border rounded-lg space-y-4">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-sm">Training Requirement #{index + 1}</h4>
                {trainingRequirements.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTrainingRequirement(req.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`req-exp-${req.id}`}>Expatriate Name *</Label>
                  <Input
                    id={`req-exp-${req.id}`}
                    value={req.expatName}
                    onChange={(e) => updateTrainingRequirement(req.id, "expatName", e.target.value)}
                    placeholder="Name of expatriate"
                  />
                </div>
                <div>
                  <Label htmlFor={`req-suc-${req.id}`}>Successor Name *</Label>
                  <Input
                    id={`req-suc-${req.id}`}
                    value={req.successorName}
                    onChange={(e) => updateTrainingRequirement(req.id, "successorName", e.target.value)}
                    placeholder="Name of Ghanaian successor"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`req-skills-${req.id}`}>Skills Required *</Label>
                  <Textarea
                    id={`req-skills-${req.id}`}
                    value={req.skillsRequired}
                    onChange={(e) => updateTrainingRequirement(req.id, "skillsRequired", e.target.value)}
                    placeholder="Skills that need to be developed"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`req-training-${req.id}`}>Training/Certifications *</Label>
                  <Textarea
                    id={`req-training-${req.id}`}
                    value={req.trainingCertifications}
                    onChange={(e) => updateTrainingRequirement(req.id, "trainingCertifications", e.target.value)}
                    placeholder="Required training programs and certifications"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`req-kpis-${req.id}`}>Key Performance Indicators *</Label>
                  <Textarea
                    id={`req-kpis-${req.id}`}
                    value={req.kpis}
                    onChange={(e) => updateTrainingRequirement(req.id, "kpis", e.target.value)}
                    placeholder="Measurable KPIs for succession success"
                    rows={2}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor={`req-remarks-${req.id}`}>Remarks</Label>
                  <Textarea
                    id={`req-remarks-${req.id}`}
                    value={req.remarks}
                    onChange={(e) => updateTrainingRequirement(req.id, "remarks", e.target.value)}
                    placeholder="Additional notes"
                    rows={2}
                  />
                </div>
              </div>
            </div>
          ))}

          <Button onClick={addTrainingRequirement} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Another Training Requirement
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
