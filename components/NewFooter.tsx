import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { brandFont, INK } from "@/lib/brand";
import InkStripe from "@/components/InkStripe";
import ramdanLogo from "@/assets/brand/ramdan-logo.png";

const productLinks = [
  { label: "Packaging Boxes", href: "/categories/ecommerce-boxes" },
  { label: "Stickers", href: "/categories/stickers" },
  { label: "Business Cards", href: "/categories/business-cards" },
  { label: "Wedding Cards", href: "/categories/wedding-cards" },
  { label: "Custom T-Shirts", href: "/categories/custom-t-shirts" },
  { label: "Neon Signs", href: "/categories/neon-signs" },
];

const companyLinks = [
  { label: "All Products", href: "/categories" },
  { label: "About Us", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

function Column({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900">{title}</h2>
      <ul className="mt-4 space-y-2.5">
        {links.map((l) => (
          <li key={l.href + l.label}>
            <Link href={l.href} className="text-[15px] text-neutral-600 hover:text-neutral-950">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function NewFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={`${brandFont.className} bg-[#FAF8F5] text-neutral-700`}>
      <div className="bg-white pt-1.5">
        <InkStripe className="h-1 w-full" rounded={false} />
      </div>
      <div className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
          {/* Brand */}
          <div>
            <Image
              src={ramdanLogo}
              alt={siteConfig.name}
              unoptimized
              className="h-14 w-auto"
            />
            <p className="mt-4 max-w-xs text-[15px] leading-relaxed text-neutral-600">
              Printing and packaging for brands, shops and events. Made in Lahore, delivered across
              Pakistan.
            </p>
          </div>

          {/* Links: two columns side by side on mobile */}
          <div className="grid grid-cols-2 gap-8 lg:contents">
            <Column title="Products" links={productLinks} />
            <Column title="Company" links={companyLinks} />
          </div>

          {/* Contact */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-900">
              Contact
            </h2>
            <ul className="mt-4 space-y-3 text-[15px]">
              <li>
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-neutral-950"
                >
                  <MessageCircle className="h-4 w-4 shrink-0" style={{ color: INK.magenta }} />
                  WhatsApp {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`tel:${siteConfig.phoneHref}`} className="flex items-center gap-3 hover:text-neutral-950">
                  <Phone className="h-4 w-4 shrink-0" style={{ color: INK.cyan }} />
                  Call {siteConfig.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-3 break-all hover:text-neutral-950">
                  <Mail className="h-4 w-4 shrink-0" style={{ color: "#E0A800" }} />
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="h-4 w-4 shrink-0 text-neutral-900" />
                {siteConfig.address}
              </li>
              <li className="flex items-center gap-3">
                <Clock className="h-4 w-4 shrink-0 text-neutral-900" />
                {siteConfig.hoursDays}, {siteConfig.hoursTime}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-neutral-200 pt-6 text-sm text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {siteConfig.name}. All rights reserved.</p>
          <p>Lahore, Pakistan</p>
        </div>
      </div>
    </footer>
  );
}
