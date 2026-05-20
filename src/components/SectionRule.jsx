/**
 * Section divider — горизонтальная линия + нумерованный заголовок главы.
 * Используется в начале каждой секции (§ 01, § 02, ...).
 *   - left:  "§ 01 — Operator"
 *   - right: "DOSSIER / IDENTITY"
 */
export default function SectionRule({ chapter, label, right }) {
  return (
    <div className="section-rule">
      <span className="sym">
        <span className="glyph">{chapter}</span>
        {label && <span>— {label}</span>}
      </span>
      {right && <span className="right">{right}</span>}
    </div>
  );
}
