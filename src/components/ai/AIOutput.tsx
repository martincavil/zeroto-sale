"use client"

import ReactMarkdown from "react-markdown"
import { cn } from "@/lib/utils"

interface AIOutputProps {
  output: string
  loading: boolean
  done: boolean
  error: string | null
  onGenerate: () => void
  label?: string
}

export function AIOutput({ output, loading, done, error, onGenerate, label }: AIOutputProps) {
  return (
    <div className="flex flex-col gap-4">
      {/* Generate button */}
      {!output && !loading && (
        <button
          onClick={onGenerate}
          className="w-full font-pixel text-[16px] px-4 py-4 bg-[#06b6d4] text-[#0a0a0f] hover:bg-[#0891b2] transition-colors pixel-border-accent"
        >
          ✨ GENERATE WITH AI →
        </button>
      )}

      {/* Loading state */}
      {loading && !output && (
        <div className="flex items-center gap-3 font-mono text-sm text-[#8b8ba8] py-4">
          <span className="animate-blink text-[#06b6d4]">█</span>
          <span>Generating {label ?? "output"}...</span>
        </div>
      )}

      {/* Streaming output */}
      {output && (
        <div
          className={cn(
            "pixel-border bg-[#0d0d14] p-5 overflow-auto max-h-[600px]",
            loading && "border-[#06b6d4]"
          )}
        >
          {loading && (
            <div className="flex items-center gap-2 mb-4 font-pixel text-[13px] text-[#06b6d4]">
              <span className="animate-blink">█</span> GENERATING...
            </div>
          )}

          <div className="prose prose-invert prose-sm max-w-none ai-output">
            <ReactMarkdown>{output}</ReactMarkdown>
          </div>

          {loading && (
            <span className="inline-block w-2 h-4 bg-[#e8e8f0] animate-blink ml-1" />
          )}
        </div>
      )}

      {/* Done: regenerate button */}
      {done && !loading && (
        <button
          onClick={onGenerate}
          className="font-mono text-sm text-[#8b8ba8] hover:text-[#c4c4d4] transition-colors text-center"
        >
          ↻ Regenerate
        </button>
      )}

      {/* Error */}
      {error && (
        <p className="font-mono text-sm text-[#ef4444]">Error: {error}</p>
      )}
    </div>
  )
}
