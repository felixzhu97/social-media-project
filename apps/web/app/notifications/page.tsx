import Link from "next/link"
import { ArrowLeft } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function NotificationsPage() {
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
          <div className="text-lg font-semibold">通知</div>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="all" className="flex-1">
              全部
            </TabsTrigger>
            <TabsTrigger value="follows" className="flex-1">
              关注
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="mt-4">
            <div className="space-y-4">
              <div className="font-semibold mb-2">今天</div>
              {[1, 2, 3].map((id) => (
                <div key={id} className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=user${id}`}
                      alt={`用户${id}`}
                    />
                    <AvatarFallback>用户{id}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div>
                      <span className="font-medium">用户{id}</span> 赞了你的照片。{" "}
                      <span className="text-muted-foreground">2小时前</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 relative">
                    <img
                      src={`/instagram-post.png?height=48&width=48&query=post${id}`}
                      alt="帖子缩略图"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}

              <div className="font-semibold mb-2">本周</div>
              {[4, 5, 6].map((id) => (
                <div key={id} className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=user${id}`}
                      alt={`用户${id}`}
                    />
                    <AvatarFallback>用户{id}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div>
                      <span className="font-medium">用户{id}</span> 开始关注你。{" "}
                      <span className="text-muted-foreground">3天前</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    关注
                  </Button>
                </div>
              ))}

              <div className="font-semibold mb-2">本月</div>
              {[7, 8, 9].map((id) => (
                <div key={id} className="flex items-center gap-3">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={`/abstract-geometric-shapes.png?height=48&width=48&query=user${id}`}
                      alt={`用户${id}`}
                    />
                    <AvatarFallback>用户{id}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div>
                      <span className="font-medium">用户{id}</span> 评论了你的照片：太棒了！
                      <span className="text-muted-foreground"> 2周前</span>
                    </div>
                  </div>
                  <div className="h-12 w-12 relative">
                    <img
                      src={`/instagram-post.png?height=48&width=48&query=post${id}`}
                      alt="帖子缩略图"
                      className="h-full w-full object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="follows" className="mt-4">
            <div className="space-y-4">
              <div className="font-semibold mb-2">新关注者</div>
              {[4, 5, 6, 10, 11].map((id) => (
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
        </Tabs>
      </main>
    </div>
  )
}
