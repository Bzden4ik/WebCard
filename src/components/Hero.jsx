import { motion } from 'framer-motion'
import { hero } from '../data/content'
import Scene3D from './Scene3D'

export default function Hero() {
  return (
    <section id="hero" className="section" style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <Scene3D />

      <div className="section-inner" style={{ position: 'relative', zIndex: 1 }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: '16px',
            color: 'var(--text-secondary)',
            marginBottom: '12px',
            fontWeight: 400,
          }}
        >
          {hero.greeting}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '8px',
          }}
        >
          <span className="gradient-text">{hero.name}</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            fontSize: 'clamp(24px, 4vw, 48px)',
            fontWeight: 700,
            lineHeight: 1.1,
            marginBottom: '24px',
            color: 'var(--text-primary)',
          }}
        >
          {hero.role}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: 'var(--text-secondary)',
            maxWidth: '500px',
            marginBottom: '40px',
          }}
        >
          {hero.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}
        >
          <a
            href="#projects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-magenta))',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 600,
              color: '#fff',
              transition: 'box-shadow 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.boxShadow = 'var(--glow-pink)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.boxShadow = 'none'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Мои проекты →
          </a>
          <a
            href="#contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 32px',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: 500,
              color: 'var(--text-primary)',
              transition: 'border-color 0.3s, transform 0.2s',
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--accent-cyan)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'rgba(255,255,255,0.15)'
              e.target.style.transform = 'translateY(0)'
            }}
          >
            Связаться
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', letterSpacing: '2px' }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '20px',
            height: '32px',
            border: '1.5px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
            position: 'relative',
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '3px',
              height: '8px',
              background: 'var(--accent-cyan)',
              borderRadius: '2px',
              position: 'absolute',
              top: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
