"use client"

import { useState } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import { SiInstagram } from "@icons-pack/react-simple-icons"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import type { InstagramPost } from "@/lib/supabase"

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0)
  const move = (step: number) => setIndex((current) => (current + step + images.length) % images.length)

  return (
    <div className="relative w-full max-w-2xl mx-auto aspect-square">
      <Image src={images[index]} alt={`${alt} - ${index + 1}/${images.length}`} fill className="object-cover rounded-lg" />
      {images.length > 1 && (
        <>
          <button
            onClick={() => move(-1)}
            aria-label="Önceki görsel"
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => move(1)}
            aria-label="Sonraki görsel"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
            {images.map((image, dot) => (
              <button
                key={image}
                onClick={() => setIndex(dot)}
                aria-label={`${dot + 1}. görsel`}
                className={`w-2 h-2 rounded-full transition-colors ${dot === index ? "bg-white" : "bg-white/50"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function formatDate(value: string | null) {
  if (!value) return null
  return new Date(value).toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" })
}

export default function InstagramFeed({ posts }: { posts: InstagramPost[] }) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <SiInstagram className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">Henüz paylaşım bulunamadı.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post) => {
        const images = post.image_links?.links ?? []
        const title = post.name || "Instagram paylaşımı"

        return (
          <Dialog key={post.id}>
            <DialogTrigger asChild>
              <Card className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group">
                <CardContent className="p-0">
                  <div className="relative aspect-square bg-muted">
                    {images[0] && (
                      <Image src={images[0]} alt={title} fill className="object-cover transition-transform group-hover:scale-105" />
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="text-white text-center">
                        <SiInstagram className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm">Görüntüle</p>
                      </div>
                    </div>
                    {images.length > 1 && (
                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        1/{images.length}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </DialogTrigger>

            <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <SiInstagram className="h-5 w-5" />
                  @{post.user_name}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                {images.length > 0 && <ImageCarousel images={images} alt={title} />}
                {post.description && (
                  <p className="text-muted-foreground whitespace-pre-wrap">{post.description}</p>
                )}
                <div className="flex items-center justify-between pt-4 border-t text-sm">
                  <span className="text-muted-foreground">{formatDate(post.time)}</span>
                  <a
                    href={post.post_link || `https://instagram.com/${post.user_name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Instagram&apos;da gör
                  </a>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )
      })}
    </div>
  )
}
