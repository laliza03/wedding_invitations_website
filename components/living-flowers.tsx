'use client';
import { useEffect, useRef } from 'react';

export function LivingFlowers({ active }: { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active || !ref.current) return;
    const root = ref.current;
    const observer = new IntersectionObserver(([entry]) => root.classList.toggle('flowers-in-view', entry.isIntersecting));
    observer.observe(root);
    return () => observer.disconnect();
  }, [active]);
  return active ? <div ref={ref} className="stationery-botanicals" aria-hidden="true"><div className="stationery-sprig sprig-top"><img src="/reference-botanicals-luminous-lilac.png" alt="" width="1024" height="1536" decoding="async"/></div><div className="stationery-sprig sprig-bottom"><img src="/reference-botanicals-luminous-lilac.png" alt="" width="1024" height="1536" decoding="async"/></div></div> : null;
}
