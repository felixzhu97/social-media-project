import Link from "next/link"
import Image from "next/image"
import { Instagram } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="space-y-4 text-center">
          <div className="flex justify-center">
            <Instagram className="h-12 w-12" />
          </div>
        </div>
        <div className="rounded-lg border bg-white p-6 shadow-sm">
          <form className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                placeholder="电话号码、用户名或电子邮箱"
                type="text"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
              />
            </div>
            <div className="space-y-2">
              <Input id="password" placeholder="密码" type="password" autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full">
              登录
            </Button>
          </form>
          <div className="mt-4 flex items-center">
            <Separator className="flex-1" />
            <span className="mx-2 text-xs text-muted-foreground">或</span>
            <Separator className="flex-1" />
          </div>
          <div className="mt-4 text-center">
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
          <div className="mt-4 text-center text-sm">
            <Link href="/auth/reset-password" className="text-blue-500 hover:underline">
              忘记密码？
            </Link>
          </div>
        </div>
        <div className="rounded-lg border bg-white p-6 text-center shadow-sm">
          <p className="text-sm">
            没有账号？{" "}
            <Link href="/auth/register" className="text-blue-500 hover:underline">
              注册
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
