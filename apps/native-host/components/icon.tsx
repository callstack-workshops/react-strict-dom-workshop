import Svg, { Path, Circle, Rect } from 'react-native-svg';

export type IconName = 'explore' | 'cal' | 'plus' | 'bag' | 'user' | 'sun' | 'moon';

export function Icon({
  name,
  size = 24,
  color,
}: {
  name: IconName;
  size?: number;
  color: string;
}) {
  const s = {
    fill: 'none',
    stroke: color,
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  const box = { width: size, height: size, viewBox: '0 0 24 24' };
  switch (name) {
    case 'explore':
      return (
        <Svg {...box}>
          <Circle cx={12} cy={12} r={9} {...s} />
          <Path d="M15.5 8.5l-2 5-5 2 2-5z" {...s} />
        </Svg>
      );
    case 'cal':
      return (
        <Svg {...box}>
          <Rect x={3.5} y={5} width={17} height={16} rx={2.5} {...s} />
          <Path d="M3.5 9.5h17M8 3v4M16 3v4" {...s} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg {...box}>
          <Path d="M12 5v14M5 12h14" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'bag':
      return (
        <Svg {...box}>
          <Path d="M5 8h14l-1 12H6z" {...s} />
          <Path d="M9 8V6a3 3 0 0 1 6 0v2" {...s} />
        </Svg>
      );
    case 'user':
      return (
        <Svg {...box}>
          <Circle cx={12} cy={8} r={3.6} {...s} />
          <Path d="M5 20a7 7 0 0 1 14 0" {...s} />
        </Svg>
      );
    case 'sun':
      return (
        <Svg {...box}>
          <Circle cx={12} cy={12} r={4.2} {...s} strokeWidth={1.8} />
          <Path
            d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M19.1 4.9l-1.8 1.8M6.7 17.3l-1.8 1.8"
            {...s}
            strokeWidth={1.8}
          />
        </Svg>
      );
    case 'moon':
      return (
        <Svg {...box}>
          <Path
            d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"
            {...s}
            strokeWidth={1.8}
          />
        </Svg>
      );
    default:
      return null;
  }
}
