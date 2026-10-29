"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Mail, MapPin } from "lucide-react"
import { SiInstagram, SiX, SiYoutube, SiFacebook } from "@icons-pack/react-simple-icons"
import Linkedin from "@/components/icons/linkedin-icon"
import { Button } from "@/components/ui/button"

const navItems = [
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#etkinlikler", label: "Neler Yapıyoruz" },
  { href: "#instagram", label: "Instagram" },
]

const socialLinks = [
  { href: "https://www.facebook.com/nevzatayaz.al.14", icon: SiFacebook, label: "Facebook" },
  { href: "https://www.instagram.com/nevzatayazanadolulisesi_/", icon: SiInstagram, label: "Instagram" },
  { href: "https://www.linkedin.com/school/nevzatayazlisesi/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://x.com/NevzatAyazLise", icon: SiX, label: "X" },
  { href: "https://www.youtube.com/@NaalRec", icon: SiYoutube, label: "YouTube" },
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-background">
      <div className="bg-muted/30 border-b border-border/50">
        <div className="container max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:flex items-center space-x-6 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>E-Posta: <a href="mailto:bilim@naal.org.tr" className="hover:text-foreground transition-colors">bilim@naal.org.tr</a></span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Konum: <a href="https://www.google.com/maps?q=İnkılap+Mah.+Yelkenciler+Sok.+NO:1+Ümraniye/İstanbul" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">İnkılap Mah. Yelkenciler Sok. NO:1 Ümraniye/İstanbul</a></span>
              </div>
            </div>

            <div className="flex items-center space-x-3 ml-auto">
              {socialLinks.map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container max-w-7xl mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl" style={{ color: '#2ea5d5' }}>
              bilim.naal.org.tr
            </span>
          </Link>

          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menü" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>

          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Button key={item.href} variant="ghost" asChild>
                <a href={item.href}>{item.label}</a>
              </Button>
            ))}
            <Button variant="outline" asChild>
              <a href="https://naal.org.tr" target="_blank" rel="noopener noreferrer">
                Etkileşim Ağı
              </a>
            </Button>
          </nav>
        </div>

        {isMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-background border-b md:hidden">
            <div className="container px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <Button key={item.href} variant="ghost" className="w-full justify-start" asChild>
                  <a href={item.href} onClick={() => setIsMenuOpen(false)}>{item.label}</a>
                </Button>
              ))}
              <div className="pt-2 border-t">
                <Button variant="outline" className="w-full" asChild>
                  <a href="https://naal.org.tr" target="_blank" rel="noopener noreferrer">
                    Etkileşim Ağı
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
