import { motion } from 'framer-motion'
import { about } from '../data/content'
import HighlightText from './HighlightText'
import AnimatedCounter from './AnimatedCounter'
import GlassCard from './GlassCard'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section-inner">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {about.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {about.title} <HighlightText>{about.titleHighlight}</HighlightText>
        </motion.h2>

        <motion.p
          className="section-desc"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ marginBottom: '48px' }}
        >
          {about.description}
        </motion.p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px', maxWidth: '600px' }}>
          {about.stats.map((stat, i) => (
            <GlassCard key={stat.label} delay={0.1 * i} tilt={false}>
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: '40px',
                  fontWeight: 800,
                  background: 'linear-gradient(135deg, var(--accent-pink), var(--accent-cyan))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  lineHeight: 1.1,
                  marginBottom: '8px',
                }}>
                  <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                </div>
                <div style={{
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}>
                  {stat.label}
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
