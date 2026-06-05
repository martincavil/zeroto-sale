"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { AIOutput } from "@/components/ai/AIOutput";
import { useAIGenerate } from "@/hooks/useAIGenerate";
import type { Step } from "@/types";

interface StepCardProps {
  step: Step;
  isActive: boolean;
  isCompleted: boolean;
  isLocked: boolean;
  projectId: string;
  completedTasks: string[];
  savedOutput?: string;
  onTaskToggle: (taskId: string) => void;
  onStepComplete: () => void;
}

export function StepCard({
  step,
  isActive,
  isCompleted,
  isLocked,
  projectId,
  completedTasks,
  savedOutput,
  onTaskToggle,
  onStepComplete,
}: StepCardProps) {
  const [expanded, setExpanded] = useState(isActive);
  const prevCompleted = useRef(isCompleted);
  const prevActive = useRef(isActive);

  // Close 2s after step is completed
  useEffect(() => {
    if (!prevCompleted.current && isCompleted) {
      const t = setTimeout(() => setExpanded(false), 2000);
      return () => clearTimeout(t);
    }
    prevCompleted.current = isCompleted;
  }, [isCompleted]);

  // Open when this step becomes the active one
  useEffect(() => {
    if (!prevActive.current && isActive) {
      const t = setTimeout(() => setExpanded(true), 2200);
      return () => clearTimeout(t);
    }
    prevActive.current = isActive;
  }, [isActive]);
  const { output, loading, done, error, generate } = useAIGenerate({
    step: step.id,
    projectId,
    savedOutput,
  });

  const allTasksDone = step.tasks.every((t) => completedTasks.includes(t.id));

  return (
    <div
      className={cn(
        "pixel-border flex flex-col transition-all",
        isCompleted && "bg-[#0d1f17] border-[#10b981]",
        isActive && "bg-[#12121a] border-[#7c3aed]",
        isActive && "shadow-glow",
        isLocked && "bg-[#0a0a0f] opacity-50",
      )}
    >
      {/* Header */}
      <button
        onClick={() => !isLocked && setExpanded(!expanded)}
        className="p-4 flex items-center justify-between w-full text-left"
        disabled={isLocked}
      >
        <div className="flex items-center gap-3">
          <span
            className={cn(
              "font-pixel text-[16px] w-8 shrink-0",
              isCompleted && "text-[#10b981]",
              isActive && "text-[#7c3aed]",
              isLocked && "text-[#8b8ba8]",
            )}
          >
            {isCompleted ? "✓" : isLocked ? "🔒" : `L${step.id}`}
          </span>
          <h3
            className={cn(
              "font-pixel text-[16px] leading-loose",
              isLocked ? "text-[#8b8ba8]" : "text-[#e8e8f0]",
            )}
          >
            {step.title}
          </h3>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-pixel text-[13px] text-[#fbbf24]">
            +{step.xpReward} XP
          </span>
          {!isLocked && (
            <span className="font-mono text-sm text-[#8b8ba8]">
              {expanded ? "▲" : "▼"}
            </span>
          )}
        </div>
      </button>

      {/* Expanded */}
      {expanded && !isLocked && (
        <div className="px-4 pb-4 flex flex-col gap-5 border-t border-[#1e1e2e]">
          <p className="font-mono text-sm text-[#c4c4d4] pt-4">
            {step.description}
          </p>

          {/* Tasks */}
          <div className="flex flex-col gap-2">
            <span className="font-pixel text-[13px] text-[#8b8ba8]">
              CHECKLIST
            </span>
            {step.tasks.map((task) => {
              const taskDone = completedTasks.includes(task.id);
              return (
                <button
                  key={task.id}
                  onClick={() => !isCompleted && onTaskToggle(task.id)}
                  className="flex items-center gap-3 text-left group"
                >
                  <span
                    className={cn(
                      "font-pixel text-[16px] mt-0.5 transition-colors shrink-0",
                      taskDone
                        ? "text-[#10b981]"
                        : "text-[#8b8ba8] group-hover:text-[#7c3aed]",
                    )}
                  >
                    {taskDone ? "✓" : "□"}
                  </span>
                  <span
                    className={cn(
                      "font-mono text-sm transition-colors",
                      taskDone
                        ? "text-[#8b8ba8] line-through"
                        : "text-[#c4c4d4] group-hover:text-[#e8e8f0]",
                    )}
                  >
                    {task.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Affiliate links */}
          {step.affiliates.length > 0 && (
            <div className="flex flex-col gap-2">
              <span className="font-pixel text-[13px] text-[#8b8ba8]">
                TOOLS FOR THIS STEP
              </span>
              <div className="flex flex-wrap gap-2">
                {step.affiliates.map((aff) => (
                  <a
                    key={aff.url}
                    href={aff.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 pixel-border bg-[#0a0a0f] px-3 py-2 hover:border-[#06b6d4] transition-colors group"
                  >
                    <span className="font-mono text-sm text-[#c4c4d4] group-hover:text-[#e8e8f0]">
                      {aff.label}
                    </span>
                    {aff.note && (
                      <span className="font-pixel text-[13px] text-[#8b8ba8]">
                        {aff.note}
                      </span>
                    )}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* AI Output */}
          <div className="flex flex-col gap-3 border-t border-[#1e1e2e] pt-4">
            <div className="flex items-center justify-between">
              <span className="font-pixel text-[13px] text-[#06b6d4]">
                ✨ AI OUTPUT
              </span>
              <span className="font-mono text-[10px] text-[#8b8ba8]">
                {step.aiOutput}
              </span>
            </div>
            <AIOutput
              output={output}
              loading={loading}
              done={done}
              error={error}
              onGenerate={generate}
              label={step.aiOutput}
              isSaved={!!savedOutput && output === savedOutput}
            />
          </div>

          {/* Complete step */}
          {!isCompleted && allTasksDone && (
            <button
              onClick={onStepComplete}
              className="w-full font-pixel text-[16px] px-4 py-4 bg-[#10b981] text-[#0a0a0f] hover:bg-[#059669] transition-colors pixel-border"
              style={{
                borderColor: "#10b981",
                boxShadow: "4px 4px 0px rgba(16,185,129,0.3)",
              }}
            >
              COMPLETE STEP → +{step.xpReward} XP
            </button>
          )}
        </div>
      )}
    </div>
  );
}
