export type User = {
  id: string
  username: string
  fullName: string
  avatar: string
  bio?: string
  followers: number
  following: number
  posts: number
}

export type Post = {
  id: string
  userId: string
  image: string
  caption: string
  likes: number
  comments: number
  timestamp: string
}

export type Comment = {
  id: string
  postId: string
  userId: string
  text: string
  timestamp: string
}

export type Story = {
  id: string
  userId: string
  image: string
  timestamp: string
}

export type Message = {
  id: string
  senderId: string
  receiverId: string
  text: string
  timestamp: string
}

export type Notification = {
  id: string
  userId: string
  type: "like" | "comment" | "follow"
  targetId?: string
  timestamp: string
}

// 模拟数据
export const users: User[] = [
  {
    id: "1",
    username: "user1",
    fullName: "用户一",
    avatar: "/abstract-geometric-shapes.png?height=64&width=64&query=user1",
    bio: "摄影爱好者 | 旅行者",
    followers: 1234,
    following: 567,
    posts: 42,
  },
  {
    id: "2",
    username: "user2",
    fullName: "用户二",
    avatar: "/abstract-geometric-shapes.png?height=64&width=64&query=user2",
    bio: "美食博主",
    followers: 5678,
    following: 432,
    posts: 87,
  },
  {
    id: "3",
    username: "user3",
    fullName: "用户三",
    avatar: "/abstract-geometric-shapes.png?height=64&width=64&query=user3",
    bio: "时尚达人",
    followers: 9876,
    following: 654,
    posts: 123,
  },
  {
    id: "4",
    username: "user4",
    fullName: "用户四",
    avatar: "/abstract-geometric-shapes.png?height=64&width=64&query=user4",
    bio: "旅行爱好者",
    followers: 3456,
    following: 278,
    posts: 65,
  },
  {
    id: "5",
    username: "user5",
    fullName: "用户五",
    avatar: "/abstract-geometric-shapes.png?height=64&width=64&query=user5",
    bio: "健身达人",
    followers: 7890,
    following: 523,
    posts: 91,
  },
]

// 扩展帖子数据以支持无限滚动
export const posts: Post[] = [
  {
    id: "1",
    userId: "1",
    image: "/photogram-post.png?height=600&width=600&query=social post 1",
    caption: "美丽的风景 #旅行 #摄影",
    likes: 1234,
    comments: 56,
    timestamp: "2小时前",
  },
  {
    id: "2",
    userId: "2",
    image: "/photogram-post.png?height=600&width=600&query=social post 2",
    caption: "今天的午餐 #美食 #健康",
    likes: 876,
    comments: 32,
    timestamp: "5小时前",
  },
  {
    id: "3",
    userId: "3",
    image: "/photogram-post.png?height=600&width=600&query=social post 3",
    caption: "新款时尚单品 #时尚 #购物",
    likes: 2345,
    comments: 78,
    timestamp: "1天前",
  },
  {
    id: "4",
    userId: "4",
    image: "/photogram-post.png?height=600&width=600&query=social post 4",
    caption: "美丽的海滩 #旅行 #海滩",
    likes: 3456,
    comments: 87,
    timestamp: "3小时前",
  },
  {
    id: "5",
    userId: "5",
    image: "/photogram-post.png?height=600&width=600&query=social post 5",
    caption: "今天的健身成果 #健身 #健康",
    likes: 2345,
    comments: 54,
    timestamp: "6小时前",
  },
  {
    id: "6",
    userId: "1",
    image: "/photogram-post.png?height=600&width=600&query=social post 6",
    caption: "城市夜景 #城市 #夜景 #摄影",
    likes: 5678,
    comments: 98,
    timestamp: "1天前",
  },
  {
    id: "7",
    userId: "2",
    image: "/photogram-post.png?height=600&width=600&query=social post 7",
    caption: "自制蛋糕 #美食 #甜点 #烘焙",
    likes: 1987,
    comments: 43,
    timestamp: "2天前",
  },
  {
    id: "8",
    userId: "3",
    image: "/photogram-post.png?height=600&width=600&query=social post 8",
    caption: "秋季新装 #时尚 #秋季 #穿搭",
    likes: 3456,
    comments: 76,
    timestamp: "3天前",
  },
  {
    id: "9",
    userId: "4",
    image: "/photogram-post.png?height=600&width=600&query=social post 9",
    caption: "山间徒步 #旅行 #徒步 #自然",
    likes: 2876,
    comments: 65,
    timestamp: "4天前",
  },
  {
    id: "10",
    userId: "5",
    image: "/photogram-post.png?height=600&width=600&query=social post 10",
    caption: "瑜伽练习 #健身 #瑜伽 #健康",
    likes: 1876,
    comments: 43,
    timestamp: "5天前",
  },
]

// 生成更多的帖子数据用于无限滚动
export function generateMorePosts(page: number, pageSize = 5): Post[] {
  const startIndex = page * pageSize
  const newPosts: Post[] = []

  for (let i = 0; i < pageSize; i++) {
    const postId = startIndex + i + 1 + 10 // 从11开始，避免与初始帖子ID重复
    const userId = String(Math.floor(Math.random() * 5) + 1) // 随机用户1-5

    newPosts.push({
      id: String(postId),
      userId,
      image: `/photogram-post.png?height=600&width=600&query=social post ${postId}`,
      caption: generateRandomCaption(Number.parseInt(userId)),
      likes: Math.floor(Math.random() * 5000) + 100,
      comments: Math.floor(Math.random() * 100) + 10,
      timestamp: `${Math.floor(Math.random() * 14) + 1}天前`,
    })
  }

  return newPosts
}

// 根据用户ID生成不同类型的随机标题
function generateRandomCaption(userId: number): string {
  const captions = [
    ["风景如画 #旅行 #摄影", "城市探索 #城市 #摄影", "大自然的美 #自然 #摄影"],
    ["今日美食 #美食 #健康", "下午茶时光 #甜点 #饮品", "家常美味 #烹饪 #美食"],
    ["今日穿搭 #时尚 #搭配", "新季新品 #购物 #时尚", "配饰精选 #饰品 #时尚"],
    ["旅行日记 #旅行 #探索", "文化体验 #文化 #旅行", "冒险之旅 #冒险 #旅行"],
    ["健身日常 #健身 #健康", "运动生活 #运动 #健康", "健康饮食 #饮食 #健康"],
  ]

  const userCaptions = captions[userId - 1] || captions[0]
  return userCaptions[Math.floor(Math.random() * userCaptions.length)]
}

export const comments: Comment[] = [
  {
    id: "1",
    postId: "1",
    userId: "2",
    text: "真漂亮！",
    timestamp: "1小时前",
  },
  {
    id: "2",
    postId: "1",
    userId: "3",
    text: "太棒了！",
    timestamp: "30分钟前",
  },
  {
    id: "3",
    postId: "2",
    userId: "1",
    text: "看起来很美味！",
    timestamp: "2小时前",
  },
]

export const stories: Story[] = [
  {
    id: "1",
    userId: "1",
    image: "/abstract-geometric-shapes.png?height=64&width=64&query=story1",
    timestamp: "2小时前",
  },
  {
    id: "2",
    userId: "2",
    image: "/abstract-geometric-shapes.png?height=64&width=64&query=story2",
    timestamp: "1小时前",
  },
  {
    id: "3",
    userId: "3",
    image: "/abstract-geometric-shapes.png?height=64&width=64&query=story3",
    timestamp: "30分钟前",
  },
]

export const messages: Message[] = [
  {
    id: "1",
    senderId: "1",
    receiverId: "me",
    text: "你好！最近怎么样？",
    timestamp: "10:30",
  },
  {
    id: "2",
    senderId: "me",
    receiverId: "1",
    text: "嗨！我很好，谢谢。你呢？",
    timestamp: "10:32",
  },
  {
    id: "3",
    senderId: "1",
    receiverId: "me",
    text: "我也很好！你看到我最新发的照片了吗？",
    timestamp: "10:35",
  },
  {
    id: "4",
    senderId: "me",
    receiverId: "1",
    text: "看到了，拍得真不错！在哪里拍的？",
    timestamp: "10:36",
  },
]

export const notifications: Notification[] = [
  {
    id: "1",
    userId: "1",
    type: "like",
    targetId: "1",
    timestamp: "2小时前",
  },
  {
    id: "2",
    userId: "2",
    type: "comment",
    targetId: "1",
    timestamp: "1小时前",
  },
  {
    id: "3",
    userId: "3",
    type: "follow",
    timestamp: "3天前",
  },
]

// 模拟API调用，获取更多帖子
export async function fetchMorePosts(page: number): Promise<Post[]> {
  // 模拟网络延迟
  return new Promise((resolve) => {
    setTimeout(() => {
      // 最多生成10页数据
      if (page > 10) {
        resolve([])
      } else {
        resolve(generateMorePosts(page))
      }
    }, 1000)
  })
}

// 获取数据的函数
export function getUserById(id: string): User | undefined {
  return users.find((user) => user.id === id)
}

export function getPostById(id: string): Post | undefined {
  return posts.find((post) => post.id === id)
}

export function getPostsByUserId(userId: string): Post[] {
  return posts.filter((post) => post.userId === userId)
}

export function getCommentsByPostId(postId: string): Comment[] {
  return comments.filter((comment) => comment.postId === postId)
}

export function getStoriesByUserId(userId: string): Story[] {
  return stories.filter((story) => story.userId === userId)
}

export function getMessagesBetweenUsers(user1: string, user2: string): Message[] {
  return messages.filter(
    (message) =>
      (message.senderId === user1 && message.receiverId === user2) ||
      (message.senderId === user2 && message.receiverId === user1),
  )
}

export function getNotificationsByUserId(userId: string): Notification[] {
  return notifications.filter((notification) => notification.userId === userId)
}
