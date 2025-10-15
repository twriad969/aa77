import { Facebook, Instagram, Youtube, Mail } from "lucide-react";

const footerLinks = {
  brand: {
    title: "Bastob Marketing",
    description: "হালাল উপায়ে সফল হওয়ার পার্টনার",
  },
  quickLinks: [
    { label: "Home", href: "#home" },
    { label: "Course", href: "#course" },
    { label: "Instructor", href: "#instructor" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  contact: {
    email: "support@bastobmarketing.com",
    phone: "+880 1XXX-XXXXXX",
  },
  social: [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Mail, href: "#", label: "Email" },
  ],
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-card/30">
      <div className="section-container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold mb-3 font-heading">
              {footerLinks.brand.title}
            </h3>
            <p className="text-sm text-muted-foreground bangla">
              {footerLinks.brand.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-3 bangla">যোগাযোগ</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href={`mailto:${footerLinks.contact.email}`} className="hover:text-foreground transition-colors">
                  {footerLinks.contact.email}
                </a>
              </li>
              <li>{footerLinks.contact.phone}</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-3 bangla">সোশ্যাল মিডিয়া</h4>
            <div className="flex gap-3">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 hover:text-primary transition-colors"
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Bastob Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
