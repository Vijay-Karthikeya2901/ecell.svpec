import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Instagram, Linkedin, Menu, X, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["Home", "/"], ["About", "/about"], ["Initiatives", "/initiatives"],
  ["Events", "/events"], ["Team", "/team"], ["Gallery", "/gallery"], ["Blogs", "/blogs"], ["Contact", "/contact"],
] as const;

export function Brand() {
  return <Link to="/" className="flex items-center gap-3" aria-label="E-Cell home"><span className="grid size-10 place-items-center rounded-md bg-primary text-lg font-black text-primary-foreground">E</span><span><strong className="block text-lg leading-none text-brand-navy">E-CELL</strong><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">SVPEC · Visakhapatnam</span></span></Link>;
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  return <header className="sticky top-0 z-50 border-b border-border/70 bg-background/90 backdrop-blur-xl"><div className="site-container flex h-20 items-center justify-between"><Brand /><nav className="hidden items-center gap-7 lg:flex">{links.map(([label, to]) => <Link key={to} to={to} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-primary" activeProps={{ className: "text-primary" }}>{label}</Link>)}</nav><div className="hidden lg:block"><Button asChild size="lg"><Link to="/contact">Join E-Cell</Link></Button></div><Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</Button></div><AnimatePresence>{open && <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden border-t bg-background lg:hidden"><div className="site-container flex flex-col py-4">{links.map(([label, to]) => <Link key={to} to={to} onClick={() => setOpen(false)} className="border-b border-border py-3 text-sm font-semibold text-foreground">{label}</Link>)}<Button asChild className="mt-4"><Link to="/contact" onClick={() => setOpen(false)}>Join E-Cell</Link></Button></div></motion.nav>}</AnimatePresence></header>;
}

export function Footer() {
  return <footer className="border-t bg-secondary/50"><div className="site-container grid gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr]"><div><Brand /><p className="mt-5 max-w-sm text-sm leading-6 text-muted-foreground">A student-led community creating confident innovators and future job creators at Sanketika Vidya Parishad Engineering College.</p></div><div><h3 className="font-bold text-brand-navy">Explore</h3><div className="mt-4 grid grid-cols-2 gap-3 text-sm text-muted-foreground">{links.slice(1).map(([label,to]) => <Link key={to} to={to} className="hover:text-primary">{label}</Link>)}</div></div><div><h3 className="font-bold text-brand-navy">Connect</h3><p className="mt-4 text-sm text-muted-foreground">Visakhapatnam, Andhra Pradesh</p><div className="mt-5 flex gap-2">{[Instagram, Linkedin, Youtube].map((Icon, i) => <a key={i} href="#" aria-label={["Instagram","LinkedIn","YouTube"][i]} className="grid size-10 place-items-center rounded-md border bg-background text-primary transition hover:-translate-y-1 hover:border-primary"><Icon className="size-4" /></a>)}</div></div></div><div className="border-t"><div className="site-container py-6 text-center text-xs text-muted-foreground md:text-left">© E-Cell Sanketika Vidya Parishad Engineering College</div></div></footer>;
}

export function SiteShell({ children }: { children: ReactNode }) { return <><Navbar /><main>{children}</main><Footer /></>; }

export function SectionHeading({ eyebrow, title, text, center = false }: { eyebrow: string; title: string; text?: string; center?: boolean }) {
  return <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}><p className="eyebrow">{eyebrow}</p><h2 className="section-title mt-3">{title}</h2>{text && <p className="mt-4 text-base leading-7 text-muted-foreground">{text}</p>}</div>;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) { return <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .55 }} className={className}>{children}</motion.div>; }