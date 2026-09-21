import type { ReactNode } from "react";
import { SiteShell } from "./site-shell";

export function ContentPage({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children: ReactNode }) {
  return <SiteShell><section className="border-b bg-secondary py-16 md:py-24"><div className="site-container"><p className="eyebrow">{eyebrow}</p><h1 className="mt-4 max-w-4xl text-5xl font-black text-brand-navy md:text-6xl">{title}</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">{description}</p></div></section>{children}</SiteShell>;
}