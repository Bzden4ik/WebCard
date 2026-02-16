import { motion } from 'framer-motion'
import { projects } from '../data/content'
import GlassCard from './GlassCard'

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="section-inner">
        <motion.span
          className="section-label"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {projects.label}
        </motion.span>

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          {projects.title}
        </motion.h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          marginTop: '40px',
        }}>
          {projects.items.map((project, i) => (
            <GlassCard key={project.title} delay={0.08 * i}>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
              >
                {/* Gradient top bar */}
                <div style={{
                  height: '3px',
                  background: 'linear-gradient(90deg, var(--accent-pink), var(--accent-cyan))',
                  borderRadius: '2px',
                  marginBottom: '20px',
                }} />

                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '10px',
                  color: 'var(--text-primary)',
                }}>
                  {project.title}
                </h3>

                <p style={{
                  fontSize: '13px',
                  lineHeight: 1.7,
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                }}>
                  {project.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: '11px',
                        fontWeight: 500,
                        padding: '4px 12px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'var(--text-muted)',
                        letterSpacing: '0.5px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  marginTop: '20px',
                  fontSize: '13px',
                  color: 'var(--accent-cyan)',
                  fontWeight: 500,
                }}>
                  Открыть проект
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </div>
              </a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  )
}
