"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowLeft } from "lucide-react"
import { useState, useEffect } from "react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import useInfiniteScroll from "@/hooks/use-infinite-scroll"

interface SearchPost {
  id: string
  image: string
}

export default function SearchPage() {
  const [mounted, setMounted] = useState(false)

  // 在搜索页面也使用无限滚动
  const {
    data: searchPosts,
    loading,
    hasMore,
  } = useInfiniteScroll<SearchPost>({
    initialData: Array.from({ length: 12 }).map((_, i) => ({
      id: `search-${i + 1}`,
      image: `/photogram-post.png?height=300&width=300&query=trending post ${i + 1}`,
    })),
    fetchMore: async (page) => {
      // 模拟网络延迟
      return new Promise((resolve) => {
        setTimeout(() => {
          if (page > 5) {
            resolve([])
          } else {
            // 生成更多搜索结果图片
            const newPosts = Array.from({ length: 12 }).map((_, i) => ({
              id: `search-${(page - 1) * 12 + i + 13}`,
              image: `/photogram-post.png?height=300&width=300&query=trending post ${(page - 1) * 12 + i + 13}`,
            }))
            resolve(newPosts)
          }
        }, 1000)
      })
    },
  })

  // 水合时防止客户端/服务器不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex items-center h-14 px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <div className="flex-1">
            <Input placeholder="搜索" className="rounded-full" />
          </div>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6">
        <Tabs defaultValue="top" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="top" className="flex-1">
              热门
            </TabsTrigger>
            <TabsTrigger value="accounts" className="flex-1">
              账号
            </TabsTrigger>
            <TabsTrigger value="tags" className="flex-1">
              标签
            </TabsTrigger>
            <TabsTrigger value="places" className="flex-1">
              地点
            </TabsTrigger>
          </TabsList>
          <TabsContent value="top" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {searchPosts.map((post) => (
                <div key={post.id} className="relative aspect-square">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={`热门帖子${post.id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>

            {/* 加载状态 */}
            {loading && (
              <div className="grid grid-cols-3 gap-1 mt-1">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="relative aspect-square">
                    <div className="w-full h-full bg-gray-200 animate-pulse"></div>
                  </div>
                ))}
              </div>
            )}

            {/* 没有更多内容 */}
            {!hasMore && !loading && (
              <div className="py-10 text-center text-muted-foreground">你已经看完所有热门内容</div>
            )}
          </TabsContent>
          <TabsContent value="accounts" className="mt-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((id) => (
                <div key={id} className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=user${id}`}
                      alt={`用户${id}`}
                    />
                    <AvatarFallback>用户{id}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium">用户{id}</div>
                    <div className="text-sm text-muted-foreground">用户{id}的个人简介</div>
                  </div>
                  <Button variant="outline" size="sm">
                    关注
                  </Button>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tags" className="mt-4">
            <div className="space-y-4">
              {["旅行", "美食", "时尚", "摄影", "艺术"].map((tag, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <Image
                      src={`/photogram-post.png?height=48&width=48&query=${tag}`}
                      alt={tag}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">#{tag}</div>
                    <div className="text-sm text-muted-foreground">{Math.floor(Math.random() * 1000000)} 帖子</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="places" className="mt-4">
            <div className="space-y-4">
              {["北京", "上海", "广州", "深圳", "杭州"].map((place, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 rounded-md overflow-hidden">
                    <Image
                      src={`/photogram-post.png?height=48&width=48&query=${place} city`}
                      alt={place}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">{place}</div>
                    <div className="text-sm text-muted-foreground">{Math.floor(Math.random() * 1000000)} 帖子</div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
