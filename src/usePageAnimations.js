import { useEffect } from 'react';

export function usePageAnimations() {
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!('IntersectionObserver' in window) || !Element.prototype.animate) return;
    const animations = new Set();
    function track(animation) {
      animations.add(animation);
      const release = () => animations.delete(animation);
      animation.finished.then(release, release);
    }
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) {
          if (!preference.matches && entry.boundingClientRect.top >= window.innerHeight) entry.target.classList.add('reveal-pending');
          continue;
        }
        if (!entry.target.classList.contains('reveal-pending')) continue;
        entry.target.classList.remove('reveal-pending');
        if (preference.matches) continue;
        const delay = entry.target.matches('.background-stat')
          ? [...entry.target.parentElement.children].indexOf(entry.target) * 100
          : 0;
        const animation = entry.target.animate(
          [{ opacity: 0, transform: 'translateY(48px) scale(.98)' }, { opacity: 1, transform: 'none' }],
          { duration: 1000, delay, fill: 'backwards', easing: 'cubic-bezier(.22, 1, .36, 1)' },
        );
        track(animation);
        const textElements = entry.target.querySelectorAll('p, h3, .background-status, .overview-logo');
        textElements.forEach((element, index) => {
          const textAnimation = element.animate(
            [{ opacity: 0, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }],
            { duration: 850, delay: 120 + Math.min(index, 4) * 90, easing: 'cubic-bezier(.22, 1, .36, 1)', fill: 'backwards' },
          );
          track(textAnimation);
        });
      }
    }, { threshold: .05, rootMargin: '0px 0px -40px 0px' });
    const elements = document.querySelectorAll('[data-reveal]:not(.case-features), .project, .portfolio-tabs, .background-card, .background-stat, .case-features li, .case-breadcrumbs, .case-heading > *, .case-cover, .footer');
    elements.forEach((element) => {
      if (!preference.matches && (element.getBoundingClientRect().top > window.innerHeight || element.matches('.case-breadcrumbs, .case-heading > *, .case-cover'))) element.classList.add('reveal-pending');
      observer.observe(element);
    });
    function stopMotion() {
      if (preference.matches) animations.forEach((animation) => animation.cancel());
      if (preference.matches) elements.forEach((element) => element.classList.remove('reveal-pending'));
    }
    preference.addEventListener('change', stopMotion);
    return () => {
      observer.disconnect();
      elements.forEach((element) => element.classList.remove('reveal-pending'));
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener('change', stopMotion);
    };
  }, []);
}
