import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Instagram className="h-12 w-12" />
          </div>
          <h1 className="text-xl font-semibold text-muted-foreground">注册 Instagram，查看朋友的照片和视频。</h1>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <div className="mb-4">
            <Button variant="outline" className="w-full">
              <Image
                src="/facebook-icon.png?height=16&width=16&query=facebook logo"
                alt="Facebook"
                width={16}
                height={16}
                className="mr-2"
              />
              使用 Facebook 登录
            </Button>
          </div>
          <div className="flex items-center">
            <Separator className="flex-1" />
            <span className="mx-2 text-xs text-muted-foreground">或</span>
            <Separator className="flex-1" />
          </div>
          <form className="mt-4 space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="手机号或电子邮箱"
                type="text"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Input id="fullName" placeholder="全名" type="text" />
            </div>
            <div className="space-y-2">
              <Input id="username" placeholder="用户名" type="text" />
            </div>
            <div className="space-y-2">
              <Input id="password" placeholder="密码" type="password" autoComplete="new-password" />
            </div>
            <div className="text-xs text-muted-foreground">
              注册即表示您同意我们的{" "}
              <Link href="#" className="text-blue-500 hover:underline">
                条款
              </Link>
              、
              <Link href="#" className="text-blue-500 hover:underline">
                数据政策
              </Link>
              和
              <Link href="#" className="text-blue-500 hover:underline">
                Cookie 政策
              </Link>
              。
            </div>
            <Button type="submit" className="w-full">
              注册
            </Button>
          </form>
        </div>
        <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
          <p className="text-sm">
            有账号？{" "}
            <Link href="/auth/login" className="text-blue-500 hover:underline">
              登录
            </Link>
          </p>
        </div>
        <div className="text-center text-sm">
          <p>下载应用</p>
          <div className="mt-4 flex justify-center space-x-4">
            <Image
              src="/app-store.png?height=40&width=120&query=app store badge"
              alt="App Store"
              width={120}
              height={40}
            />
            <Image
              src="/google-play.png?height=40&width=120&query=google play badge"
              alt="Google Play"
              width={120}
              height={40}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
