import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Instagram, Linkedin, Menu, X, Youtube, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"],
  ["About", "/about"],
  ["Initiatives", "/initiatives"],
  ["Events", "/events"],
  ["Team", "/team"],
  ["Gallery", "/gallery"],
  ["Blogs", "/blogs"],
  ["Contact", "/contact"],
] as const;

export function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0 group" aria-label="E-Cell SVPEC home">
      <div className="relative">
        <img
          src="/logo.png"
          alt="E-Cell SVPEC logo"
          className="size-10 rounded-md object-contain bg-white/10 p-0.5 border border-white/20 transition-transform group-hover:scale-105"
        />
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-[#00D2FF] ring-2 ring-[#0B0A26] animate-pulse" />
      </div>
      <span>
        <strong className="block text-lg font-black tracking-wider leading-none text-white group-hover:text-[#00D2FF] transition-colors">
          E-CELL
        </strong>
        <span className="mt-1 block text-[9px] font-bold uppercase tracking-[0.14em] text-[#38bdf8]">
          SVPEC · Visakhapatnam
        </span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0B0A26]/90 backdrop-blur-xl transition-all">
      <div className="site-container flex h-20 items-center justify-between gap-6">
        {/* Zone 1: Brand Wordmark */}
        <Brand />

        {/* Zone 2: Navigation Links */}
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map(([label, to]) => (
            <Link
              key={to}
              to={to}
              className="text-xs font-bold uppercase tracking-wider text-slate-300 transition-colors hover:text-[#00D2FF] py-1 px-1 relative group shrink-0"
              activeProps={{ className: "text-[#00D2FF] font-black" }}
            >
              {label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-[#00D2FF] to-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Zone 3: Glowing Action Button */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <Button
            asChild
            size="default"
            className="bg-gradient-to-r from-primary to-[#00D2FF] hover:from-[#0974ff] hover:to-[#38bdf8] text-white font-bold px-5 shadow-[0_0_20px_rgba(8,102,223,0.4)] hover:shadow-[0_0_28px_rgba(0,210,255,0.6)] transition-all"
          >
            <Link to="/contact">
              Join E-Cell <ArrowRight className="ml-1 size-3.5" />
            </Link>
          </Button>
        </div>

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden text-white hover:bg-white/10"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/10 bg-[#0B0A26] lg:hidden"
          >
            <div className="site-container flex flex-col py-4">
              {links.map(([label, to]) => (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setOpen(false)}
                  className="border-b border-white/10 py-3 text-sm font-semibold text-slate-200 transition-colors hover:text-[#00D2FF]"
                  activeProps={{ className: "text-[#00D2FF] font-bold" }}
                >
                  {label}
                </Link>
              ))}
              <Button asChild className="mt-4 bg-gradient-to-r from-primary to-[#00D2FF] text-white font-bold">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  Join E-Cell
                </Link>
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#08081F] text-slate-300">
      <div className="site-container grid gap-10 py-16 md:grid-cols-[1.6fr_1fr_1fr]">
        <div>
          <Brand />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
            The official student-led entrepreneurship catalyst at Sanketika Vidya Parishad Engineering
            College, fostering confident innovators and job creators in Visakhapatnam.
          </p>

          <div className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Incubation & Venture Support Active</span>
          </div>

          <div className="mt-4">
            <Link
              to="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#00D2FF] transition-colors"
            >
              <Shield className="size-3.5" />
              <span>Executive Admin CMS</span>
            </Link>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">Explore Programs</h3>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-slate-400">
            {links.slice(1).map(([label, to]) => (
              <Link key={to} to={to} className="transition-colors hover:text-white">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-[#00D2FF]">Headquarters & Connect</h3>
          <p className="mt-4 text-sm text-slate-400">
            Sanketika Vidya Parishad Engineering College, PM Palem, Visakhapatnam, Andhra Pradesh 530041
          </p>
          <div className="mt-5 flex gap-2">
            {[
              { Icon: Instagram, label: "Instagram", href: "https://instagram.com" },
              { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
              { Icon: Youtube, label: "YouTube", href: "https://youtube.com" },
            ].map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/5 text-[#38bdf8] transition hover:-translate-y-1 hover:border-[#00D2FF] hover:text-white hover:shadow-[0_0_15px_rgba(0,210,255,0.4)]"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black/40">
        <div className="site-container flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} E-Cell Sanketika Vidya Parishad Engineering College. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/about" className="hover:text-white">About</Link>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <Link to="/initiatives" className="hover:text-white">Initiatives</Link>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <Link to="/events" className="hover:text-white">E-Summit</Link>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <Link to="/contact" className="hover:text-white">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  text,
  center = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  center?: boolean;
}) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#0866DF]">
        {eyebrow}
      </p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-brand-navy sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {text && <p className="mt-3 text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">{text}</p>}
    </div>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}