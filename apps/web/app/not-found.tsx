"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"

export default function NotFound() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()

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
    <div className={`flex min-h-screen ${isDarkTheme ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* 左侧导航栏 */}
      <Sidebar />

      {/* 主要内容区域 */}
      <div className="flex flex-1 justify-center items-center">
        <div className="flex flex-col items-center justify-center max-w-md px-4 text-center">
          <div
            className={`w-20 h-20 rounded-full ${isDarkTheme ? "bg-gray-800" : "bg-gray-100"} flex items-center justify-center mb-6`}
          >
            <AlertCircle className="h-10 w-10 text-gray-500" />
          </div>
          <h1 className={`text-2xl font-semibold mb-2 ${isDarkTheme ? "text-white" : "text-black"}`}>
            Page isn't available
          </h1>
          <p className={`text-sm mb-6 ${isDarkTheme ? "text-gray-400" : "text-gray-600"}`}>
            The link may be broken, or the profile may have been removed.
          </p>
          <Button asChild className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-lg">
            <Link href="/">See more on Photogram</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
