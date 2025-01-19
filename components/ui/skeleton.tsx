import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("pulse rounded-md bg-gray-100", className)}
      {...props}
    />
  )
}

export { Skeleton }
