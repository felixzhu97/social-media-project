import Link from "next/link"
import { ArrowLeft, ImageIcon, MapPin, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePostPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <header className="sticky top-0 z-10 border-b bg-white">
        <div className="container flex items-center justify-between h-14 px-4 md:px-6">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" asChild className="mr-2">
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">返回</span>
              </Link>
            </Button>
            <div className="text-lg font-semibold">创建新帖子</div>
          </div>
          <Button variant="ghost" className="text-blue-500 font-semibold">
            分享
          </Button>
        </div>
      </header>
      <main className="flex-1 container max-w-2xl py-4 px-4 md:px-6">
        <div className="border rounded-md overflow-hidden bg-white mb-4">
          <div className="p-4 border-b flex items-center justify-center h-72 bg-gray-50">
            <div className="flex flex-col items-center text-center">
              <ImageIcon className="h-12 w-12 text-gray-400 mb-2" />
              <div className="text-lg font-medium mb-2">拖放照片和视频到这里</div>
              <Button>从设备中选择</Button>
            </div>
          </div>
          <div className="p-4">
            <Textarea
              placeholder="写下标题..."
              className="resize-none border-0 focus-visible:ring-0 p-0 text-base"
              rows={4}
            />
            <div className="flex items-center justify-between py-3 border-t">
              <div className="text-sm">添加位置</div>
              <MapPin className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-3 border-t">
              <div className="text-sm">可访问性</div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center justify-between py-3 border-t">
              <div className="text-sm">高级设置</div>
              <ChevronDown className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
