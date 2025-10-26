"use client";

import { motion } from "framer-motion";
import { TrendingDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface PermitsCardProps {
  pending: number;
  active: number;
  expired: number;
  delay?: number;
}

export function PermitsCard({
  pending,
  active,
  expired,
  delay = 0,
}: PermitsCardProps) {
  const total = pending + active + expired;
  const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

  // Calculate percentages
  const pendingPercent = (pending / total) * 100;
  const activePercent = (active / total) * 100;
  const expiredPercent = (expired / total) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
    >
      <Card className="transition-colors hover:bg-muted/50">
        <CardContent className="p-6">
          <div className="grid grid-cols-12 gap-4 items-center">
            {/* Left side - Title and Value (4/12) */}
            <div className="col-span-4">
              <p className="text-sm font-medium text-muted-foreground">Permits</p>
              <h3 className="text-3xl font-bold mt-2">{total}</h3>
              <div className="flex items-center gap-1 mt-2 text-sm font-medium text-red-600">
                <TrendingDown className="h-4 w-4" />
                <span>5%</span>
              </div>
            </div>

            {/* Right side - Visualization (8/12) */}
            <div className="col-span-8">
              {/* Segmented bar */}
              <div
                className="h-3 bg-muted rounded-full overflow-hidden flex relative"
                onMouseLeave={() => setHoveredSegment(null)}
              >
                <div
                  className="h-full bg-yellow-500 transition-opacity cursor-pointer hover:opacity-80"
                  style={{ width: `${pendingPercent}%` }}
                  onMouseEnter={() => setHoveredSegment('pending')}
                />
                <div
                  className="h-full bg-green-500 transition-opacity cursor-pointer hover:opacity-80"
                  style={{ width: `${activePercent}%` }}
                  onMouseEnter={() => setHoveredSegment('active')}
                />
                <div
                  className="h-full bg-red-500 transition-opacity cursor-pointer hover:opacity-80"
                  style={{ width: `${expiredPercent}%` }}
                  onMouseEnter={() => setHoveredSegment('expired')}
                />
              </div>

              {/* Stable tooltip area - always takes space */}
              <div className="h-5 mt-2 flex items-center justify-center">
                <div className={cn(
                  "text-xs text-center text-muted-foreground transition-opacity",
                  hoveredSegment ? "opacity-100" : "opacity-0"
                )}>
                  {hoveredSegment === 'pending' && `Pending: ${pending}`}
                  {hoveredSegment === 'active' && `Active: ${active}`}
                  {hoveredSegment === 'expired' && `Expired: ${expired}`}
                  {!hoveredSegment && 'Hover to see details'}
                </div>
              </div>

              {/* Labels with dots */}
              <div className="flex justify-between items-center mt-1 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <span>Pending</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  <span>Active</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <span>Expired</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
