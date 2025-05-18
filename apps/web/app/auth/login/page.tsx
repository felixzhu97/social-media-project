"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export default function LoginPage() {
  const [mounted, setMounted] = useState(false)
  const { theme } = useTheme()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

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
      {/* 主题切换按钮 - 右上角 */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* 主要内容区域 */}
      <div className="flex flex-1 items-center justify-center">
        <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-[935px] mx-auto px-4 py-8">
          {/* 左侧手机图片区域 - 仅在中等及以上屏幕显示 */}
          <div className="hidden md:block md:w-[380px] lg:w-[450px] relative mr-8">
            <Image
              src="/photogram-phones.png?height=600&width=450&query=photogram login phones with posts"
              alt="Instagram on phone"
              width={450}
              height={600}
              priority
              className="object-contain"
            />
          </div>

          {/* 右侧登录表单区域 */}
          <div className="w-full max-w-[350px] flex flex-col items-center">
            {/* Instagram Logo */}
            <div className="w-full mb-8 flex justify-center">
              {isDarkTheme ? (
                <Image
                  src="/photogram-logo-white.png?height=80&width=175&query=photogram logo white"
                  alt="Instagram"
                  width={175}
                  height={51}
                  priority
                  className="h-[51px] w-auto object-contain"
                />
              ) : (
                <Image
                  src="/photogram-logo-black.png?height=80&width=175&query=photogram logo black"
                  alt="Instagram"
                  width={175}
                  height={51}
                  priority
                  className="h-[51px] w-auto object-contain"
                />
              )}
            </div>

            {/* 登录表单 */}
            <div
              className={`w-full px-10 pt-6 pb-5 mb-2.5 ${isDarkTheme ? "bg-black border border-gray-800" : "bg-white border border-gray-300"} rounded-sm`}
            >
              <form className="space-y-1.5">
                <div className="space-y-1.5">
                  <Input
                    id="email"
                    placeholder="电话号码、用户名或电子邮箱"
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
                </div>
                <div className="space-y-1.5">
                  <Input
                    id="password"
                    placeholder="密码"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="current-password"
                    className={`${
                      isDarkTheme ? "bg-black border-gray-700 text-white" : "bg-gray-50 border-gray-200"
                    } text-xs py-3 px-2 rounded-[4px] h-[38px]`}
                  />
                </div>
                <Button
                  type="submit"
                  disabled={!email || !password}
                  className={`w-full mt-4 bg-[#0095f6] hover:bg-[#1877f2] text-white font-semibold py-1.5 rounded-[8px] h-[32px] text-sm ${
                    (!email || !password) && "opacity-70 cursor-not-allowed"
                  }`}
                >
                  登录
                </Button>
              </form>

              {/* 或分隔线 */}
              <div className="flex items-center my-4">
                <div className={`flex-grow h-px ${isDarkTheme ? "bg-gray-800" : "bg-gray-300"}`}></div>
                <span className={`mx-4 text-xs font-semibold ${isDarkTheme ? "text-gray-500" : "text-gray-500"}`}>
                  或
                </span>
                <div className={`flex-grow h-px ${isDarkTheme ? "bg-gray-800" : "bg-gray-300"}`}></div>
              </div>

              {/* Facebook登录 */}
              <div className="flex justify-center items-center">
                <button
                  className={`flex items-center text-sm font-semibold ${
                    isDarkTheme ? "text-blue-400" : "text-blue-900"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2"
                  >
                    <path d="M9.198 21.5h4v-8.01h3.604l.396-3.98h-4V7.5a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0-5 5v2.01h-2l-.396 3.98h2.396v8.01Z" />
                  </svg>
                  使用 Facebook 登录
                </button>
              </div>

              {/* 忘记密码链接 */}
              <div className="mt-4 text-center">
                <Link
                  href="/auth/reset-password"
                  className={`text-xs ${isDarkTheme ? "text-blue-400" : "text-blue-900"}`}
                >
                  忘记密码？
                </Link>
              </div>
            </div>

            {/* 注册提示 */}
            <div
              className={`w-full py-5 text-center ${isDarkTheme ? "bg-black border border-gray-800" : "bg-white border border-gray-300"} rounded-sm`}
            >
              <p className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"}`}>
                没有账号？{" "}
                <Link
                  href="/auth/register"
                  className={`font-semibold ${isDarkTheme ? "text-blue-400" : "text-[#0095f6]"}`}
                >
                  注册
                </Link>
              </p>
            </div>

            {/* 下载应用提示 */}
            <div className="w-full mt-5 text-center">
              <p className={`text-sm ${isDarkTheme ? "text-gray-300" : "text-gray-700"} mb-5`}>获取应用</p>
              <div className="flex justify-center space-x-2">
                <Link href="https://apps.apple.com/app/instagram/id389801252">
                  <Image
                    src="/app-store-black.png?height=40&width=136&query=app store badge black"
                    alt="App Store"
                    width={136}
                    height={40}
                    className="h-10"
                  />
                </Link>
                <Link href="https://play.google.com/store/apps/details?id=com.instagram.android">
                  <Image
                    src="/google-play-black.png?height=40&width=136&query=google play badge black"
                    alt="Google Play"
                    width={136}
                    height={40}
                    className="h-10"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 页脚 */}
      <footer className={`w-full py-6 text-xs ${isDarkTheme ? "text-gray-500" : "text-gray-500"} text-center mt-auto`}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
            <Link href="#" className="hover:underline">
              Meta
            </Link>
            <Link href="#" className="hover:underline">
              关于
            </Link>
            <Link href="#" className="hover:underline">
              博客
            </Link>
            <Link href="#" className="hover:underline">
              工作
            </Link>
            <Link href="#" className="hover:underline">
              帮助
            </Link>
            <Link href="#" className="hover:underline">
              API
            </Link>
            <Link href="#" className="hover:underline">
              隐私
            </Link>
            <Link href="#" className="hover:underline">
              条款
            </Link>
            <Link href="#" className="hover:underline">
              热门账号
            </Link>
            <Link href="#" className="hover:underline">
              位置
            </Link>
            <Link href="#" className="hover:underline">
              Instagram Lite
            </Link>
            <Link href="#" className="hover:underline">
              Threads
            </Link>
            <Link href="#" className="hover:underline">
              联系上传与非用户
            </Link>
            <Link href="#" className="hover:underline">
              Meta Verified
            </Link>
          </div>
          <div className="flex justify-center items-center gap-4">
            <div className="flex items-center">
              <span>简体中文</span>
              <svg
                aria-label="下拉图标"
                className="ml-1"
                color="rgb(115, 115, 115)"
                fill="rgb(115, 115, 115)"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <path d="M12 17.502a1 1 0 0 1-.707-.293l-9-9.004a1 1 0 0 1 1.414-1.414L12 15.087l8.293-8.296a1 1 0 0 1 1.414 1.414l-9 9.004a1 1 0 0 1-.707.293Z"></path>
              </svg>
            </div>
            <div>© 2025 PHOTOGRAM</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
