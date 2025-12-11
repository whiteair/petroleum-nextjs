"use client";

import { useState } from "react";
import { AdminHeader } from "@/components/layout/admin-header";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Users,
  TrendingUp,
  Lightbulb,
  Cpu,
  Shield,
  Scale,
  DollarSign,
  CheckCircle2,
  Circle
} from "lucide-react";

// Section components (to be created)
import { SectionA } from "@/components/submissions/local-content-plan/section-a";
import { SectionB } from "@/components/submissions/local-content-plan/section-b";
import { SectionC } from "@/components/submissions/local-content-plan/section-c";
import { SectionD } from "@/components/submissions/local-content-plan/section-d";
import { SectionE } from "@/components/submissions/local-content-plan/section-e";
import { SectionF } from "@/components/submissions/local-content-plan/section-f";
import { SectionG } from "@/components/submissions/local-content-plan/section-g";

type SectionId = "A" | "B" | "C" | "D" | "E" | "F" | "G";

interface Section {
  id: SectionId;
  title: string;
  subtitle: string;
  icon: React.ElementType;
  regulation: string;
  component: React.ComponentType;
}

const sections: Section[] = [
  {
    id: "A",
    title: "Employment & Training",
    subtitle: "Employment and Training Sub Plan",
    icon: Users,
    regulation: "Regulation 17 & 19",
    component: SectionA,
  },
  {
    id: "B",
    title: "Succession Plan",
    subtitle: "Succession/Localization Strategy",
    icon: TrendingUp,
    regulation: "Regulation 18",
    component: SectionB,
  },
  {
    id: "C",
    title: "Research & Development",
    subtitle: "R&D Sub Plan",
    icon: Lightbulb,
    regulation: "Regulation 20-21",
    component: SectionC,
  },
  {
    id: "D",
    title: "Technology Transfer",
    subtitle: "Technology Transfer Programme",
    icon: Cpu,
    regulation: "Regulation 22-25",
    component: SectionD,
  },
  {
    id: "E",
    title: "Insurance Services",
    subtitle: "Insurance and Reinsurance",
    icon: Shield,
    regulation: "Regulation 27-28",
    component: SectionE,
  },
  {
    id: "F",
    title: "Legal Services",
    subtitle: "Legal Services Sub Plan",
    icon: Scale,
    regulation: "Regulation 29-30",
    component: SectionF,
  },
  {
    id: "G",
    title: "Financial Services",
    subtitle: "Financial Services Sub Plan",
    icon: DollarSign,
    regulation: "Regulation 29-30",
    component: SectionG,
  },
];

export default function LocalContentPlanPage() {
  const [activeSection, setActiveSection] = useState<SectionId>("A");
  const [completedSections, setCompletedSections] = useState<Set<SectionId>>(new Set());

  const currentSection = sections.find((s) => s.id === activeSection);
  const ActiveComponent = currentSection?.component;

  const handleSectionComplete = (sectionId: SectionId) => {
    setCompletedSections((prev) => new Set(prev).add(sectionId));
  };

  const handleNextSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex < sections.length - 1) {
      setActiveSection(sections[currentIndex + 1].id);
    }
  };

  const handlePreviousSection = () => {
    const currentIndex = sections.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      setActiveSection(sections[currentIndex - 1].id);
    }
  };

  const isFirstSection = activeSection === "A";
  const isLastSection = activeSection === "G";

  return (
    <>
      <AdminHeader title="Local Content Plan" />
      <div className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Vertical Navigation Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-base mb-4 pb-3 border-b">Local Content Plan Form</h3>
                <div className="space-y-1">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    const isActive = activeSection === section.id;
                    const isCompleted = completedSections.has(section.id);

                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={cn(
                          "w-full flex items-start gap-3 p-3 rounded-lg text-left transition-all",
                          isActive
                            ? "bg-primary text-primary-foreground shadow-sm"
                            : "hover:bg-muted text-muted-foreground hover:text-foreground"
                        )}
                      >
                        <div className="flex-shrink-0 mt-0.5">
                          {isCompleted ? (
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                          ) : (
                            <Circle className={cn("h-5 w-5", isActive && "text-primary-foreground")} />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4 flex-shrink-0" />
                            <p className="font-medium text-sm line-clamp-2">{section.title}</p>
                          </div>
                          <p className="text-xs mt-0.5 opacity-80">Section {section.id}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Progress Indicator */}
                <div className="mt-6 pt-4 border-t">
                  <div className="text-xs text-muted-foreground mb-2">
                    Progress: {completedSections.size} / {sections.length} sections
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(completedSections.size / sections.length) * 100}%` }}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-4">
            <Card>
              <CardContent className="p-6">
                {/* Section Header */}
                <div className="mb-6 pb-6 border-b">
                  <div className="flex items-center gap-3 mb-2">
                    {currentSection && <currentSection.icon className="h-6 w-6 text-primary" />}
                    <h2 className="text-2xl font-semibold">
                      Section {activeSection}: {currentSection?.title}
                    </h2>
                  </div>
                  <p className="text-muted-foreground text-sm">{currentSection?.subtitle}</p>
                  <p className="text-xs text-muted-foreground mt-1">{currentSection?.regulation}</p>
                </div>

                {/* Dynamic Section Content */}
                <div className="mb-6">
                  {ActiveComponent && <ActiveComponent />}
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center justify-between pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handlePreviousSection}
                    disabled={isFirstSection}
                  >
                    Previous Section
                  </Button>

                  <div className="flex gap-2">
                    <Button variant="outline">Save Draft</Button>
                    {isLastSection ? (
                      <Button onClick={() => handleSectionComplete(activeSection)}>
                        Submit Form
                      </Button>
                    ) : (
                      <Button onClick={handleNextSection}>
                        Next Section
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
