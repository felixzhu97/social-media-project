import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Heart, MessageCircle, Bookmark, Send, MoreHorizontal } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function PostPage({ params }: { params: { id: string } }) {
  const postId = params.id

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
          <div className="text-lg font-semibold">帖子</div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <MoreHorizontal className="h-5 w-5" />
            <span className="sr-only">更多选项</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6">
        <div className="border rounded-md overflow-hidden bg-white">
          <div className="flex items-center p-3">
            <Avatar className="h-8 w-8 mr-2">
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=32&width=32&query=user${postId}`}
                alt={`用户${postId}`}
              />
              <AvatarFallback>用户{postId}</AvatarFallback>
            </Avatar>
            <div className="font-medium">用户{postId}</div>
            <Button variant="ghost" size="sm" className="ml-auto">
              关注
            </Button>
          </div>
          <div className="relative aspect-square">
            <Image
              src={`/instagram-post.png?height=600&width=600&query=instagram post ${postId}`}
              alt={`帖子${postId}`}
              fill
              className="object-cover"
            />
          </div>
          <div className="p-3">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Heart className="h-6 w-6" />
                <span className="sr-only">喜欢</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <MessageCircle className="h-6 w-6" />
                <span className="sr-only">评论</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Send className="h-6 w-6" />
                <span className="sr-only">分享</span>
              </Button>
              <Button variant="ghost" size="icon" className="h-9 w-9 ml-auto">
                <Bookmark className="h-6 w-6" />
                <span className="sr-only">保存</span>
              </Button>
            </div>
            <div className="font-medium mb-1">1,234 赞</div>
            <div>
              <span className="font-medium mr-2">用户{postId}</span>
              <span>这是一个很棒的帖子！#instagram #照片 #分享</span>
            </div>
            <div className="text-muted-foreground text-sm mt-1">查看全部 56 条评论</div>
            <div className="mt-2 space-y-2">
              <div>
                <span className="font-medium mr-2">用户1</span>
                <span>真漂亮！</span>
              </div>
              <div>
                <span className="font-medium mr-2">用户2</span>
                <span>太棒了！</span>
              </div>
              <div>
                <span className="font-medium mr-2">用户3</span>
                <span>喜欢这个！</span>
              </div>
            </div>
            <div className="text-muted-foreground text-xs mt-2">2 小时前</div>
          </div>
          <div className="p-3 border-t">
            <div className="flex items-center gap-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/abstract-profile.png" alt="我的头像" />
                <AvatarFallback>我</AvatarFallback>
              </Avatar>
              <Input placeholder="添加评论..." className="border-0 focus-visible:ring-0" />
              <Button variant="ghost" className="text-blue-500 font-semibold">
                发布
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
