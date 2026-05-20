import { useEffect, useRef, useState } from 'react';

/**
 * useReveal — scroll-triggered "in-view once" hook.
 * Adds CSS class `is-in` to the returned ref when the element enters
 * the viewport (one-shot). Pair with CSS that transitions properties
 * from a hidden initial state to visible on `.is-in`.
 *
 * @param {Object} options
 * @param {number} options.threshold  IntersectionObserver threshold (0..1)
 * @param {string} options.rootMargin viewport offset
 * @returns {[Object, boolean]} [ref, inView]
 */
export default function useReveal({
  threshold = 0.18,
  rootMargin = '0px 0px -10% 0px',
} = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Respect reduced-motion users — just mark visible immediately.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('is-in');
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-in');
            setInView(true);
            io.unobserve(el);
          }
        });
      },
      { threshold, rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold, rootMargin]);

  return [ref, inView];
}
