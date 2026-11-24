import React, { useEffect, useRef, useState } from 'react';
import { profile } from './content';

function useTypedLength(text, interval, threshold) {
  const target = useRef(null);
  const [length, setLength] = useState(0);

  useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setLength(text.length);
      return;
    }

    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    let visible = false;
    let timer;
    function update() {
      clearInterval(timer);
      if (preference.matches) {
        setLength(text.length);
        return;
      }
      setLength(0);
      if (!visible) return;
      let count = 0;
      timer = setInterval(() => {
        count += 1;
        setLength(count);
        if (count >= text.length) clearInterval(timer);
      }, interval);
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    }, { threshold });
    observer.observe(target.current);
    preference.addEventListener('change', update);
    return () => {
      clearInterval(timer);
      observer.disconnect();
      preference.removeEventListener('change', update);
    };
  }, [text, interval, threshold]);

  return [target, length];
}

export function TypedIntroduction() {
  const greeting = "Hi, I'm";
  const text = greeting + profile.name;
  const [container, characters] = useTypedLength(text, 75, .25);
  return (
    <div ref={container} className="typed-introduction" aria-label={`${greeting} ${profile.name}`}>
      <p className="about-greeting typed-line" aria-hidden="true">
        <span className="type-reserve">{greeting}</span>
        <span className="type-output">{greeting.slice(0, characters)}</span>
      </p>
      <p className="about-name typed-line" aria-hidden="true">
        <span className="type-reserve">{profile.name}</span>
        <span className="type-output">{profile.name.slice(0, Math.max(0, characters - greeting.length))}<span className="typing-cursor" hidden={characters >= text.length}>|</span></span>
      </p>
    </div>
  );
}

export function TypedProjectTitle({ title }) {
  const [heading, length] = useTypedLength(title, 110, .3);
  return <h1 className="typed-line" ref={heading} aria-label={title}>
    <span className="type-reserve" aria-hidden="true">{title}</span>
    <span className="type-output" aria-hidden="true">{title.slice(0, length)}<span className="typing-cursor" hidden={length >= title.length}>|</span></span>
  </h1>;
}
