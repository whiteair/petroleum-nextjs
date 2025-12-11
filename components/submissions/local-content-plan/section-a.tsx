"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Employee {
  id: string;
  name: string;
  position: string;
  nationality: string;
  gender: string;
  jobDescription: string;
  requiredSkills: string;
}

interface ThirdPartyStaff {
  id: string;
  name: string;
  position: string;
  agency: string;
  nationality: string;
  gender: string;
  jobDescription: string;
  requiredSkills: string;
}

interface EmploymentCategory {
  managementGhanaianMale: number;
  managementGhanaianFemale: number;
  managementExpatMale: number;
  managementExpatFemale: number;
  technicalGhanaianMale: number;
  technicalGhanaianFemale: number;
  technicalExpatMale: number;
  technicalExpatFemale: number;
  otherGhanaianMale: number;
  otherGhanaianFemale: number;
  otherExpatMale: number;
  otherExpatFemale: number;
}

interface FunctionalDistribution {
  engineeringGhanaianMale: number;
  engineeringGhanaianFemale: number;
  engineeringExpatMale: number;
  engineeringExpatFemale: number;
  financeGhanaianMale: number;
  financeGhanaianFemale: number;
  financeExpatMale: number;
  financeExpatFemale: number;
  qhseGhanaianMale: number;
  qhseGhanaianFemale: number;
  qhseExpatMale: number;
  qhseExpatFemale: number;
  hrGhanaianMale: number;
  hrGhanaianFemale: number;
  hrExpatMale: number;
  hrExpatFemale: number;
  adminGhanaianMale: number;
  adminGhanaianFemale: number;
  adminExpatMale: number;
  adminExpatFemale: number;
  otherGhanaianMale: number;
  otherGhanaianFemale: number;
  otherExpatMale: number;
  otherExpatFemale: number;
}

interface Training {
  id: string;
  employeeName: string;
  position: string;
  trainingType: string;
  details: string;
  outcomes: string;
  dateFrom: string;
  dateTo: string;
  cost: string;
  remarks: string;
}

export function SectionA() {
  const [employees, setEmployees] = useState<Employee[]>([
    { id: "1", name: "", position: "", nationality: "Ghanaian", gender: "Male", jobDescription: "", requiredSkills: "" }
  ]);
  const [thirdPartyStaff, setThirdPartyStaff] = useState<ThirdPartyStaff[]>([
    { id: "1", name: "", position: "", agency: "", nationality: "Ghanaian", gender: "Male", jobDescription: "", requiredSkills: "" }
  ]);
  const [employmentCategory, setEmploymentCategory] = useState<EmploymentCategory>({
    managementGhanaianMale: 0,
    managementGhanaianFemale: 0,
    managementExpatMale: 0,
    managementExpatFemale: 0,
    technicalGhanaianMale: 0,
    technicalGhanaianFemale: 0,
    technicalExpatMale: 0,
    technicalExpatFemale: 0,
    otherGhanaianMale: 0,
    otherGhanaianFemale: 0,
    otherExpatMale: 0,
    otherExpatFemale: 0,
  });
  const [functionalDistribution, setFunctionalDistribution] = useState<FunctionalDistribution>({
    engineeringGhanaianMale: 0,
    engineeringGhanaianFemale: 0,
    engineeringExpatMale: 0,
    engineeringExpatFemale: 0,
    financeGhanaianMale: 0,
    financeGhanaianFemale: 0,
    financeExpatMale: 0,
    financeExpatFemale: 0,
    qhseGhanaianMale: 0,
    qhseGhanaianFemale: 0,
    qhseExpatMale: 0,
    qhseExpatFemale: 0,
    hrGhanaianMale: 0,
    hrGhanaianFemale: 0,
    hrExpatMale: 0,
    hrExpatFemale: 0,
    adminGhanaianMale: 0,
    adminGhanaianFemale: 0,
    adminExpatMale: 0,
    adminExpatFemale: 0,
    otherGhanaianMale: 0,
    otherGhanaianFemale: 0,
    otherExpatMale: 0,
    otherExpatFemale: 0,
  });
  const [ghanaianEmployees, setGhanaianEmployees] = useState("");
  const [expatEmployees, setExpatEmployees] = useState("");
  const [ghanaianExpenditure, setGhanaianExpenditure] = useState("");
  const [expatExpenditure, setExpatExpenditure] = useState("");
  const [trainings, setTrainings] = useState<Training[]>([
    { id: "1", employeeName: "", position: "", trainingType: "", details: "", outcomes: "", dateFrom: "", dateTo: "", cost: "", remarks: "" }
  ]);

  // Employee handlers
  const addEmployee = () => {
    setEmployees([...employees, {
      id: Date.now().toString(),
      name: "",
      position: "",
      nationality: "Ghanaian",
      gender: "Male",
      jobDescription: "",
      requiredSkills: ""
    }]);
  };

  const removeEmployee = (id: string) => {
    setEmployees(employees.filter((e) => e.id !== id));
  };

  const updateEmployee = (id: string, field: keyof Employee, value: string) => {
    setEmployees(employees.map((e) => e.id === id ? { ...e, [field]: value } : e));
  };

  // Third-party staff handlers
  const addThirdPartyStaff = () => {
    setThirdPartyStaff([...thirdPartyStaff, {
      id: Date.now().toString(),
      name: "",
      position: "",
      agency: "",
      nationality: "Ghanaian",
      gender: "Male",
      jobDescription: "",
      requiredSkills: ""
    }]);
  };

  const removeThirdPartyStaff = (id: string) => {
    setThirdPartyStaff(thirdPartyStaff.filter((s) => s.id !== id));
  };

  const updateThirdPartyStaff = (id: string, field: keyof ThirdPartyStaff, value: string) => {
    setThirdPartyStaff(thirdPartyStaff.map((s) => s.id === id ? { ...s, [field]: value } : s));
  };

  // Training handlers
  const addTraining = () => {
    setTrainings([...trainings, {
      id: Date.now().toString(),
      employeeName: "",
      position: "",
      trainingType: "",
      details: "",
      outcomes: "",
      dateFrom: "",
      dateTo: "",
      cost: "",
      remarks: ""
    }]);
  };

  const removeTraining = (id: string) => {
    setTrainings(trainings.filter((t) => t.id !== id));
  };

  const updateTraining = (id: string, field: keyof Training, value: string) => {
    setTrainings(trainings.map((t) => t.id === id ? { ...t, [field]: value } : t));
  };

  // Auto-calculation helpers
  const calculateCategoryTotals = () => {
    const ghanaianTotal = Object.entries(employmentCategory)
      .filter(([key]) => key.includes("Ghanaian"))
      .reduce((sum, [, val]) => sum + Number(val || 0), 0);

    const expatTotal = Object.entries(employmentCategory)
      .filter(([key]) => key.includes("Expat"))
      .reduce((sum, [, val]) => sum + Number(val || 0), 0);

    return { ghanaianTotal, expatTotal, grandTotal: ghanaianTotal + expatTotal };
  };

  const totals = calculateCategoryTotals();

  return (
    <div className="space-y-8">
      {/* A. Employment Sub Plan */}
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold mb-1">A. Employment Sub Plan</h3>
          <p className="text-sm text-muted-foreground">Direct employment information and staff details</p>
        </div>

        {/* 1. List of All Staff (Direct Employment) */}
        <Card>
          <CardHeader className="bg-muted">
            <CardTitle className="text-base">1. List of All Staff (Direct Employment)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {employees.map((employee, index) => (
              <div key={employee.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-sm">Employee #{index + 1}</h4>
                  {employees.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeEmployee(employee.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`emp-name-${employee.id}`}>Name *</Label>
                    <Input
                      id={`emp-name-${employee.id}`}
                      value={employee.name}
                      onChange={(e) => updateEmployee(employee.id, "name", e.target.value)}
                      placeholder="Employee name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`emp-position-${employee.id}`}>Position *</Label>
                    <Input
                      id={`emp-position-${employee.id}`}
                      value={employee.position}
                      onChange={(e) => updateEmployee(employee.id, "position", e.target.value)}
                      placeholder="Job position"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`emp-nationality-${employee.id}`}>Nationality *</Label>
                    <Select
                      value={employee.nationality}
                      onValueChange={(value) => updateEmployee(employee.id, "nationality", value)}
                    >
                      <SelectTrigger id={`emp-nationality-${employee.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ghanaian">Ghanaian</SelectItem>
                        <SelectItem value="Expatriate">Expatriate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`emp-gender-${employee.id}`}>Gender *</Label>
                    <Select
                      value={employee.gender}
                      onValueChange={(value) => updateEmployee(employee.id, "gender", value)}
                    >
                      <SelectTrigger id={`emp-gender-${employee.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`emp-job-desc-${employee.id}`}>Job Description *</Label>
                    <Textarea
                      id={`emp-job-desc-${employee.id}`}
                      value={employee.jobDescription}
                      onChange={(e) => updateEmployee(employee.id, "jobDescription", e.target.value)}
                      placeholder="Brief description of job responsibilities"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`emp-skills-${employee.id}`}>Required Expertise/Skills *</Label>
                    <Textarea
                      id={`emp-skills-${employee.id}`}
                      value={employee.requiredSkills}
                      onChange={(e) => updateEmployee(employee.id, "requiredSkills", e.target.value)}
                      placeholder="Skills and qualifications required"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addEmployee} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Employee
            </Button>
          </CardContent>
        </Card>

        {/* 2. Employment Category (Direct Employment) */}
        <Card>
          <CardHeader className="bg-muted">
            <CardTitle className="text-base">2. Employment Category (Direct Employment)</CardTitle>
            <p className="text-sm mt-2">
              <strong className="text-red-600">NOTE:</strong>{" "}
              <span className="text-muted-foreground">
                The Local Content LI requires that a contractor, subcontractor, licensee or other allied entity should employ only Ghanaians in{" "}
                <span className="text-red-600">Middle and Junior Level Positions</span>. Middle and Junior Positions for the LI includes foreman, supervisor, or any corresponding position designated as such.
              </span>
            </p>
          </CardHeader>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="border p-3 text-left font-semibold text-sm">Job Level</th>
                    <th className="border p-3 text-center font-semibold text-sm" colSpan={2}>Ghanaians</th>
                    <th className="border p-3 text-center font-semibold text-sm" colSpan={2}>Expatriates</th>
                    <th className="border p-3 text-center font-semibold text-sm">Total</th>
                  </tr>
                  <tr className="bg-muted/30">
                    <th className="border p-2"></th>
                    <th className="border p-2 text-xs font-medium">Male</th>
                    <th className="border p-2 text-xs font-medium">Female</th>
                    <th className="border p-2 text-xs font-medium">Male</th>
                    <th className="border p-2 text-xs font-medium">Female</th>
                    <th className="border p-2 text-xs font-medium"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-3 font-medium text-sm">Management</td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.managementGhanaianMale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, managementGhanaianMale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.managementGhanaianFemale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, managementGhanaianFemale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.managementExpatMale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, managementExpatMale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.managementExpatFemale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, managementExpatFemale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2 text-center font-semibold">
                      {employmentCategory.managementGhanaianMale + employmentCategory.managementGhanaianFemale + employmentCategory.managementExpatMale + employmentCategory.managementExpatFemale}
                    </td>
                  </tr>
                  <tr className="bg-muted/20">
                    <td className="border p-3 font-medium text-sm">Technical Core Staff</td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.technicalGhanaianMale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, technicalGhanaianMale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.technicalGhanaianFemale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, technicalGhanaianFemale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.technicalExpatMale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, technicalExpatMale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.technicalExpatFemale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, technicalExpatFemale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2 text-center font-semibold">
                      {employmentCategory.technicalGhanaianMale + employmentCategory.technicalGhanaianFemale + employmentCategory.technicalExpatMale + employmentCategory.technicalExpatFemale}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-medium text-sm">Other</td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.otherGhanaianMale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, otherGhanaianMale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.otherGhanaianFemale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, otherGhanaianFemale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.otherExpatMale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, otherExpatMale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        type="number"
                        min="0"
                        value={employmentCategory.otherExpatFemale}
                        onChange={(e) => setEmploymentCategory({ ...employmentCategory, otherExpatFemale: Number(e.target.value) })}
                        className="text-center"
                      />
                    </td>
                    <td className="border p-2 text-center font-semibold">
                      {employmentCategory.otherGhanaianMale + employmentCategory.otherGhanaianFemale + employmentCategory.otherExpatMale + employmentCategory.otherExpatFemale}
                    </td>
                  </tr>
                  <tr className="bg-primary/10 font-bold">
                    <td className="border p-3 text-sm">TOTAL</td>
                    <td className="border p-2 text-center">
                      {employmentCategory.managementGhanaianMale + employmentCategory.technicalGhanaianMale + employmentCategory.otherGhanaianMale}
                    </td>
                    <td className="border p-2 text-center">
                      {employmentCategory.managementGhanaianFemale + employmentCategory.technicalGhanaianFemale + employmentCategory.otherGhanaianFemale}
                    </td>
                    <td className="border p-2 text-center">
                      {employmentCategory.managementExpatMale + employmentCategory.technicalExpatMale + employmentCategory.otherExpatMale}
                    </td>
                    <td className="border p-2 text-center">
                      {employmentCategory.managementExpatFemale + employmentCategory.technicalExpatFemale + employmentCategory.otherExpatFemale}
                    </td>
                    <td className="border p-2 text-center">{totals.grandTotal}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 3. Functional Distribution (Direct Employment) */}
        <Card>
          <CardHeader className="bg-muted">
            <CardTitle className="text-base">3. Functional Distribution (Direct Employment)</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            {/* Engineering */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Engineering</h4>
              <div className="space-y-4 pl-4 border-l-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.engineeringGhanaianMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, engineeringGhanaianMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.engineeringGhanaianFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, engineeringGhanaianFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Ghanaians</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.engineeringGhanaianMale + functionalDistribution.engineeringGhanaianFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.engineeringExpatMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, engineeringExpatMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.engineeringExpatFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, engineeringExpatFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Expatriates</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.engineeringExpatMale + functionalDistribution.engineeringExpatFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Finance */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Finance</h4>
              <div className="space-y-4 pl-4 border-l-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.financeGhanaianMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, financeGhanaianMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.financeGhanaianFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, financeGhanaianFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Ghanaians</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.financeGhanaianMale + functionalDistribution.financeGhanaianFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.financeExpatMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, financeExpatMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.financeExpatFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, financeExpatFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Expatriates</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.financeExpatMale + functionalDistribution.financeExpatFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* QHSE */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">QHSE</h4>
              <div className="space-y-4 pl-4 border-l-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.qhseGhanaianMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, qhseGhanaianMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.qhseGhanaianFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, qhseGhanaianFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Ghanaians</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.qhseGhanaianMale + functionalDistribution.qhseGhanaianFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.qhseExpatMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, qhseExpatMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.qhseExpatFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, qhseExpatFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Expatriates</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.qhseExpatMale + functionalDistribution.qhseExpatFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* HR */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">HR</h4>
              <div className="space-y-4 pl-4 border-l-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.hrGhanaianMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, hrGhanaianMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.hrGhanaianFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, hrGhanaianFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Ghanaians</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.hrGhanaianMale + functionalDistribution.hrGhanaianFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.hrExpatMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, hrExpatMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.hrExpatFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, hrExpatFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Expatriates</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.hrExpatMale + functionalDistribution.hrExpatFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Admin */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Admin</h4>
              <div className="space-y-4 pl-4 border-l-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.adminGhanaianMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, adminGhanaianMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.adminGhanaianFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, adminGhanaianFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Ghanaians</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.adminGhanaianMale + functionalDistribution.adminGhanaianFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.adminExpatMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, adminExpatMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.adminExpatFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, adminExpatFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Expatriates</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.adminExpatMale + functionalDistribution.adminExpatFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Other */}
            <div className="space-y-4">
              <h4 className="font-semibold text-base">Other</h4>
              <div className="space-y-4 pl-4 border-l-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.otherGhanaianMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, otherGhanaianMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Ghanaians</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.otherGhanaianFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, otherGhanaianFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Ghanaians</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.otherGhanaianMale + functionalDistribution.otherGhanaianFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label>No. of Male Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.otherExpatMale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, otherExpatMale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>No. of Female Expatriates</Label>
                    <Input
                      type="number"
                      min="0"
                      value={functionalDistribution.otherExpatFemale}
                      onChange={(e) => setFunctionalDistribution({ ...functionalDistribution, otherExpatFemale: Number(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Total Expatriates</Label>
                    <Input
                      type="number"
                      disabled
                      value={functionalDistribution.otherExpatMale + functionalDistribution.otherExpatFemale}
                      className="bg-muted"
                    />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 4. Employment Expenditure */}
        <Card>
          <CardHeader className="bg-muted">
            <CardTitle className="text-base">4. Employment Expenditure (Direct Employment)</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Ghanaians</h4>
                <div>
                  <Label htmlFor="ghanaian-count">Total Number</Label>
                  <Input
                    id="ghanaian-count"
                    type="number"
                    min="0"
                    value={ghanaianEmployees}
                    onChange={(e) => setGhanaianEmployees(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="ghanaian-expenditure">Total Expenditure (USD)</Label>
                  <Input
                    id="ghanaian-expenditure"
                    type="number"
                    min="0"
                    value={ghanaianExpenditure}
                    onChange={(e) => setGhanaianExpenditure(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-medium text-sm">Expatriates</h4>
                <div>
                  <Label htmlFor="expat-count">Total Number</Label>
                  <Input
                    id="expat-count"
                    type="number"
                    min="0"
                    value={expatEmployees}
                    onChange={(e) => setExpatEmployees(e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div>
                  <Label htmlFor="expat-expenditure">Total Expenditure (USD)</Label>
                  <Input
                    id="expat-expenditure"
                    type="number"
                    min="0"
                    value={expatExpenditure}
                    onChange={(e) => setExpatExpenditure(e.target.value)}
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div className="md:col-span-2 p-4 bg-muted/50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Grand Total:</span>
                  <div className="text-right">
                    <div className="text-sm text-muted-foreground">
                      {Number(ghanaianEmployees || 0) + Number(expatEmployees || 0)} employees
                    </div>
                    <div className="text-lg font-bold">
                      ${(Number(ghanaianExpenditure || 0) + Number(expatExpenditure || 0)).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5. List of Third-Party Staff */}
        <Card>
          <CardHeader className="bg-muted">
            <CardTitle className="text-base">5. List of Third-Party Staff</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {thirdPartyStaff.map((staff, index) => (
              <div key={staff.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-sm">Third-Party Staff #{index + 1}</h4>
                  {thirdPartyStaff.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeThirdPartyStaff(staff.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`tp-name-${staff.id}`}>Name *</Label>
                    <Input
                      id={`tp-name-${staff.id}`}
                      value={staff.name}
                      onChange={(e) => updateThirdPartyStaff(staff.id, "name", e.target.value)}
                      placeholder="Staff name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tp-position-${staff.id}`}>Position *</Label>
                    <Input
                      id={`tp-position-${staff.id}`}
                      value={staff.position}
                      onChange={(e) => updateThirdPartyStaff(staff.id, "position", e.target.value)}
                      placeholder="Job position"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`tp-agency-${staff.id}`}>Agency/Company *</Label>
                    <Input
                      id={`tp-agency-${staff.id}`}
                      value={staff.agency}
                      onChange={(e) => updateThirdPartyStaff(staff.id, "agency", e.target.value)}
                      placeholder="Contracting agency or company name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tp-nationality-${staff.id}`}>Nationality *</Label>
                    <Select
                      value={staff.nationality}
                      onValueChange={(value) => updateThirdPartyStaff(staff.id, "nationality", value)}
                    >
                      <SelectTrigger id={`tp-nationality-${staff.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ghanaian">Ghanaian</SelectItem>
                        <SelectItem value="Expatriate">Expatriate</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`tp-gender-${staff.id}`}>Gender *</Label>
                    <Select
                      value={staff.gender}
                      onValueChange={(value) => updateThirdPartyStaff(staff.id, "gender", value)}
                    >
                      <SelectTrigger id={`tp-gender-${staff.id}`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`tp-job-desc-${staff.id}`}>Job Description *</Label>
                    <Textarea
                      id={`tp-job-desc-${staff.id}`}
                      value={staff.jobDescription}
                      onChange={(e) => updateThirdPartyStaff(staff.id, "jobDescription", e.target.value)}
                      placeholder="Brief description of job responsibilities"
                      rows={3}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`tp-skills-${staff.id}`}>Required Expertise/Skills *</Label>
                    <Textarea
                      id={`tp-skills-${staff.id}`}
                      value={staff.requiredSkills}
                      onChange={(e) => updateThirdPartyStaff(staff.id, "requiredSkills", e.target.value)}
                      placeholder="Skills and qualifications required"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addThirdPartyStaff} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Third-Party Staff
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* B. Training Sub Plan */}
      <div className="space-y-6 pt-8 border-t">
        <div>
          <h3 className="text-lg font-semibold mb-1">B. Training Sub Plan</h3>
          <p className="text-sm text-muted-foreground">
            Training types include: Secondment/Internship, Certification, Academic, Practical
          </p>
        </div>

        <Card>
          <CardHeader className="bg-muted">
            <CardTitle className="text-base">Training Records</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {trainings.map((training, index) => (
              <div key={training.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-sm">Training #{index + 1}</h4>
                  {trainings.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeTraining(training.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor={`tr-emp-name-${training.id}`}>Employee Name *</Label>
                    <Input
                      id={`tr-emp-name-${training.id}`}
                      value={training.employeeName}
                      onChange={(e) => updateTraining(training.id, "employeeName", e.target.value)}
                      placeholder="Employee name"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tr-position-${training.id}`}>Position *</Label>
                    <Input
                      id={`tr-position-${training.id}`}
                      value={training.position}
                      onChange={(e) => updateTraining(training.id, "position", e.target.value)}
                      placeholder="Job position"
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tr-type-${training.id}`}>Type of Training *</Label>
                    <Select
                      value={training.trainingType}
                      onValueChange={(value) => updateTraining(training.id, "trainingType", value)}
                    >
                      <SelectTrigger id={`tr-type-${training.id}`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Secondment/Internship">Secondment/Internship</SelectItem>
                        <SelectItem value="Certification">Certification</SelectItem>
                        <SelectItem value="Academic">Academic</SelectItem>
                        <SelectItem value="Practical">Practical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor={`tr-cost-${training.id}`}>Cost (USD) *</Label>
                    <Input
                      id={`tr-cost-${training.id}`}
                      type="number"
                      min="0"
                      value={training.cost}
                      onChange={(e) => updateTraining(training.id, "cost", e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`tr-details-${training.id}`}>Training Details *</Label>
                    <Textarea
                      id={`tr-details-${training.id}`}
                      value={training.details}
                      onChange={(e) => updateTraining(training.id, "details", e.target.value)}
                      placeholder="Description of the training program"
                      rows={2}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`tr-outcomes-${training.id}`}>Expected/Achieved Outcomes *</Label>
                    <Textarea
                      id={`tr-outcomes-${training.id}`}
                      value={training.outcomes}
                      onChange={(e) => updateTraining(training.id, "outcomes", e.target.value)}
                      placeholder="What skills or knowledge were gained"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tr-from-${training.id}`}>Duration From *</Label>
                    <Input
                      id={`tr-from-${training.id}`}
                      type="date"
                      value={training.dateFrom}
                      onChange={(e) => updateTraining(training.id, "dateFrom", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor={`tr-to-${training.id}`}>Duration To *</Label>
                    <Input
                      id={`tr-to-${training.id}`}
                      type="date"
                      value={training.dateTo}
                      onChange={(e) => updateTraining(training.id, "dateTo", e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor={`tr-remarks-${training.id}`}>Remarks</Label>
                    <Textarea
                      id={`tr-remarks-${training.id}`}
                      value={training.remarks}
                      onChange={(e) => updateTraining(training.id, "remarks", e.target.value)}
                      placeholder="Additional notes or comments"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            ))}

            <Button onClick={addTraining} variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Another Training
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
