import Link from "next/link"
import Image from "next/image"
import { Grid3X3, Settings, ArrowLeft } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
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
          <div className="text-lg font-semibold">用户名</div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Settings className="h-5 w-5" />
            <span className="sr-only">设置</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6">
        <div className="flex items-center gap-6 mb-6">
          <Avatar className="h-20 w-20">
            <AvatarImage src="/abstract-profile.png" alt="个人头像" />
            <AvatarFallback>用户</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-xl font-semibold mb-1">用户名</div>
            <div className="flex gap-6 text-sm mb-2">
              <div>
                <span className="font-semibold">42</span> 帖子
              </div>
              <div>
                <span className="font-semibold">1,234</span> 粉丝
              </div>
              <div>
                <span className="font-semibold">567</span> 正在关注
              </div>
            </div>
            <div className="text-sm font-medium">个人简介</div>
          </div>
        </div>
        <div className="mb-4">
          <Button className="w-full" variant="outline">
            编辑个人资料
          </Button>
        </div>
        <Tabs defaultValue="posts" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="posts" className="flex-1">
              <Grid3X3 className="h-4 w-4 mr-2" />
              帖子
            </TabsTrigger>
            <TabsTrigger value="tagged" className="flex-1">
              已标记
            </TabsTrigger>
          </TabsList>
          <TabsContent value="posts" className="mt-4">
            <div className="grid grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((id) => (
                <div key={id} className="relative aspect-square">
                  <Image
                    src={`/instagram-post.png?height=300&width=300&query=instagram post ${id}`}
                    alt={`帖子${id}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="tagged" className="mt-4">
            <div className="flex items-center justify-center h-40 text-muted-foreground">暂无已标记的帖子</div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
