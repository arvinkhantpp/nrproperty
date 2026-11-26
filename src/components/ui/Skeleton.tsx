import { cn } from '@/lib/cn'

export function Skeleton({ className }: { className?: string }) {
  return <div aria-hidden="true" className={cn('animate-skeleton rounded-sm bg-sand', className)} />
}

export function ProjectCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-lg bg-white" aria-hidden="true">
      <Skeleton className="aspect-[4/3] rounded-none" />
      <div className="flex flex-col gap-3 p-6">
        <Skeleton className="h-3 w-28" />
        <Skeleton className="h-7 w-48" />
        <Skeleton className="h-4 w-40" />
        <div className="mt-3 border-t border-line pt-4">
          <Skeleton className="h-5 w-32" />
        </div>
      </div>
    </div>
  )
}
