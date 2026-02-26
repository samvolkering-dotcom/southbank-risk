"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  ResponsiveContainer,
} from "recharts";
import { DimensionScore } from "@/lib/types";

interface DimensionRadarProps {
  dimensions: DimensionScore[];
  color: string;
}

export function DimensionRadar({ dimensions, color }: DimensionRadarProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const data = dimensions.map((d) => ({
    dimension: d.label.replace("Financial ", "").replace("Behavioural ", "").replace("Risk ", "").replace("Growth ", ""),
    value: animate ? d.score : 0,
    fullMark: 10,
  }));

  return (
    <motion.div
      className="glass-card rounded-3xl p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <h3 className="text-lg font-semibold text-[var(--brand-text-primary)] mb-4 text-center">
        Your Risk Dimensions
      </h3>
      <div className="w-full h-72">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={data} cx="50%" cy="50%" outerRadius="70%">
            <PolarGrid
              stroke="var(--brand-border)"
              gridType="polygon"
            />
            <PolarAngleAxis
              dataKey="dimension"
              tick={{
                fill: "var(--brand-text-secondary)",
                fontSize: 13,
                fontWeight: 500,
              }}
            />
            <Radar
              dataKey="value"
              stroke={color}
              fill={color}
              fillOpacity={0.2}
              strokeWidth={2}
              animationDuration={1200}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
