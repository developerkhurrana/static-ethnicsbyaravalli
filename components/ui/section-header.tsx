interface SectionHeaderProps {
  title: string
  description?: string
  className?: string
  align?: "left" | "center"
}

export function SectionHeader({
  title,
  description,
  className = "",
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={`space-y-4 ${
        align === "center" ? "text-center" : "text-left"
      } ${className}`}
    >
      <h1 className="font-serif text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
        {title}
      </h1>
      {description && (
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-lg">
          {description}
        </p>
      )}
    </div>
  )
} 