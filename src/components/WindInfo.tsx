import { NavigationArrow } from '@phosphor-icons/react';
import { getWindDirection } from '../utils/textFormat';

interface Props {
  speed: number;
  deg: number;
  gust?: number;
  size?: 'sm' | 'md';
}

const WindInfo = ({ speed, deg, gust, size = 'sm' }: Props) => {
  const direction = getWindDirection(deg);
  const speedKmh = Math.round(speed * 3.6);
  const gustKmh = gust ? Math.round(gust * 3.6) : null;

  if (size === 'md') {
    return (
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <NavigationArrow
            size={18}
            weight="fill"
            className="text-white"
            style={{ transform: `rotate(${deg}deg)` }}
          />
          <span className="text-white font-semibold">{speedKmh} km/h</span>
          <span className="text-white/60 text-xs">{direction}</span>
        </div>
        {gustKmh && (
          <span className="text-white/50 text-xs">Rajadas: {gustKmh} km/h</span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 text-sm">
      <NavigationArrow
        size={14}
        weight="fill"
        style={{ transform: `rotate(${deg}deg)` }}
      />
      <span>{speedKmh} km/h</span>
      <span className="text-white/60 text-xs">{direction}</span>
    </div>
  );
};

export default WindInfo;
