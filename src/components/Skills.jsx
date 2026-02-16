import { motion } from 'framer-motion'
import { skills } from '../data/content'
import GlassCard from './GlassCard'

export default function Skills() {
  return (
    <section id="skills" className="section">
      <div className="section-inner">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {skills.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {skills.title}
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginTop: '40px',
        }}>
          {skills.categories.map((cat, catIdx) => (
            <GlassCard key={cat.name} delay={0.08 * catIdx}>
              <h3 style={{
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                color: catIdx === 0 ? 'var(--accent-pink)' : catIdx === 1 ? 'var(--accent-cyan)' : 'var(--accent-purple)',
                marginBottom: '20px',
              }}>
                {cat.name}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cat.items.map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.08 * catIdx + 0.05 * i }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: catIdx === 0 ? 'var(--accent-pink)' : catIdx === 1 ? 'var(--accent-cyan)' : 'var(--accent-purple)',
                      flexShrink: 0,
                      boxShadow: catIdx === 0
                        ? '0 0 8px rgba(255,45,117,0.5)'
                        : catIdx === 1
                        ? '0 0 8px rgba(0,212,255,0.5)'
                        : '0 0 8px rgba(124,58,237,0.5)',
                    }} />
                    {item}
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
