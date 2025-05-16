import { Heart, MessageCircle, Bookmark, Send } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import type { Post, User } from "@/lib/data"

interface PostCardProps {
  post: Post
  user?: User
}

export default function PostCard({ post, user }: PostCardProps) {
  // 如果没有提供用户信息，使用帖子中的用户ID生成默认值
  const displayUser = user || {
    id: post.userId,
    username: `user${post.userId}`,
    fullName: `用户${post.userId}`,
    avatar: `/abstract-geometric-shapes.png?height=32&width=32&query=user${post.userId}`,
    followers: 0,
    following: 0,
    posts: 0,
  }

  return (
    <div className="border rounded-md overflow-hidden bg-white mb-6">
      <div className="flex items-center p-3">
        <Avatar className="h-8 w-8 mr-2">
          <AvatarImage src={displayUser.avatar || "/placeholder.svg"} alt={displayUser.username} />
          <AvatarFallback>{displayUser.username.substring(0, 2)}</AvatarFallback>
        </Avatar>
        <Link href={`/profile/${displayUser.id}`} className="font-medium">
          {displayUser.username}
        </Link>
      </div>
      <div className="relative aspect-square">
        <Image src={post.image || "/placeholder.svg"} alt={post.caption} fill className="object-cover" />
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
        <div className="font-medium mb-1">{post.likes.toLocaleString()} 赞</div>
        <div>
          <span className="font-medium mr-2">{displayUser.username}</span>
          <span>{post.caption}</span>
        </div>
        <div className="text-muted-foreground text-sm mt-1">查看全部 {post.comments} 条评论</div>
        <div className="text-muted-foreground text-xs mt-2">{post.timestamp}</div>
      </div>
    </div>
  )
}
