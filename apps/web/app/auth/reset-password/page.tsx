"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Lock } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export default function ResetPasswordPage() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [email, setEmail] = useState("")

  // 水合时防止客户端/服务器不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkTheme =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  return (
    <div className={`flex flex-col min-h-screen ${isDarkTheme ? "bg-black" : "bg-white"}`}>
      {/* 顶部导航栏 */}
      <header className={`border-b ${isDarkTheme ? "border-gray-800" : "border-gray-300"}`}>
        <div className="container flex items-center justify-between h-14 px-4 md:px-6 max-w-screen-lg mx-auto">
          <div className="flex-1">
            <Link href="/" className="flex items-center">
              {isDarkTheme ? (
                <Image
                  src="/photogram-logo-white.png?height=80&width=175&query=photogram logo white"
                  alt="Instagram"
                  width={103}
                  height={29}
                  priority
                  className="h-[29px] w-auto object-contain"
                />
              ) : (
                <Image
                  src="/photogram-logo-black.png?height=80&width=175&query=photogram logo black"
                  alt="Instagram"
                  width={103}
                  height={29}
                  priority
                  className="h-[29px] w-auto object-contain"
                />
              )}
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button
                variant="default"
                className="bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold rounded-[4px] h-8 px-4"
              >
                登录
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button
                variant="link"
                className={`font-semibold ${isDarkTheme ? "text-blue-400" : "text-[#0095f6]"} h-8 px-2`}
              >
                注册
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 主要内容区域 */}
      <div className="flex flex-1 items-center justify-center py-8">
        <div className="w-full max-w-[388px] mx-auto px-4">
          <div
            className={`w-full ${
              isDarkTheme ? "bg-black border border-gray-800" : "bg-white border border-gray-300"
            } rounded-sm p-6`}
          >
            <div className="flex flex-col items-center text-center mb-6">
              <div
                className={`w-[96px] h-[96px] rounded-full flex items-center justify-center border-2 ${
                  isDarkTheme ? "border-white" : "border-black"
                } mb-4`}
              >
                <Lock className={`h-10 w-10 ${isDarkTheme ? "text-white" : "text-black"}`} />
              </div>
              <h1 className={`text-base font-semibold ${isDarkTheme ? "text-white" : "text-black"} mb-2`}>
                登录遇到问题？
              </h1>
              <p className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                输入您的电子邮件、电话或用户名，我们将向您发送重新登录的链接。
              </p>
            </div>

            <form className="space-y-4">
              <Input
                id="email"
                placeholder="电子邮件、电话或用户名"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                className={`${
                  isDarkTheme ? "bg-black border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                } text-xs py-3 px-2 rounded-[4px] h-[38px]`}
              />
              <Button
                type="submit"
                disabled={!email}
                className={`w-full bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold py-1.5 rounded-[8px] h-[32px] text-sm ${
                  !email && "opacity-70 cursor-not-allowed"
                }`}
              >
                发送登录链接
              </Button>
            </form>

            <div className="mt-4 text-center">
              <Link href="#" className={`text-xs ${isDarkTheme ? "text-blue-400" : "text-blue-900"}`}>
                无法重置密码？
              </Link>
            </div>

            {/* 或分隔线 */}
            <div className="flex items-center my-4">
              <div className={`flex-grow h-px ${isDarkTheme ? "bg-gray-800" : "bg-gray-300"}`}></div>
              <span className={`mx-4 text-xs font-semibold ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
                或
              </span>
              <div className={`flex-grow h-px ${isDarkTheme ? "bg-gray-800" : "bg-gray-300"}`}></div>
            </div>

            <div className="text-center">
              <Link
                href="/auth/register"
                className={`text-sm font-semibold ${isDarkTheme ? "text-white" : "text-black"}`}
              >
                创建新账户
              </Link>
            </div>
          </div>

          <div
            className={`w-full mt-2.5 ${
              isDarkTheme ? "bg-black border border-gray-800" : "bg-white border border-gray-300"
            } rounded-sm p-4 text-center`}
          >
            <Link
              href="/auth/login"
              className={`text-sm font-semibold ${isDarkTheme ? "text-blue-400" : "text-[#0095f6]"}`}
            >
              返回登录
            </Link>
          </div>
        </div>
      </div>

      {/* 页脚 */}
    </div>
  )
}
