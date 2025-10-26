"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatusCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  delay?: number;
}

export function StatusCard({
  title,
  value,
  icon: Icon,
  color,
  delay = 0,
}: StatusCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ scale: 1.02, y: -4 }}
      className="h-full"
    >
      <Card className={cn("overflow-hidden h-full", color)}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-3">
            <div className="bg-white/20 p-3 rounded-lg">
              <Icon className="h-8 w-8 text-white" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-white/90 mb-2">{title}</h3>
          <p className="text-2xl font-bold text-white">{value}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
