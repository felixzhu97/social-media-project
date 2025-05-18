"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import {
  Heart,
  Search,
  PlusSquare,
  Home,
  MessageCircle,
  Bookmark,
  MoreHorizontal,
  Compass,
  Film,
  Bell,
  Send,
  Menu,
} from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import PostSkeleton from "@/components/post-skeleton"
import { posts as initialPosts, fetchMorePosts, type Post, users } from "@/lib/data"
import useInfiniteScroll from "@/hooks/use-infinite-scroll"
import { useTheme } from "next-themes"
import { MoreMenu } from "@/components/more-menu"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)

  // 使用自定义的无限滚动钩子
  const {
    data: posts,
    loading,
    hasMore,
    error,
  } = useInfiniteScroll<Post>({
    initialData: initialPosts,
    fetchMore: fetchMorePosts,
  })

  // 水合时防止客户端/服务器不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkTheme =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  // 查找每个帖子对应的用户
  const getUserForPost = (userId: string) => {
    return users.find((user) => user.id === userId)
  }

  // 推荐关注的用户
  const suggestedUsers = [
    {
      id: "101",
      username: "deyanayca",
      fullName: "Deyana",
      avatar: "/creative-profile.png",
      source: "creativilo",
    },
    {
      id: "102",
      username: "julia.zdobylak",
      fullName: "Julia",
      avatar: "/placeholder-q2wlr.png",
      source: "creativilo",
    },
    {
      id: "103",
      username: "rwish77",
      fullName: "Rachel",
      avatar: "/fashion-blogger.png",
      source: "creativilo",
    },
    {
      id: "104",
      username: "click_ux",
      fullName: "UX Designer",
      avatar: "/photographer.png",
      source: "creativilo",
    },
    {
      id: "105",
      username: "marisandovalbrown",
      fullName: "Marisa",
      avatar: "/vibrant-art-studio.png",
      source: "creativilo",
    },
  ]

  return (
    <div className={`flex min-h-screen ${isDarkTheme ? "bg-black text-white" : "bg-white text-black"}`}>
      {/* 左侧导航栏 */}
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
            className={`flex items-center gap-3 py-3 px-3 rounded-lg font-medium ${
              isDarkTheme
                ? "bg-gray-800 md:bg-transparent md:hover:bg-gray-800"
                : "bg-gray-100 md:bg-transparent md:hover:bg-gray-100"
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

      {/* 主要内容区域 */}
      <div className="flex flex-1 justify-center">
        {/* 中间内容区 - 调整了宽度和位置 */}
        <div className="w-full max-w-[470px] md:ml-[72px] lg:ml-[244px]">
          {/* 故事栏 */}
          <div className="flex overflow-x-auto gap-4 py-4 px-4 scrollbar-hide justify-center">
            {users.map((user) => (
              <div key={user.id} className="flex flex-col items-center gap-1 min-w-[66px]">
                <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-600">
                  <Avatar className={`h-16 w-16 border-2 ${isDarkTheme ? "border-black" : "border-white"}`}>
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.username}的故事`} />
                    <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                </div>
                <span className="text-xs truncate w-full text-center">{user.username}</span>
              </div>
            ))}
          </div>

          {/* 帖子流 */}
          <div className="space-y-6 px-0">
            {posts.map((post) => {
              const user = getUserForPost(post.userId)
              return (
                <div key={post.id} className={`border-b ${isDarkTheme ? "border-gray-800" : "border-gray-200"} pb-4`}>
                  {/* 帖子头部 */}
                  <div className="flex items-center p-3">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username || "用户"} />
                      <AvatarFallback>{user?.username?.substring(0, 2) || "用户"}</AvatarFallback>
                    </Avatar>
                    <div className="font-medium">{user?.username || `用户${post.userId}`}</div>
                    <div className={`${isDarkTheme ? "text-gray-500" : "text-gray-400"} mx-1`}>•</div>
                    <div className={`${isDarkTheme ? "text-gray-500" : "text-gray-400"} text-sm`}>{post.timestamp}</div>
                    <Button variant="ghost" size="icon" className="ml-auto">
                      <MoreHorizontal className="h-5 w-5" />
                    </Button>
                  </div>

                  {/* 帖子图片 */}
                  <div className="relative aspect-square">
                    <Image src={post.image || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
                  </div>

                  {/* 帖子操作栏 */}
                  <div className="p-3">
                    <div className="flex items-center gap-4 mb-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 ${isDarkTheme ? "text-white" : "text-black"}`}
                      >
                        <Heart className="h-6 w-6" />
                        <span className="sr-only">喜欢</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 ${isDarkTheme ? "text-white" : "text-black"}`}
                      >
                        <MessageCircle className="h-6 w-6" />
                        <span className="sr-only">评论</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`h-9 w-9 ${isDarkTheme ? "text-white" : "text-black"}`}
                      >
                        <Send className="h-6 w-6" />
                        <span className="sr-only">分享</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className={`ml-auto ${isDarkTheme ? "text-white" : "text-black"}`}
                      >
                        <Bookmark className="h-6 w-6" />
                        <span className="sr-only">保存</span>
                      </Button>
                    </div>

                    {/* 点赞数 */}
                    <div className="font-medium mb-1">{post.likes.toLocaleString()} 次赞</div>

                    {/* 帖子内容 */}
                    <div>
                      <span className="font-medium mr-2">{user?.username || `用户${post.userId}`}</span>
                      <span>{post.caption}</span>
                    </div>

                    {/* 评论 */}
                    <div className={`${isDarkTheme ? "text-gray-500" : "text-gray-500"} text-sm mt-1`}>
                      查看全部 {post.comments} 条评论
                    </div>

                    {/* 添加评论 */}
                    <div className={`mt-3 ${isDarkTheme ? "text-gray-500" : "text-gray-500"} text-sm`}>添加评论...</div>
                  </div>
                </div>
              )
            })}

            {/* 加载状态 */}
            {loading && (
              <>
                <PostSkeleton isDark={isDarkTheme} />
                <PostSkeleton isDark={isDarkTheme} />
              </>
            )}

            {/* 没有更多内容 */}
            {!hasMore && !loading && (
              <div className={`py-10 text-center ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
                你已经看完所有内容
              </div>
            )}

            {/* 错误状态 */}
            {error && <div className="py-10 text-center text-red-500">加载更多内容时出错，请重试</div>}
          </div>
        </div>

        {/* 右侧边栏 - 只在大屏幕上显示 */}
        <div className="hidden lg:block w-[320px] pl-8 pr-4 py-8 h-screen sticky top-0 overflow-y-auto">
          {/* 用户信息 */}
          <div className="flex items-center mb-6">
            <Avatar className="h-14 w-14 mr-4">
              <AvatarImage src="/abstract-profile.png" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">felixzhu</div>
              <div className={isDarkTheme ? "text-gray-500" : "text-gray-500"}>张三</div>
            </div>
            <Button
              variant="link"
              size="sm"
              className={isDarkTheme ? "ml-auto text-blue-500" : "ml-auto text-blue-500"}
            >
              切换
            </Button>
          </div>

          {/* 推荐关注 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className={isDarkTheme ? "text-gray-500 font-medium" : "text-gray-500 font-medium"}>为你推荐</span>
              <Button variant="link" size="sm" className={isDarkTheme ? "text-white" : "text-black"}>
                查看全部
              </Button>
            </div>

            <div className="space-y-3">
              {suggestedUsers.map((user) => (
                <div key={user.id} className="flex items-center">
                  <Avatar className="h-9 w-9 mr-3">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.username} />
                    <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{user.username}</div>
                    <div className={isDarkTheme ? "text-gray-500 text-xs" : "text-gray-500 text-xs"}>
                      粉丝：{user.source}
                    </div>
                  </div>
                  <Button variant="link" size="sm" className="text-blue-500">
                    关注
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* 页脚链接 */}
          <div className="mt-8 text-xs text-gray-500">
            <div className="flex flex-wrap gap-x-2 gap-y-1 mb-4">
              <Link href="#" className="hover:underline">
                关于
              </Link>
              •
              <Link href="#" className="hover:underline">
                帮助
              </Link>
              •
              <Link href="#" className="hover:underline">
                新闻中心
              </Link>
              •
              <Link href="#" className="hover:underline">
                API
              </Link>
              •
              <Link href="#" className="hover:underline">
                工作
              </Link>
              •
              <Link href="#" className="hover:underline">
                隐私政策
              </Link>
              •
              <Link href="#" className="hover:underline">
                条款
              </Link>
              •
              <Link href="#" className="hover:underline">
                地点
              </Link>
              •
              <Link href="#" className="hover:underline">
                语言
              </Link>
              •
              <Link href="#" className="hover:underline">
                Meta Verified
              </Link>
            </div>
            <div>© 2025 PHOTOGRAM</div>
          </div>
        </div>
      </div>
    </div>
  )
}
