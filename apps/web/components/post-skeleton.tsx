import { Skeleton } from "@/components/ui/skeleton"

export default function PostSkeleton() {
  return (
    <div className="border rounded-md overflow-hidden bg-white mb-6">
      <div className="flex items-center p-3">
        <Skeleton className="h-8 w-8 rounded-full mr-2" />
        <Skeleton className="h-4 w-32" />
      </div>
      <Skeleton className="w-full aspect-square" />
      <div className="p-3">
        <div className="flex items-center gap-4 mb-2">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-6 w-6 rounded-full ml-auto" />
        </div>
        <Skeleton className="h-4 w-32 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-3/4" />
      </div>
    </div>
  )
}
