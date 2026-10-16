import { motion } from "motion/react";

export function MarqueeTicker() {
  const items = [
    "E-SUMMIT 2026",
    "STARTUP INCUBATION CELL",
    "CAMPUS PITCH ARENA",
    "500+ STUDENT BUILDERS",
    "VENTURE BOOTCAMPS",
    "15+ INDUSTRY MENTORS",
    "ANDHRA PRADESH INNOVATION NETWORK",
    "PROTOTYPE SEED GRANTS",
    "ALUMNI ANGEL SYNDICATE",
    "EUREKA! BUSINESS MODEL CONTEST",
  ];

  return (
    <div className="relative overflow-hidden border-y border-primary/20 bg-gradient-to-r from-[#201D70] via-[#161352] to-[#201D70] py-3 text-white shadow-inner select-none">
      <div className="flex w-max space-x-8 animate-marquee whitespace-nowrap">
        {items.concat(items).map((item, idx) => (
          <div key={idx} className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-blue-100">
            <span className="text-[#00D2FF]">✦</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
