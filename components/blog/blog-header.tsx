import Image from "next/image"

interface BlogHeaderProps {
  image: string
  title: string
}

export function BlogHeader({ image, title }: BlogHeaderProps) {
  return (
    <div className="relative w-full h-48">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover"
        priority
      />
    </div>
  )
} 