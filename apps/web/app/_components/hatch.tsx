import { css, html } from 'react-strict-dom';

const hatchStyles = css.create({
  hatch: (color: string, rounded: string) => ({
    position: 'absolute',
    insetBlock: 0,
    insetInline: 0,
    borderRadius: rounded,
    backgroundImage: `repeating-linear-gradient(135deg, ${color} 0 1px, transparent 1px 11px)`,
    pointerEvents: 'none',
  }),
});

export function Hatch({ color, rounded }: { color: string; rounded: string }) {
  return <html.div style={hatchStyles.hatch(color, rounded)} />;
}
