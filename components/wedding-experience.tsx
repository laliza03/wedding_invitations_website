'use client';
import { useEffect, useState } from 'react';

export function WeddingReveal({ active }: { active: boolean }) {
  useEffect(() => {
    if (!active || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const targets = document.querySelectorAll('#wedding-main > .section, .wedding-footer');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .08 });
    targets.forEach(target => {
      // Content already in view stays visible, including direct anchor destinations.
      if (target.getBoundingClientRect().top < window.innerHeight) return;
      target.classList.add('reveal-ready');
      observer.observe(target);
    });
    return () => {
      observer.disconnect();
      targets.forEach(target => target.classList.remove('reveal-ready', 'is-visible'));
    };
  }, [active]);
  return null;
}

export function WeddingMotion({ active }: { active: boolean }) {
  useEffect(() => {
    const card = document.querySelector<HTMLElement>('.invitation');
    if (active) card?.classList.add('motion-invitation');
    return () => card?.classList.remove('motion-invitation');
  }, [active]);
  return null;
}

export function WeddingCountdown() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const update = () => {
      const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
      setDays(Math.max(0, Math.round((Date.UTC(2027, 7, 8) - Date.parse(today + 'T00:00:00Z')) / 86400000)));
    };
    update();
    const timer = setInterval(update, 60000);
    return () => clearInterval(timer);
  }, []);
  return <div className="wedding-countdown"><span className="countdown-rule" aria-hidden="true"/><div><span className="countdown-number">{days === null ? '' : days}</span><p>{days === 0 ? 'Le grand jour est arrivé' : 'jours avant de vous retrouver'}</p></div><span className="countdown-rule" aria-hidden="true"/></div>;
}
