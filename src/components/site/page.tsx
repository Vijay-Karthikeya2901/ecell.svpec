import type { ReactNode } from "react";
import { SiteShell } from "./site-shell";

export function ContentPage({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <SiteShell>
      <section className="relative overflow-hidden border-b border-white/10 bg-gradient-to-b from-[#0A0826] via-[#120F3E] to-[#201D70] py-16 md:py-24 text-white">
        <div className="absolute -top-32 -right-32 size-96 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 size-80 rounded-full bg-[#00D2FF]/15 blur-3xl pointer-events-none" />
        <div className="site-container relative z-10">
          <p className="text-xs font-mono font-bold uppercase tracking-widest text-[#00D2FF]">
            {eyebrow}
          </p>
          <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100/90 sm:text-lg sm:leading-8">
            {description}
          </p>
        </div>
      </section>
      {children}
    </SiteShell>
  );
}