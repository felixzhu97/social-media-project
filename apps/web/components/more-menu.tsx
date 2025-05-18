"use client"

import { useState, useRef, useEffect } from "react"
import { useTheme } from "next-themes"
import { Settings, Activity, Bookmark, Sun, Moon, AlertCircle } from "lucide-react"
import Link from "next/link"

interface MoreMenuProps {
  isOpen: boolean
  onClose: () => void
}

export function MoreMenu({ isOpen, onClose }: MoreMenuProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // 水合时防止客户端/服务器不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  // 点击外部关闭菜单
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!mounted) {
    return null
  }

  const isDarkTheme =
    theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50" onClick={onClose}>
      <div
        ref={menuRef}
        className={`absolute bottom-16 left-4 md:left-16 lg:left-4 ${
          isDarkTheme ? "bg-gray-900" : "bg-white"
        } rounded-xl shadow-lg overflow-hidden w-[268px]`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col">
          <Link
            href="/settings"
            className={`flex items-center gap-3 p-4 ${
              isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-colors`}
            onClick={onClose}
          >
            <Settings className="h-6 w-6" />
            <span className="text-base font-normal">Settings</span>
          </Link>
          <Link
            href="/activity"
            className={`flex items-center gap-3 p-4 ${
              isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-colors`}
            onClick={onClose}
          >
            <Activity className="h-6 w-6" />
            <span className="text-base font-normal">Your activity</span>
          </Link>
          <Link
            href="/saved"
            className={`flex items-center gap-3 p-4 ${
              isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-colors`}
            onClick={onClose}
          >
            <Bookmark className="h-6 w-6" />
            <span className="text-base font-normal">Saved</span>
          </Link>
          <button
            className={`flex items-center gap-3 p-4 w-full text-left ${
              isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-colors`}
            onClick={() => {
              setTheme(isDarkTheme ? "light" : "dark")
              onClose()
            }}
          >
            {isDarkTheme ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
            <span className="text-base font-normal">Switch appearance</span>
          </button>
          <Link
            href="/report"
            className={`flex items-center gap-3 p-4 ${
              isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-colors`}
            onClick={onClose}
          >
            <AlertCircle className="h-6 w-6" />
            <span className="text-base font-normal">Report a problem</span>
          </Link>
        </div>
        <div className={`border-t ${isDarkTheme ? "border-gray-800" : "border-gray-200"}`}>
          <button
            className={`p-4 w-full text-left ${
              isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-colors`}
            onClick={onClose}
          >
            <span className="text-base font-normal">Switch accounts</span>
          </button>
        </div>
        <div className={`border-t ${isDarkTheme ? "border-gray-800" : "border-gray-200"}`}>
          <button
            className={`p-4 w-full text-left ${
              isDarkTheme ? "hover:bg-gray-800" : "hover:bg-gray-100"
            } transition-colors`}
            onClick={onClose}
          >
            <span className="text-base font-normal">Log out</span>
          </button>
        </div>
      </div>
    </div>
  )
}
