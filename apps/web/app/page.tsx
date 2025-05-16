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
} from "lucide-react"
import Image from "next/image"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import PostSkeleton from "@/components/post-skeleton"
import { posts as initialPosts, fetchMorePosts, type Post, users } from "@/lib/data"
import useInfiniteScroll from "@/hooks/use-infinite-scroll"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

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

  // 查找每个帖子对应的用户
  const getUserForPost = (userId: string) => {
    return users.find((user) => user.id === userId)
  }

  // 推荐关注的用户
  const suggestedUsers = [
    {
      id: "101",
      username: "rwish77",
      fullName: "创意设计师",
      avatar: "/creative-profile.png",
      source: "creativilo",
    },
    {
      id: "102",
      username: "ui.ghazal",
      fullName: "UI设计师",
      avatar: "/placeholder-q2wlr.png",
      source: "creativilo",
    },
    {
      id: "103",
      username: "tete_knows",
      fullName: "时尚博主",
      avatar: "/fashion-blogger.png",
      source: "i_kno_u_00",
    },
    {
      id: "104",
      username: "carissafelita",
      fullName: "摄影师",
      avatar: "/photographer.png",
      source: "creativilo",
    },
    {
      id: "105",
      username: "artive.atelier",
      fullName: "艺术工作室",
      avatar: "/vibrant-art-studio.png",
      source: "creativilo",
    },
  ]

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* 左侧导航栏 */}
      <div className="w-[220px] border-r border-gray-800 fixed h-full flex flex-col py-8 px-3">
        <Link href="/" className="text-2xl font-serif font-medium px-3 mb-10">
          Instagram
        </Link>

        <nav className="flex-1 space-y-1">
          <Link href="/" className="flex items-center gap-3 py-3 px-3 rounded-lg font-medium bg-gray-800">
            <Home className="h-6 w-6" />
            <span>首页</span>
          </Link>
          <Link href="/search" className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-300 hover:bg-gray-800">
            <Search className="h-6 w-6" />
            <span>搜索</span>
          </Link>
          <Link
            href="/explore"
            className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <Compass className="h-6 w-6" />
            <span>探索</span>
          </Link>
          <Link href="/reels" className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-300 hover:bg-gray-800">
            <Film className="h-6 w-6" />
            <span>Reels</span>
          </Link>
          <Link
            href="/messages"
            className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <MessageCircle className="h-6 w-6" />
            <span>消息</span>
          </Link>
          <Link
            href="/notifications"
            className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <Bell className="h-6 w-6" />
            <span>通知</span>
          </Link>
          <Link href="/create" className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-300 hover:bg-gray-800">
            <PlusSquare className="h-6 w-6" />
            <span>创建</span>
          </Link>
          <Link
            href="/profile"
            className="flex items-center gap-3 py-3 px-3 rounded-lg text-gray-300 hover:bg-gray-800"
          >
            <Avatar className="h-6 w-6">
              <AvatarImage src="/abstract-profile.png" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
            <span>主页</span>
          </Link>
        </nav>

        <Button variant="ghost" className="mt-auto justify-start text-gray-300 hover:bg-gray-800">
          <MoreHorizontal className="h-6 w-6 mr-3" />
          <span>更多</span>
        </Button>
      </div>

      {/* 中间内容区 */}
      <div className="ml-[220px] flex-1 max-w-[630px] border-r border-gray-800">
        {/* 故事栏 */}
        <div className="flex overflow-x-auto gap-4 py-4 px-4 scrollbar-hide">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center gap-1 min-w-[66px]">
              <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-600">
                <Avatar className="h-16 w-16 border-2 border-black">
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
              <div key={post.id} className="border-b border-gray-800 pb-4">
                {/* 帖子头部 */}
                <div className="flex items-center p-3">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.username || "用户"} />
                    <AvatarFallback>{user?.username?.substring(0, 2) || "用户"}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{user?.username || `用户${post.userId}`}</div>
                  <div className="text-gray-500 mx-1">•</div>
                  <div className="text-gray-500 text-sm">{post.timestamp}</div>
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
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
                      <Heart className="h-6 w-6" />
                      <span className="sr-only">喜欢</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-white">
                      <MessageCircle className="h-6 w-6" />
                      <span className="sr-only">评论</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="ml-auto text-white">
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
                  <div className="text-gray-500 text-sm mt-1">查看全部 {post.comments} 条评论</div>

                  {/* 添加评论 */}
                  <div className="mt-3 text-gray-500 text-sm">添加评论...</div>
                </div>
              </div>
            )
          })}

          {/* 加载状态 */}
          {loading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}

          {/* 没有更多内容 */}
          {!hasMore && !loading && <div className="py-10 text-center text-gray-500">你已经看完所有内容</div>}

          {/* 错误状态 */}
          {error && <div className="py-10 text-center text-red-500">加载更多内容时出错，请重试</div>}
        </div>
      </div>

      {/* 右侧边栏 */}
      <div className="w-[350px] pl-8 pr-4 py-8 fixed right-0 h-full overflow-y-auto">
        {/* 用户信息 */}
        <div className="flex items-center mb-6">
          <Avatar className="h-14 w-14 mr-4">
            <AvatarImage src="/abstract-profile.png" alt="用户头像" />
            <AvatarFallback>用户</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">felix</div>
            <div className="text-gray-500">张三</div>
          </div>
          <Button variant="link" size="sm" className="ml-auto text-blue-500">
            切换
          </Button>
        </div>

        {/* 推荐关注 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-3">
            <span className="text-gray-500 font-medium">为你推荐</span>
            <Button variant="link" size="sm" className="text-white">
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
                  <div className="text-gray-500 text-xs">粉丝：{user.source}</div>
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
          <div>© 2025 INSTAGRAM FROM META</div>
        </div>
      </div>
    </div>
  )
}
