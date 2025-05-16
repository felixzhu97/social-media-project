"use client"

import { useEffect, useState, useCallback } from "react"

interface UseInfiniteScrollOptions {
  threshold?: number
  initialData?: any[]
  fetchMore: (page: number) => Promise<any[] | null>
}

export function useInfiniteScroll<T>({ threshold = 100, initialData = [], fetchMore }: UseInfiniteScrollOptions) {
  const [data, setData] = useState<T[]>(initialData as T[])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return

    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const scrollHeight = document.documentElement.scrollHeight
    const clientHeight = document.documentElement.clientHeight

    if (scrollHeight - scrollTop - clientHeight < threshold) {
      loadMore()
    }
  }, [loading, hasMore, threshold])

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return

    setLoading(true)
    setError(null)

    try {
      const nextPage = page + 1
      const newItems = await fetchMore(nextPage)

      if (!newItems || newItems.length === 0) {
        setHasMore(false)
      } else {
        setData((prev) => [...prev, ...newItems])
        setPage(nextPage)
      }
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred while loading more items"))
    } finally {
      setLoading(false)
    }
  }, [fetchMore, page, loading, hasMore])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [handleScroll])

  const reset = useCallback(() => {
    setData(initialData as T[])
    setPage(1)
    setLoading(false)
    setHasMore(true)
    setError(null)
  }, [initialData])

  return { data, loading, hasMore, error, loadMore, reset }
}

export default useInfiniteScroll
