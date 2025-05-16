import Link from "next/link"
import { ArrowLeft, Edit } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function MessagesPage() {
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
          <div className="text-lg font-semibold">消息</div>
          <Button variant="ghost" size="icon" className="ml-auto">
            <Edit className="h-5 w-5" />
            <span className="sr-only">新消息</span>
          </Button>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6">
        <Tabs defaultValue="primary" className="w-full">
          <TabsList className="w-full">
            <TabsTrigger value="primary" className="flex-1">
              主要消息
            </TabsTrigger>
            <TabsTrigger value="general" className="flex-1">
              普通消息
            </TabsTrigger>
          </TabsList>
          <TabsContent value="primary" className="mt-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((id) => (
                <Link href={`/messages/${id}`} key={id}>
                  <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=48&width=48&query=user${id}`}
                        alt={`用户${id}`}
                      />
                      <AvatarFallback>用户{id}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">用户{id}</div>
                      <div className="text-sm text-muted-foreground truncate">这是一条来自用户{id}的消息 • 2小时前</div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="general" className="mt-4">
            <div className="flex items-center justify-center h-40 text-muted-foreground">暂无普通消息</div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
