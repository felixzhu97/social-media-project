"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // 水合时防止客户端/服务器不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkTheme =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
            className={`rounded-full ${isDarkTheme ? "text-white hover:bg-gray-800" : "text-black hover:bg-gray-100"}`}
          >
            {isDarkTheme ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            <span className="sr-only">切换主题</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>切换{isDarkTheme ? "明亮" : "暗黑"}主题</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
