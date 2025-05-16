import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton() {
  return (
    <div className="border-b border-gray-800 pb-4">
      <div className="flex items-center p-3">
        <Skeleton className="h-8 w-8 rounded-full mr-2 bg-gray-700" />
        <Skeleton className="h-4 w-32 bg-gray-700" />
      </div>
      <Skeleton className="w-full aspect-square bg-gray-700" />
      <div className="p-3">
        <div className="flex items-center gap-4 mb-2">
          <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          <Skeleton className="h-6 w-6 rounded-full bg-gray-700" />
          <Skeleton className="h-6 w-6 rounded-full ml-auto bg-gray-700" />
        </div>
        <Skeleton className="h-4 w-32 mb-2 bg-gray-700" />
        <Skeleton className="h-4 w-full mb-1 bg-gray-700" />
        <Skeleton className="h-4 w-3/4 bg-gray-700" />
      </div>
    </div>
  )
}
