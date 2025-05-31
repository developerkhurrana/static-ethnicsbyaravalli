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
    <div className={`text-center mt-[42px] ${className}`}>
      <h1 className="text-4xl font-bold mb-4 text-[#2E1B1B]">{title}</h1>
      {description && (
        <p className="text-lg text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  )
} 