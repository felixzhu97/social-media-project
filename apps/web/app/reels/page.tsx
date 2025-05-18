"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Heart, MessageCircle, Send, MoreHorizontal, Music } from "lucide-react"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Sidebar from "@/components/sidebar"

export default function ReelsPage() {
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

  // 模拟Reels数据
  const reels = [
    {
      id: "1",
      user: {
        username: "user1",
        avatar: "/abstract-geometric-shapes.png?height=48&width=48&query=user1",
      },
      description: "这是一个很棒的Reel! #photogram #视频 #创意",
      music: "原创音乐 - user1",
      likes: "1.2k",
      comments: "156",
    },
    {
      id: "2",
      user: {
        username: "user2",
        avatar: "/abstract-geometric-shapes.png?height=48&width=48&query=user2",
      },
      description: "美丽的风景 #旅行 #photogram #视频",
      music: "流行歌曲 - 知名艺术家",
      likes: "3.5k",
      comments: "342",
    },
    {
      id: "3",
      user: {
        username: "user3",
        avatar: "/abstract-geometric-shapes.png?height=48&width=48&query=user3",
      },
      description: "学习新技能 #教程 #photogram #学习",
      music: "背景音乐 - user3",
      likes: "876",
      comments: "98",
    },
  ]

  return (
    <div className={`flex min-h-screen ${isDarkTheme ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* 左侧导航栏 */}
      <Sidebar />

      {/* 主要内容区域 */}
      <div className="flex-1 md:ml-[72px] lg:ml-[244px] flex justify-center">
        <div className="w-full max-w-[420px]">
          <h1 className="sr-only">Photogram Reels</h1>

          {/* Reels 列表 */}
          <div className="space-y-1">
            {reels.map((reel) => (
              <div
                key={reel.id}
                className="relative h-[calc(100vh-80px)] border-b border-gray-200 dark:border-gray-800"
              >
                {/* Reel 背景 */}
                <div className="absolute inset-0 bg-gray-900">
                  <Image
                    src={`/photogram-post.png?height=800&width=450&query=reel ${reel.id}`}
                    alt={`Reel by ${reel.user.username}`}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* 渐变叠加层 */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-70"></div>

                {/* 右侧操作按钮 */}
                <div className="absolute right-4 bottom-20 flex flex-col items-center gap-6">
                  <div className="flex flex-col items-center">
                    <Button variant="ghost" size="icon" className="text-white h-10 w-10">
                      <Heart className="h-7 w-7" />
                    </Button>
                    <span className="text-xs text-white">{reel.likes}</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <Button variant="ghost" size="icon" className="text-white h-10 w-10">
                      <MessageCircle className="h-7 w-7" />
                    </Button>
                    <span className="text-xs text-white">{reel.comments}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="text-white h-10 w-10">
                    <Send className="h-7 w-7" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-white h-10 w-10">
                    <MoreHorizontal className="h-7 w-7" />
                  </Button>
                </div>

                {/* 底部用户信息 */}
                <div className="absolute left-4 right-16 bottom-4 text-white">
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar className="h-8 w-8 border border-white">
                      <AvatarImage src={reel.user.avatar || "/placeholder.svg"} alt={reel.user.username} />
                      <AvatarFallback>{reel.user.username.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{reel.user.username}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="ml-2 h-7 text-xs border-white text-white hover:bg-white/20"
                    >
                      关注
                    </Button>
                  </div>
                  <p className="text-sm mb-2 line-clamp-2">{reel.description}</p>
                  <div className="flex items-center gap-2">
                    <Music className="h-3 w-3" />
                    <span className="text-xs">{reel.music}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
