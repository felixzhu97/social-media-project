"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import Sidebar from "@/components/sidebar"

export default function ExplorePage() {
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

  // 生成探索页面的图片网格
  const exploreImages = Array.from({ length: 24 }).map((_, i) => ({
    id: `explore-${i + 1}`,
    image: `/photogram-post.png?height=300&width=300&query=explore post ${i + 1}`,
  }))

  return (
    <div className={`flex min-h-screen ${isDarkTheme ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* 左侧导航栏 */}
      <Sidebar />

      {/* 主要内容区域 */}
      <div className="flex-1 md:ml-[72px] lg:ml-[244px] p-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="sr-only">探索 Photogram</h1>

          {/* 探索图片网格 */}
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-1 md:gap-2">
            {exploreImages.map((item) => (
              <Link href={`/post/${item.id}`} key={item.id} className="relative aspect-square group">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={`探索内容 ${item.id}`}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200"></div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
