"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

export function useAppTheme() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, systemTheme } = useTheme()

  // 水合时防止客户端/服务器不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  // 判断当前是否为暗色主题
  const isDarkTheme = mounted ? theme === "dark" || (theme === "system" && systemTheme === "dark") : false

  // 切换主题
  const toggleTheme = () => {
    if (mounted) {
      setTheme(isDarkTheme ? "light" : "dark")
    }
  }

  return {
    isDarkTheme,
    toggleTheme,
    theme,
    setTheme,
    mounted,
  }
}
