import Link from "next/link"
import { ArrowLeft, Phone, Video, Info, ImageIcon, Mic, Smile } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ChatPage({ params }: { params: { id: string } }) {
  const userId = params.id

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex items-center h-14 px-4 md:px-6">
          <Button variant="ghost" size="icon" asChild className="mr-2">
            <Link href="/messages">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          <Avatar className="h-8 w-8 mr-2">
            <AvatarImage
              src={`/abstract-geometric-shapes.png?height=32&width=32&query=user${userId}`}
              alt={`用户${userId}`}
            />
            <AvatarFallback>用户{userId}</AvatarFallback>
          </Avatar>
          <div className="font-medium">用户{userId}</div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Phone className="h-5 w-5" />
              <span className="sr-only">语音通话</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Video className="h-5 w-5" />
              <span className="sr-only">视频通话</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Info className="h-5 w-5" />
              <span className="sr-only">详情</span>
            </Button>
          </div>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6 overflow-y-auto">
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded-full">今天</div>
          </div>

          {/* 对方的消息 */}
          <div className="flex items-end gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=32&width=32&query=user${userId}`}
                alt={`用户${userId}`}
              />
              <AvatarFallback>用户{userId}</AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-2xl p-3 max-w-[70%]">
              <p>你好！最近怎么样？</p>
            </div>
            <div className="text-xs text-muted-foreground">10:30</div>
          </div>

          {/* 自己的消息 */}
          <div className="flex items-end gap-2 justify-end">
            <div className="text-xs text-muted-foreground">10:32</div>
            <div className="bg-blue-500 text-white rounded-2xl p-3 max-w-[70%]">
              <p>嗨！我很好，谢谢。你呢？</p>
            </div>
          </div>

          {/* 对方的消息 */}
          <div className="flex items-end gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                src={`/abstract-geometric-shapes.png?height=32&width=32&query=user${userId}`}
                alt={`用户${userId}`}
              />
              <AvatarFallback>用户{userId}</AvatarFallback>
            </Avatar>
            <div className="bg-gray-100 rounded-2xl p-3 max-w-[70%]">
              <p>我也很好！你看到我最新发的照片了吗？</p>
            </div>
            <div className="text-xs text-muted-foreground">10:35</div>
          </div>

          {/* 自己的消息 */}
          <div className="flex items-end gap-2 justify-end">
            <div className="text-xs text-muted-foreground">10:36</div>
            <div className="bg-blue-500 text-white rounded-2xl p-3 max-w-[70%]">
              <p>看到了，拍得真不错！在哪里拍的？</p>
            </div>
          </div>
        </div>
      </main>
      <footer className="sticky bottom-0 border-t bg-white p-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Smile className="h-6 w-6" />
            <span className="sr-only">表情</span>
          </Button>
          <Input placeholder="发送消息..." className="rounded-full" />
          <Button variant="ghost" size="icon">
            <ImageIcon className="h-6 w-6" />
            <span className="sr-only">图片</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Mic className="h-6 w-6" />
            <span className="sr-only">语音</span>
          </Button>
        </div>
      </footer>
    </div>
  )
}
