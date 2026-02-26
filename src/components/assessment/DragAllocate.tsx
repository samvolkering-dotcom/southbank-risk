"use client";

import { useState, useCallback, useEffect } from "react";
import { motion } from "motion/react";
import { AllocateConfig } from "@/lib/types";

interface DragAllocateProps {
  config: AllocateConfig;
  selected: number | undefined;
  onSelect: (value: number) => void;
}

export function DragAllocate({ config, selected, onSelect }: DragAllocateProps) {
  const { categories } = config;
  const count = categories.length;
  const defaultAlloc = Math.floor(100 / count);
  const remainder = 100 - defaultAlloc * count;

  const [allocations, setAllocations] = useState<Record<string, number>>(() => {
    const allocs: Record<string, number> = {};
    categories.forEach((cat, i) => {
      allocs[cat.id] = defaultAlloc + (i === 0 ? remainder : 0);
    });
    return allocs;
  });

  const total = Object.values(allocations).reduce((a, b) => a + b, 0);

  const handleChange = useCallback(
    (id: string, newValue: number) => {
      const old = allocations[id];
      const diff = newValue - old;
      const others = categories.filter((c) => c.id !== id);

      // Distribute the difference proportionally among other categories
      const othersTotal = others.reduce((s, c) => s + allocations[c.id], 0);

      const newAllocs = { ...allocations, [id]: newValue };

      if (othersTotal > 0) {
        let remaining = -diff;
        others.forEach((c, i) => {
          if (i === others.length - 1) {
            newAllocs[c.id] = Math.max(
              0,
              100 - Object.entries(newAllocs).reduce((s, [k, v]) => (k !== c.id ? s + v : s), 0)
            );
          } else {
            const proportion = allocations[c.id] / othersTotal;
            const change = Math.round(remaining * proportion);
            newAllocs[c.id] = Math.max(0, allocations[c.id] + change);
          }
        });
      }

      // Ensure total is exactly 100
      const newTotal = Object.values(newAllocs).reduce((a, b) => a + b, 0);
      if (newTotal !== 100) {
        const lastOther = others[others.length - 1];
        newAllocs[lastOther.id] = Math.max(0, newAllocs[lastOther.id] + (100 - newTotal));
      }

      setAllocations(newAllocs);
    },
    [allocations, categories]
  );

  useEffect(() => {
    if (total === 100) {
      const score = config.allocationToScore(allocations);
      onSelect(score);
    }
  }, [allocations, total, config, onSelect]);

  return (
    <motion.div
      className="w-full max-w-lg mx-auto space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Stacked bar visualization */}
      <div className="h-10 rounded-xl overflow-hidden flex">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            className="h-full flex items-center justify-center text-xs font-semibold"
            style={{ backgroundColor: cat.color, color: "#0B0F1A" }}
            animate={{ width: `${allocations[cat.id]}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {allocations[cat.id] >= 10 && `${allocations[cat.id]}%`}
          </motion.div>
        ))}
      </div>

      {/* Sliders */}
      {categories.map((cat) => (
        <div key={cat.id}>
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: cat.color }}
              />
              <span className="text-sm font-medium text-[var(--brand-text-primary)]">
                {cat.label}
              </span>
            </div>
            <span className="text-sm font-bold text-[var(--brand-text-primary)]">
              {allocations[cat.id]}%
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            step={5}
            value={allocations[cat.id]}
            onChange={(e) => handleChange(cat.id, Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, ${cat.color} 0%, ${cat.color} ${allocations[cat.id]}%, var(--brand-bg-card) ${allocations[cat.id]}%, var(--brand-bg-card) 100%)`,
            }}
            aria-label={`${cat.label} allocation`}
          />
          <p className="text-xs text-[var(--brand-text-muted)] mt-1">
            {cat.description}
          </p>
        </div>
      ))}

      {/* Total indicator */}
      <div className="text-center">
        <span
          className={`text-xs uppercase tracking-widest ${
            total === 100
              ? "text-[var(--brand-accent)]"
              : "text-red-400"
          }`}
        >
          Total: {total}%{total !== 100 && " (must equal 100%)"}
        </span>
      </div>
    </motion.div>
  );
}
