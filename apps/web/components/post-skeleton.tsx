import { Skeleton } from "@/components/ui/skeleton"

interface PostSkeletonProps {
  isDark?: boolean
}

export default function PostSkeleton({ isDark = false }: PostSkeletonProps) {
  return (
    <div className={`border-b ${isDark ? "border-gray-800" : "border-gray-200"} pb-4`}>
      <div className="flex items-center p-3">
        <Skeleton className={`h-8 w-8 rounded-full mr-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
        <Skeleton className={`h-4 w-32 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
      </div>
      <Skeleton className={`w-full aspect-square ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
      <div className="p-3">
        <div className="flex items-center gap-4 mb-2">
          <Skeleton className={`h-6 w-6 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
          <Skeleton className={`h-6 w-6 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
          <Skeleton className={`h-6 w-6 rounded-full ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
          <Skeleton className={`h-6 w-6 rounded-full ml-auto ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
        </div>
        <Skeleton className={`h-4 w-32 mb-2 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
        <Skeleton className={`h-4 w-full mb-1 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
        <Skeleton className={`h-4 w-3/4 ${isDark ? "bg-gray-700" : "bg-gray-200"}`} />
      </div>
    </div>
  )
}
