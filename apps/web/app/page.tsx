"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Heart, Search, PlusSquare, User, Home } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import PostCard from "@/components/post-card"
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

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <Link href="/" className="text-xl font-bold">
            Instagram
          </Link>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <PlusSquare className="h-5 w-5" />
              <span className="sr-only">创建</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">通知</span>
            </Button>
            <Avatar className="h-8 w-8">
              <AvatarImage src="/abstract-profile.png" alt="用户头像" />
              <AvatarFallback>用户</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6">
        <div className="flex overflow-x-auto gap-4 pb-4 mb-4 border-b scrollbar-hide">
          {users.map((user) => (
            <div key={user.id} className="flex flex-col items-center gap-1 min-w-[66px]">
              <div className="rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 to-pink-600">
                <Avatar className="h-16 w-16 border-2 border-white">
                  <AvatarImage src={user.avatar || "/placeholder.svg"} alt={`${user.username}的故事`} />
                  <AvatarFallback>{user.username.substring(0, 2)}</AvatarFallback>
                </Avatar>
              </div>
              <span className="text-xs truncate w-full text-center">{user.username}</span>
            </div>
          ))}
        </div>
        <div className="space-y-0">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} user={getUserForPost(post.userId)} />
          ))}

          {/* 加载状态 */}
          {loading && (
            <>
              <PostSkeleton />
              <PostSkeleton />
            </>
          )}

          {/* 没有更多内容 */}
          {!hasMore && !loading && <div className="py-10 text-center text-muted-foreground">你已经看完所有内容</div>}

          {/* 错误状态 */}
          {error && <div className="py-10 text-center text-red-500">加载更多内容时出错，请重试</div>}
        </div>
      </main>
      <footer className="sticky bottom-0 border-t bg-white">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <Button variant="ghost" size="icon" className="flex-1">
            <Home className="h-6 w-6" />
            <span className="sr-only">首页</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-1">
            <Search className="h-6 w-6" />
            <span className="sr-only">搜索</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-1">
            <PlusSquare className="h-6 w-6" />
            <span className="sr-only">创建</span>
          </Button>
          <Button variant="ghost" size="icon" className="flex-1">
            <User className="h-6 w-6" />
            <span className="sr-only">个人资料</span>
          </Button>
        </div>
      </footer>
    </div>
  )
}
