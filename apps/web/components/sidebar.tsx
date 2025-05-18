"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Home, Search, Compass, Film, MessageCircle, Bell, PlusSquare, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MoreMenu } from "@/components/more-menu"

export default function Sidebar() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

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
    <div
      className={`w-[72px] md:w-[244px] ${isDarkTheme ? "border-gray-800" : "border-gray-200"} border-r fixed h-full flex flex-col py-8 px-3`}
    >
      <Link
        href="/"
        className={`text-2xl font-serif font-medium px-3 mb-10 hidden md:block ${isDarkTheme ? "text-white" : "text-black"}`}
      >
        Photogram
      </Link>
      <Link href="/" className="text-2xl font-serif font-medium px-3 mb-10 flex md:hidden justify-center">
        <svg
          aria-label="Photogram"
          className="_ab6-"
          color={isDarkTheme ? "rgb(245, 245, 245)" : "rgb(0, 0, 0)"}
          fill={isDarkTheme ? "rgb(245, 245, 245)" : "rgb(0, 0, 0)"}
          height="24"
          role="img"
          viewBox="0 0 24 24"
          width="24"
        >
          <path d="M12 2.982c2.937 0 3.285.011 4.445.064a6.087 6.087 0 0 1 2.042.379 3.408 3.408 0 0 1 1.265.823 3.408 3.408 0 0 1 .823 1.265 6.087 6.087 0 0 1 .379 2.042c.053 1.16.064 1.508.064 4.445s-.011 3.285-.064 4.445a6.087 6.087 0 0 1-.379 2.042 3.643 3.643 0 0 1-2.088 2.088 6.087 6.087 0 0 1-2.042.379c-1.16.053-1.508.064-4.445.064s-3.285-.011-4.445-.064a6.087 6.087 0 0 1-2.043-.379 3.408 3.408 0 0 1-1.264-.823 3.408 3.408 0 0 1-.823-1.265 6.087 6.087 0 0 1-.379-2.042c-.053-1.16-.064-1.508-.064-4.445s.011-3.285.064-4.445a6.087 6.087 0 0 1 .379-2.042 3.408 3.408 0 0 1 .823-1.265 3.408 3.408 0 0 1 1.265-.823 6.087 6.087 0 0 1 2.042-.379c1.16-.053 1.508-.064 4.445-.064M12 1c-2.987 0-3.362.013-4.535.066a8.074 8.074 0 0 0-2.67.511 5.392 5.392 0 0 0-1.949 1.27 5.392 5.392 0 0 0-1.269 1.948 8.074 8.074 0 0 0-.51 2.67C1.013 8.638 1 9.013 1 12s.013 3.362.066 4.535a8.074 8.074 0 0 0 .511 2.67 5.392 5.392 0 0 0 1.27 1.949 5.392 5.392 0 0 0 1.948 1.269 8.074 8.074 0 0 0 2.67.51C8.638 22.987 9.013 23 12 23s3.362-.013 4.535-.066a8.074 8.074 0 0 0 2.67-.511 5.625 5.625 0 0 0 3.218-3.218 8.074 8.074 0 0 0 .51-2.67C22.987 15.362 23 14.987 23 12s-.013-3.362-.066-4.535a8.074 8.074 0 0 0-.511-2.67 5.392 5.392 0 0 0-1.27-1.949 5.392 5.392 0 0 0-1.948-1.269 8.074 8.074 0 0 0-2.67-.51C15.362 1.013 14.987 1 12 1Zm0 5.351A5.649 5.649 0 1 0 17.649 12 5.649 5.649 0 0 0 12 6.351Zm0 9.316A3.667 3.667 0 1 1 15.667 12 3.667 3.667 0 0 1 12 15.667Zm5.872-10.859a1.32 1.32 0 1 0 1.32 1.32 1.32 1.32 0 0 0-1.32-1.32Z"></path>
        </svg>
      </Link>

      <nav className="flex-1 space-y-1">
        <Link
          href="/"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Home className="h-6 w-6" />
          <span className="hidden md:inline">首页</span>
        </Link>
        <Link
          href="/search"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Search className="h-6 w-6" />
          <span className="hidden md:inline">搜索</span>
        </Link>
        <Link
          href="/explore"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Compass className="h-6 w-6" />
          <span className="hidden md:inline">探索</span>
        </Link>
        <Link
          href="/reels"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Film className="h-6 w-6" />
          <span className="hidden md:inline">Reels</span>
        </Link>
        <Link
          href="/messages"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <MessageCircle className="h-6 w-6" />
          <span className="hidden md:inline">消息</span>
        </Link>
        <Link
          href="/notifications"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Bell className="h-6 w-6" />
          <span className="hidden md:inline">通知</span>
        </Link>
        <Link
          href="/create"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <PlusSquare className="h-6 w-6" />
          <span className="hidden md:inline">创建</span>
        </Link>
        <Link
          href="/profile"
          className={`flex items-center gap-3 py-3 px-3 rounded-lg ${
            isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
          }`}
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src="/abstract-profile.png" alt="用户头像" />
            <AvatarFallback>用户</AvatarFallback>
          </Avatar>
          <span className="hidden md:inline">主页</span>
        </Link>
      </nav>

      <Button
        variant="ghost"
        className={`mt-auto justify-start ${
          isDarkTheme ? "text-gray-300 hover:bg-gray-800" : "text-gray-700 hover:bg-gray-100"
        }`}
        onClick={() => setMoreMenuOpen(true)}
      >
        <Menu className="h-6 w-6 mr-3" />
        <span className="hidden md:inline">More</span>
      </Button>

      {/* 更多菜单 */}
      <MoreMenu isOpen={moreMenuOpen} onClose={() => setMoreMenuOpen(false)} />
    </div>
  )
}
