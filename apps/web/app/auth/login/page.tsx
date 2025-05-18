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
            <div className="relative w-full h-[600px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/miguel-teirlinck-WLlW03JZGBE-unsplash.jpg"
                alt="Friends celebrating with confetti"
                width={450}
                height={600}
                priority
                className="object-cover h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
            </div>
          </div>

          {/* 右侧登录表单区域 */}
          <div className="w-full max-w-[350px] flex flex-col items-center">
            {/* Photogram Logo */}
            <div className="w-full mb-8 flex justify-center">
              {isDarkTheme ? (
                <div className="text-3xl font-bold text-white">Photogram</div>
              ) : (
                <div className="text-3xl font-bold text-black">Photogram</div>
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
                <Link href="https://apps.apple.com">
                  <div className="h-10 w-32 bg-black text-white text-xs flex items-center justify-center rounded">
                    <div className="mr-1">
                      <svg width="20" height="24" viewBox="0 0 14 17" fill="currentColor">
                        <path d="M13.0729 13.9999C12.5309 15.0599 11.9149 16.0679 10.9949 16.0839C10.0749 16.0999 9.7949 15.4399 8.7549 15.4399C7.7149 15.4399 7.3809 16.0679 6.5229 16.0999C5.6649 16.1319 4.9629 14.9839 4.4149 13.9279C3.2989 11.7799 2.4049 7.7599 3.5569 5.1599C4.1249 3.8879 5.2449 3.0399 6.4609 3.0239C7.3649 3.0079 8.2049 3.7199 8.7549 3.7199C9.3049 3.7199 10.3449 2.8719 11.4329 3.0079C11.9629 3.0399 13.0089 3.2719 13.6729 4.2159C13.5849 4.2639 12.1249 5.0799 12.1409 6.8559C12.1569 8.9999 14.0049 9.6759 14.0209 9.6759C14.0049 9.7079 13.7249 10.8399 13.0249 11.9879C12.4109 12.9799 11.7649 13.9839 11.0149 13.9999C10.2649 14.0159 9.9369 13.5599 9.0329 13.5599C8.1289 13.5599 7.7689 13.9999 7.0509 13.9999C6.3329 13.9999 5.8029 13.0759 5.2049 12.0839C4.5509 10.9999 4.0369 9.5879 4.0369 8.2239C4.0369 5.8399 5.5449 4.5839 7.0189 4.5839C7.8369 4.5679 8.5869 5.0879 9.0969 5.0879C9.6069 5.0879 10.4569 4.5039 11.4649 4.5679C11.7969 4.5679 12.9129 4.6319 13.6409 5.6399C13.5529 5.6879 13.0729 5.9999 12.7249 6.5679C12.3769 7.1359 12.0929 7.9199 12.0929 8.8919C12.0929 9.8639 12.4249 10.7559 12.8369 11.3719C13.2489 11.9879 13.7089 12.3959 14.0049 12.6119C13.9169 13.0999 13.4409 13.3639 13.0729 13.9999ZM9.0969 2.3999C9.4929 1.9119 9.7729 1.2159 9.7729 0.5199C9.7729 0.4239 9.7729 0.3279 9.7569 0.2479C9.0649 0.2799 8.2469 0.7039 7.7689 1.2639C7.4049 1.6559 7.0669 2.3519 7.0669 3.0639C7.0669 3.1759 7.0829 3.2879 7.0829 3.3199C7.1389 3.3359 7.2269 3.3519 7.3149 3.3519C8.0809 3.3519 8.7009 2.8879 9.0969 2.3999Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[0.6rem] leading-none">Download on the</span>
                      <span className="text-[0.85rem] font-semibold">App Store</span>
                    </div>
                  </div>
                </Link>
                <Link href="https://play.google.com">
                  <div className="h-10 w-32 bg-black text-white text-xs flex items-center justify-center rounded px-1">
                    <div className="mr-1">
                      <svg width="20" height="24" viewBox="0 0 16 18" fill="currentColor">
                        <path d="M0.843 17.2806C0.6 16.9306 0.45 16.4806 0.45 15.9306V2.03063C0.45 1.48063 0.6 1.03063 0.843 0.680634L0.9 0.608789L8.25 7.95879V8.03063L0.9 15.3806L0.843 17.2806Z" />
                        <path d="M11.55 11.3306L8.25 8.03063V7.95879L11.55 4.65879L11.625 4.73063L15.525 6.98063C16.575 7.58063 16.575 8.48063 15.525 9.08063L11.625 11.2587L11.55 11.3306Z" />
                        <path d="M11.625 11.2587L8.25 7.95879L0.9 15.3806C1.275 15.7587 1.8 15.8306 2.4 15.5306L11.625 11.2587Z" />
                        <path d="M11.625 4.65879L2.4 0.458789C1.8 0.158789 1.275 0.230634 0.9 0.608789L8.25 7.95879L11.625 4.65879Z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-[0.6rem] leading-none">GET IT ON</span>
                      <span className="text-[0.85rem] font-semibold">Google Play</span>
                    </div>
                  </div>
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
              Photogram Lite
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
