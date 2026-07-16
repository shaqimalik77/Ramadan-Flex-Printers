"use client";

import { useEffect, useRef, useState } from "react";
import { Calendar, FolderCheck, Users, Package } from "lucide-react";

type Stat = {
  icon: typeof Calendar;
  value: number;
  suffix: string;
  label: string;
};

const stats: Stat[] = [
  { icon: Calendar, value: 8, suffix: "+", label: "Years Experience" },
  { icon: FolderCheck, value: 4500, suffix: "+", label: "Projects Completed" },
  { icon: Users, value: 2200, suffix: "+", label: "Happy Clients" },
  { icon: Package, value: 120000, suffix: "+", label: "Products Printed" },
];

function useCountUp(target: number, shouldStart: boolean, duration = 1600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!shouldStart) return;

    let start: number | null = null;
    let frameId: number;

    const step = (timestamp: number) => {
      if (start === null) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };

    frameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frameId);
  }, [shouldStart, target, duration]);

  return value;
}

function StatItem({ stat, shouldStart }: { stat: Stat; shouldStart: boolean }) {
  const count = useCountUp(stat.value, shouldStart);
  const Icon = stat.icon;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/10 mb-4">
        <Icon className="w-7 h-7 text-white" aria-hidden="true" />
      </div>
      <span className="text-3xl md:text-4xl font-bold text-white mb-1">
        {count.toLocaleString()}
        {stat.suffix}
      </span>
      <span className="text-sm text-white/80">{stat.label}</span>
    </div>
  );
}

export default function AboutStats() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#E41F26] py-16 md:py-20 px-4 md:px-8"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-10">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} shouldStart={isVisible} />
        ))}
      </div>
    </section>
  );
}
