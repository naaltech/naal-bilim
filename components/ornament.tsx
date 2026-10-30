import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function Diamond() {
  return <span className="inline-block h-1.5 w-1.5 rotate-45 bg-primary" />
}

export function Ornament({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <Separator className="flex-1 bg-foreground/40" />
      <Diamond />
      <Separator className="flex-1 bg-foreground/40" />
    </div>
  )
}
