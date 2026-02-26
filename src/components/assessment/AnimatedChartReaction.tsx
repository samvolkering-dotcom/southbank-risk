"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { QuestionOption } from "@/lib/types";

interface AnimatedChartReactionProps {
  chartData: { month: string; value: number }[];
  options: QuestionOption[];
  selected: number | undefined;
  onSelect: (value: number) => void;
}

export function AnimatedChartReaction({
  chartData,
  options,
  selected,
  onSelect,
}: AnimatedChartReactionProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [visiblePoints, setVisiblePoints] = useState(0);

  const maxValue = Math.max(...chartData.map((d) => d.value));
  const minValue = Math.min(...chartData.map((d) => d.value));
  const range = maxValue - minValue;

  useEffect(() => {
    const interval = setInterval(() => {
      setVisiblePoints((prev) => {
        if (prev >= chartData.length) {
          clearInterval(interval);
          setAnimationComplete(true);
          return prev;
        }
        return prev + 1;
      });
    }, 400);
    return () => clearInterval(interval);
  }, [chartData.length]);

  const chartWidth = 500;
  const chartHeight = 200;
  const padding = 40;
  const plotWidth = chartWidth - padding * 2;
  const plotHeight = chartHeight - padding * 2;

  const points = chartData.slice(0, visiblePoints).map((d, i) => ({
    x: padding + (i / (chartData.length - 1)) * plotWidth,
    y: padding + plotHeight - ((d.value - minValue) / range) * plotHeight,
    value: d.value,
    month: d.month,
  }));

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const lastPoint = points[points.length - 1];
  const isDown =
    points.length >= 2 && points[points.length - 1].value < points[0].value;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Animated Chart */}
      <motion.div
        className="glass-card rounded-2xl p-6 mb-6 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-[var(--brand-text-muted)]">
            Portfolio Value
          </span>
          {lastPoint && (
            <motion.span
              key={lastPoint.value}
              className={`text-lg font-bold ${isDown ? "text-red-400" : "text-green-400"}`}
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              £{lastPoint.value.toLocaleString()}
            </motion.span>
          )}
        </div>

        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
        >
          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((pct) => (
            <line
              key={pct}
              x1={padding}
              y1={padding + plotHeight * (1 - pct)}
              x2={chartWidth - padding}
              y2={padding + plotHeight * (1 - pct)}
              stroke="var(--brand-border)"
              strokeWidth={0.5}
            />
          ))}

          {/* Line path */}
          {points.length > 1 && (
            <motion.path
              d={pathD}
              fill="none"
              stroke={isDown ? "#EF4444" : "#22C55E"}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.3 }}
            />
          )}

          {/* Points */}
          {points.map((p, i) => (
            <motion.circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={4}
              fill={
                i === points.length - 1 && isDown
                  ? "#EF4444"
                  : i === points.length - 1
                    ? "#22C55E"
                    : "var(--brand-accent)"
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            />
          ))}

          {/* Month labels */}
          {chartData.map((d, i) => (
            <text
              key={d.month}
              x={padding + (i / (chartData.length - 1)) * plotWidth}
              y={chartHeight - 8}
              textAnchor="middle"
              className="text-[10px] fill-[var(--brand-text-muted)]"
            >
              {d.month}
            </text>
          ))}
        </svg>

        {/* Crash indicator */}
        {isDown && animationComplete && (
          <motion.div
            className="flex items-center gap-2 mt-2 text-red-400"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="text-xl">📉</span>
            <span className="text-sm font-medium">
              Portfolio down{" "}
              {Math.round(
                ((chartData[0].value - chartData[chartData.length - 1].value) /
                  chartData[0].value) *
                  100
              )}
              %
            </span>
          </motion.div>
        )}
      </motion.div>

      {/* Reaction Options */}
      {animationComplete && (
        <motion.div
          className="grid grid-cols-2 gap-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {options.map((opt) => {
            const isSelected = selected === opt.value;
            return (
              <motion.button
                key={opt.id}
                onClick={() => onSelect(opt.value)}
                className={`
                  p-4 rounded-xl border text-left transition-colors
                  ${isSelected
                    ? "border-[var(--brand-accent)] bg-[var(--brand-accent-dim)]"
                    : "border-[var(--brand-border)] bg-[var(--brand-bg-card)] hover:border-[var(--brand-accent)]"
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="text-2xl">{opt.icon}</span>
                <p
                  className={`font-medium text-sm mt-2 ${
                    isSelected
                      ? "text-[var(--brand-accent)]"
                      : "text-[var(--brand-text-primary)]"
                  }`}
                >
                  {opt.label}
                </p>
                <p className="text-xs text-[var(--brand-text-muted)] mt-1">
                  {opt.description}
                </p>
              </motion.button>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}
