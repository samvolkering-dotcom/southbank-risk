"use client";

import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { SliderConfig } from "@/lib/types";

interface VisualSliderProps {
  config: SliderConfig;
  selected: number | undefined;
  onSelect: (value: number) => void;
}

export function VisualSlider({ config, selected, onSelect }: VisualSliderProps) {
  const defaultValue = Math.round((config.min + config.max) / 2);
  const [sliderValue, setSliderValue] = useState(
    selected !== undefined
      ? findSliderValueFromScore(config, selected)
      : defaultValue
  );
  const [hasInteracted, setHasInteracted] = useState(selected !== undefined);

  function findSliderValueFromScore(cfg: SliderConfig, score: number): number {
    // Reverse-map: find slider value that produces this score
    for (let v = cfg.min; v <= cfg.max; v += cfg.step) {
      if (cfg.valueToScore(v) === score) return v;
    }
    return defaultValue;
  }

  useEffect(() => {
    if (hasInteracted) {
      onSelect(config.valueToScore(sliderValue));
    }
  }, [sliderValue, hasInteracted, config, onSelect]);

  const percentage = ((sliderValue - config.min) / (config.max - config.min)) * 100;
  const score = config.valueToScore(sliderValue);

  return (
    <motion.div
      className="w-full max-w-lg mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Display value */}
      <div className="text-center mb-8">
        <motion.p
          key={sliderValue}
          className="text-4xl font-bold gradient-text"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {config.formatValue(sliderValue)}
        </motion.p>
      </div>

      {/* Slider */}
      <div className="relative px-2">
        <input
          type="range"
          min={config.min}
          max={config.max}
          step={config.step}
          value={sliderValue}
          onChange={(e) => {
            setSliderValue(Number(e.target.value));
            setHasInteracted(true);
          }}
          className="w-full h-2 rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--brand-accent) 0%, var(--brand-accent) ${percentage}%, var(--brand-bg-card) ${percentage}%, var(--brand-bg-card) 100%)`,
          }}
          aria-label="Slider"
        />
        {/* Custom thumb indicator */}
        <div
          className="absolute top-0 -translate-y-8 pointer-events-none"
          style={{ left: `calc(${percentage}% - 12px + ${(50 - percentage) * 0.24}px)` }}
        >
          <div className="w-6 h-6 rounded-full bg-[var(--brand-accent)] gold-glow" />
        </div>
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-4 text-sm text-[var(--brand-text-muted)]">
        <span>{config.minLabel}</span>
        <span>{config.maxLabel}</span>
      </div>

      {/* Score indicator */}
      {hasInteracted && (
        <motion.div
          className="mt-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <span className="text-xs text-[var(--brand-text-muted)] uppercase tracking-widest">
            Risk score: {score.toFixed(1)} / 10
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
