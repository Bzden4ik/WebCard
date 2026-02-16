import { motion } from 'framer-motion'

export default function HighlightText({ children }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      <span style={{ position: 'relative', zIndex: 1, color: 'var(--accent-cyan)' }}>
        {children}
      </span>
      <motion.svg
        viewBox="0 0 200 12"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: '-4px',
          left: '-2%',
          width: '104%',
          height: '12px',
          zIndex: 0,
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.path
          d="M 2 8 Q 50 2, 100 6 T 198 6"
          fill="none"
          stroke="var(--accent-pink)"
          strokeWidth="2.5"
          strokeLinecap="round"
          variants={{
            hidden: { pathLength: 0, opacity: 0 },
            visible: {
              pathLength: 1,
              opacity: 1,
              transition: { duration: 0.8, delay: 0.3, ease: 'easeInOut' },
            },
          }}
        />
      </motion.svg>
    </span>
  )
}
