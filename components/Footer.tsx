import Link from "next/link";
import {
  Globe2,
  Globe,
  Users,
  MessageCircle,
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";
import SmartImage from "@/components/Smartimage";
import { siteConfig } from "@/lib/siteConfig";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Categories", href: "/categories" },
  { label: "Blog", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const productCategories = [
  { label: "Stickers", href: "/categories/stickers" },
  { label: "Business Cards", href: "/categories/business-cards" },
  { label: "Packaging Boxes", href: "/categories/ecommerce-boxes" },
  { label: "Promotional Products", href: "/categories/promotional-products" },
  { label: "Wedding Cards", href: "/categories/wedding-cards" },
  { label: "Custom T-Shirts", href: "/categories/custom-t-shirts" },
];

const socialLinks = [
  { icon: Globe, label: "Facebook", href: "#" },
  { icon: Globe2, label: "Instagram", href: "#" },
  { icon: Users, label: "LinkedIn", href: "#" },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    href: `https://wa.me/${siteConfig.whatsappNumber}`,
  },
];

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Column 1: Brand */}
          <div>
            <div className="relative w-36 h-12 mb-4">
              <SmartImage
                src="/images/logo/logo.png"
                alt={`${siteConfig.name ?? "Company"} logo`}
                fill
                sizes="144px"
                className="object-contain object-left"
              />
            </div>
            <p className="text-sm leading-relaxed text-gray-400 mb-6">
              We deliver premium printing and packaging solutions with sharp
              quality, fast turnaround, and a finish that helps your brand
              stand out.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-full bg-white/5 text-gray-300 transition-all duration-300 hover:bg-red-600 hover:text-white hover:-translate-y-1"
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-bold tracking-wide mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-red-600">
              Quick Links
            </h3>
            <ul className="space-y-3 mt-4">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-red-500"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Product Categories */}
          <div>
            <h3 className="text-white font-bold tracking-wide mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-red-600">
              Product Categories
            </h3>
            <ul className="space-y-3 mt-4">
              {productCategories.map((category) => (
                <li key={category.label}>
                  <Link
                    href={category.href}
                    className="text-sm text-gray-400 transition-colors duration-300 hover:text-red-500"
                  >
                    {category.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Information */}
          <div>
            <h3 className="text-white font-bold tracking-wide mb-5 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-red-600">
              Contact Information
            </h3>
            <ul className="space-y-4 mt-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-red-500 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${siteConfig.phoneHref ?? ""}`}
                  className="transition-colors duration-300 hover:text-red-500"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MessageCircle className="w-4 h-4 mt-0.5 text-red-500 shrink-0" aria-hidden="true" />
                <a
                  href={`https://wa.me/${siteConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-red-500"
                >
                  {siteConfig.whatsappNumber}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-red-500 shrink-0" aria-hidden="true" />
                <a
                  href={`mailto:${siteConfig.email ?? ""}`}
                  className="transition-colors duration-300 hover:text-red-500"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-red-500 shrink-0" aria-hidden="true" />
                <span>{siteConfig.address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 text-red-500 shrink-0" aria-hidden="true" />
                <span>Mon - Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-5 text-center">
          <p className="text-xs text-gray-500">
            © 2026 {siteConfig.name ?? "Company Name"}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}