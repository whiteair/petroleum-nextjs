"use client";

import { UsersHeader } from "@/components/layout/users-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircle, Upload, X, FileText, Save, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewReportPage() {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent, saveAsDraft: boolean = false) => {
    e.preventDefault();
    // Handle form submission
    alert(saveAsDraft ? "Report saved as draft" : "Report submitted successfully");
    router.push("/users/reports");
  };

  return (
    <div>
      <UsersHeader title="Submit New Report" />

      <div className="p-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/users/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/users/reports">Reports</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>New Report</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-bold">Submit New Report</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Complete the report form and upload required documents
          </p>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950/20">
            <CardContent className="p-4">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-100">
                    Reporting Requirements
                  </p>
                  <p className="text-sm text-blue-800 dark:text-blue-200 mt-1">
                    Reports must be submitted by the end of each reporting period. All data must be accurate
                    and verifiable. Supporting documents should be in PDF format (max 10MB each).
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Report Form */}
        <form onSubmit={(e) => handleSubmit(e, false)}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Report Details */}
            <Card>
              <CardHeader>
                <CardTitle>Report Details</CardTitle>
                <CardDescription>Basic information about the report</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Report Title *</Label>
                    <Input
                      id="title"
                      placeholder="e.g., Q4 2024 Production Report"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Report Type *</Label>
                    <Select required>
                      <SelectTrigger id="type">
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="production">Production Report</SelectItem>
                        <SelectItem value="environmental">Environmental Compliance</SelectItem>
                        <SelectItem value="safety">Safety & Incidents</SelectItem>
                        <SelectItem value="financial">Financial Report</SelectItem>
                        <SelectItem value="operations">Operations Report</SelectItem>
                        <SelectItem value="local-content">Local Content Report</SelectItem>
                        <SelectItem value="quarterly">Quarterly Report</SelectItem>
                        <SelectItem value="annual">Annual Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reportingPeriod">Reporting Period *</Label>
                    <Select required>
                      <SelectTrigger id="reportingPeriod">
                        <SelectValue placeholder="Select period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="q1-2024">Q1 2024</SelectItem>
                        <SelectItem value="q2-2024">Q2 2024</SelectItem>
                        <SelectItem value="q3-2024">Q3 2024</SelectItem>
                        <SelectItem value="q4-2024">Q4 2024</SelectItem>
                        <SelectItem value="january-2024">January 2024</SelectItem>
                        <SelectItem value="february-2024">February 2024</SelectItem>
                        <SelectItem value="march-2024">March 2024</SelectItem>
                        <SelectItem value="custom">Custom Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="submissionDate">Submission Date *</Label>
                    <Input id="submissionDate" type="date" required defaultValue={new Date().toISOString().split('T')[0]} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary">Executive Summary *</Label>
                  <Textarea
                    id="summary"
                    placeholder="Provide a brief summary of the report..."
                    rows={4}
                    required
                  />
                </div>
              </CardContent>
            </Card>

            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Key Metrics</CardTitle>
                <CardDescription>Important figures and data points</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="productionVolume">Production Volume</Label>
                    <Input
                      id="productionVolume"
                      type="number"
                      placeholder="Barrels"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="operatingDays">Operating Days</Label>
                    <Input
                      id="operatingDays"
                      type="number"
                      placeholder="Days"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incidentCount">Safety Incidents</Label>
                    <Input
                      id="incidentCount"
                      type="number"
                      placeholder="Count"
                      defaultValue="0"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="localContentPercent">Local Content (%)</Label>
                    <Input
                      id="localContentPercent"
                      type="number"
                      placeholder="Percentage"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ghanaianEmployment">Ghanaian Employment (%)</Label>
                    <Input
                      id="ghanaianEmployment"
                      type="number"
                      placeholder="Percentage"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card>
              <CardHeader>
                <CardTitle>Detailed Information</CardTitle>
                <CardDescription>Additional report content and findings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="activities">Activities Undertaken</Label>
                  <Textarea
                    id="activities"
                    placeholder="Describe the key activities during this period..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="challenges">Challenges & Issues</Label>
                  <Textarea
                    id="challenges"
                    placeholder="Document any challenges or issues encountered..."
                    rows={4}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recommendations">Recommendations</Label>
                  <Textarea
                    id="recommendations"
                    placeholder="Provide recommendations and action items..."
                    rows={4}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Document Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents *</CardTitle>
                <CardDescription>
                  Upload report files and supporting documentation (PDF format, max 10MB each)
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <Input
                    type="file"
                    id="fileUpload"
                    className="hidden"
                    accept=".pdf,.xlsx,.xls,.doc,.docx"
                    multiple
                    onChange={handleFileUpload}
                  />
                  <Label
                    htmlFor="fileUpload"
                    className="cursor-pointer flex flex-col items-center gap-2"
                  >
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Click to upload files</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        PDF, Excel, or Word documents up to 10MB
                      </p>
                    </div>
                  </Label>
                </div>

                {files.length > 0 && (
                  <div className="space-y-2">
                    <Label>Uploaded Files</Label>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-blue-500" />
                            <div>
                              <p className="text-sm font-medium">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeFile(index)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Certification */}
            <Card>
              <CardHeader>
                <CardTitle>Certification</CardTitle>
                <CardDescription>Confirm the accuracy of the information provided</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 p-4 border rounded-lg bg-muted/50">
                  <input
                    type="checkbox"
                    id="certification"
                    className="mt-1"
                    required
                  />
                  <Label htmlFor="certification" className="text-sm cursor-pointer">
                    I certify that the information provided in this report is true, accurate, and complete
                    to the best of my knowledge. I understand that providing false information may result
                    in penalties under the petroleum regulations.
                  </Label>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="reporterName">Prepared By *</Label>
                    <Input
                      id="reporterName"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reporterTitle">Title/Position *</Label>
                    <Input
                      id="reporterTitle"
                      placeholder="Job title"
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Form Actions */}
            <div className="flex flex-col sm:flex-row gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/users/reports")}
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="secondary"
                onClick={(e) => handleSubmit(e, true)}
              >
                <Save className="mr-2 h-4 w-4" />
                Save as Draft
              </Button>
              <Button type="submit">
                <Send className="mr-2 h-4 w-4" />
                Submit Report
              </Button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
